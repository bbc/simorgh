/* eslint-disable no-underscore-dangle, camelcase */
import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import defaultToggles from '#app/lib/config/toggles';
import { test, expect, type Page } from '@playwright/test';
import appConfig from '../../../utilities/serviceConfigs';
import { onDemandAudioSuites } from './suites';
import {
  appEnvFromProcess,
  baseURL,
  shouldRunForEnv,
} from '../../utilities/env';
import assert200HtmlResponse from '../../utilities/response';
import {
	assertLiteSiteSummaryComponentToMainSiteClick,
	assertPageView,
	assertPodcastLinksComponentClick,
	assertPodcastLinksComponentView,
	assertRadioScheduleComponentClick,
	assertRadioScheduleComponentView,
	assertRecentAudioEpisodesComponentClick,
	assertRecentAudioEpisodesComponentView,
	assertResonancePageView,
} from '../../specialFeatures/atiAnalytics/assertions';
import { getATIUrls } from '../../specialFeatures/atiAnalytics/helpers';

type OnDemandAudioPageData = {
	recentEpisodes?: unknown[];
	radioScheduleData?: unknown;
	mediaBlocks?: Array<{
		model?: {
			availability?: string;
		};
	}>;
};

type OnDemandAudioWindow = Window & {
	__NEXT_DATA__?: {
		props?: {
			pageProps?: {
				pageData?: OnDemandAudioPageData;
			};
		};
	};
	_sf_async_config?: unknown;
};

type ServiceToggleConfig = {
	recentPodcastEpisodes?: {
		enabled?: boolean;
		value?: string | number;
	};
	recentAudioEpisodes?: {
		enabled?: boolean;
		value?: string | number;
	};
	onDemandRadioSchedule?: {
		enabled?: boolean;
	};
};

const togglesBaseUrlByEnv: Record<typeof appEnvFromProcess, string> = {
	local: 'https://web-cdn.test.api.bbci.co.uk',
	test: 'https://web-cdn.test.api.bbci.co.uk',
	live: 'https://web-cdn.api.bbci.co.uk',
};

const getServiceConfig = (service: string) =>
	appConfig[service as keyof typeof appConfig]?.default;

const excludedNavServices = ['magyarul', 'romania'];

const twoTierNavServices: Record<string, string[] | null> = {
	local: null,
	test: ['arabic', 'tamil'],
	live: SERVICES_WITH_NEW_NAV.filter(
		service => !excludedNavServices.includes(service),
	),
};

const shouldTestTwoTierNav = (service: string) => {
	const serviceName = getServiceConfig(service)?.service ?? service;
	return twoTierNavServices[appEnvFromProcess]?.includes(serviceName) ?? false;
};

const getOnDemandAudioPageData = async (page: Page) =>
	page.evaluate(() => {
		return (window as OnDemandAudioWindow).__NEXT_DATA__?.props?.pageProps
			?.pageData;
	});

const getEpisodeAvailability = (pageData?: OnDemandAudioPageData) =>
	pageData?.mediaBlocks?.[0]?.model?.availability === 'available';

const getOnDemandAudioServiceToggles = async (
	service: string,
): Promise<ServiceToggleConfig> => {
	if (appEnvFromProcess === 'local') {
		const {
			recentPodcastEpisodes,
			recentAudioEpisodes,
			onDemandRadioSchedule,
		} = defaultToggles.local;

		return {
			recentPodcastEpisodes,
			recentAudioEpisodes,
			onDemandRadioSchedule,
		};
	}

	const fallbackTogglesEndpoint = new URL(
		'/fd/ws-toggles',
		togglesBaseUrlByEnv[appEnvFromProcess],
	);
	fallbackTogglesEndpoint.searchParams.set('application', 'simorgh');
	fallbackTogglesEndpoint.searchParams.set('service', service);

	const togglesEndpoint = process.env.TOGGLES_BFF_PATH
		? `${process.env.TOGGLES_BFF_PATH}?application=simorgh&service=${service}`
		: fallbackTogglesEndpoint.toString();

	const response = await fetch(togglesEndpoint, {
		headers:
			appEnvFromProcess === 'live' ? undefined : { 'ctx-service-env': 'test' },
	});

	if (!response.ok) {
		throw new Error(
			`Failed to fetch toggles for ${service}: ${response.status}`,
		);
	}

	const data = (await response.json()) as {
		data?: { toggles?: ServiceToggleConfig };
		toggles?: ServiceToggleConfig;
	};

	return data.data?.toggles ?? data.toggles ?? {};
};

const assertWebpImages = async (page: Page) => {
	const ichefImages = page.locator('img[src*="ichef."]');
	const count = await ichefImages.count();

	test.skip(count === 0, 'No ichef images on page');

	const sources = await ichefImages.evaluateAll(images =>
		(images as HTMLImageElement[]).map(img => img.getAttribute('src')),
	);

	sources.forEach(src => {
		expect(src ?? '').toMatch(/\.webp(\?.*)?$/);
	});
};

test.describe('onDemandAudio', () => {
	onDemandAudioSuites.canonical.forEach(testSuite => {
		const testLabel = `${baseURL}${testSuite.path}`;

		test.describe(testLabel, () => {
			test.describe(`Tests for ${testSuite.service} onDemandAudio`, () => {
				test('should return a 200 status code', async ({ request }) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					await assert200HtmlResponse({
						request,
						path: testSuite.path,
						baseURL,
					});
				});

				test('should render a valid media player', async ({ page }) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					const pageData = await getOnDemandAudioPageData(page);
					test.skip(
						!getEpisodeAvailability(pageData),
						`Episode is not available: ${testSuite.path}`,
					);

					await expect(
						page.locator('[data-e2e="media-loader__container"]'),
					).toBeVisible();
				});

				test('should be displayed if the toggle is on, and shows the expected number of items', async ({
					page,
				}) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					const toggleName = testSuite.path.includes('podcasts')
						? 'recentPodcastEpisodes'
						: 'recentAudioEpisodes';

					const toggles = await getOnDemandAudioServiceToggles(testSuite.service);
					const recentEpisodesEnabled = toggles?.[toggleName]?.enabled;
					const recentEpisodesMaxNumber = parseInt(
						String(toggles?.[toggleName]?.value ?? '0'),
						10,
					);

					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					const recentEpisodesList = page.locator(
						'[data-e2e="recent-episodes-list"]',
					);

					if (recentEpisodesEnabled) {
						const pageData = await getOnDemandAudioPageData(page);
						const recentEpisodes = pageData?.recentEpisodes;

						if ((recentEpisodes?.length ?? 0) > 1 && recentEpisodesMaxNumber > 1) {
							await expect(recentEpisodesList).toBeVisible();
							const renderedCount = await recentEpisodesList
								.locator('[data-e2e="recent-episodes-list-item"]')
								.count();

							expect(renderedCount).toBeLessThanOrEqual(recentEpisodesMaxNumber);
							return;
						}

						return;
					}

					await expect(recentEpisodesList).toHaveCount(0);
				});

				test('should be displayed if there is enough schedule data', async ({
					page,
				}) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					const toggles = await getOnDemandAudioServiceToggles(testSuite.service);
					const scheduleIsEnabled = toggles?.onDemandRadioSchedule?.enabled;

					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					const pageData = await getOnDemandAudioPageData(page);
					const hasScheduleData = !!pageData?.radioScheduleData;
					const radioSchedule = page.locator('[data-e2e="radio-schedule"]');

					if (scheduleIsEnabled && hasScheduleData) {
						await expect(radioSchedule).toBeVisible();
						return;
					}

					if (scheduleIsEnabled && !hasScheduleData) {
						return;
					}

					await expect(radioSchedule).toHaveCount(0);
				});

				test('should have a script with src value set to chartbeat source', async ({
					page,
				}) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					await expect(
						page.locator(
							'script[src="https://static.chartbeat.com/js/chartbeat.js"]',
						),
					).toHaveCount(1);
				});

				test('should have chartbeat config set to window object', async ({
					page,
				}) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					const hasChartbeatConfig = await page.evaluate(
						() => !!(window as OnDemandAudioWindow)._sf_async_config,
					);

					expect(hasChartbeatConfig).toBe(true);
				});

				test('should have webp images on pages', async ({ page }) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					await assertWebpImages(page);
				});

				test('should render topic tags if they are in the json, and they should navigate to correct topic page', async ({
					page,
				}) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);
					test.skip(
						['sport', 'newsround', 'news'].includes(testSuite.service) ||
							appEnvFromProcess === 'local',
						'Topic tags disabled for this service or environment',
					);

					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					const topicTagsSection = page.locator(
						"aside[aria-labelledby*='related-topics']",
					);
					const hasTopicTags = await topicTagsSection.isVisible();

					if (!hasTopicTags) return;

					const firstTag = topicTagsSection.locator('a').first();
					const topicTitle = (await firstTag.textContent())?.trim();

					expect(
						topicTitle,
						'first topic tag should have non-empty text',
					).toBeTruthy();

					await firstTag.click();
					await expect(page.locator('h1')).toContainText(topicTitle as string);
				});

				test('should have a noscript img tag with the ati url', async ({ page }) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv) || !process.env.SMOKE,
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					const { atiUrl } = getATIUrls(appEnvFromProcess);

					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					const noScriptText = await page
						.locator('noscript[id="analytics-noscript"]')
						.textContent();

					if (noScriptText) {
						expect(noScriptText).toContain(
							`<img height="1px" width="1px" alt="" style="position:absolute" src="${atiUrl}`,
						);
					}
				});

				test('should show two tier navigation on desktop', async ({ page }) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv) ||
							!shouldTestTwoTierNav(testSuite.service),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					await page.setViewportSize({ width: 1008, height: 900 });
					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					await expect(page.locator('[data-e2e="scrollable-nav"]')).toBeVisible();
					await expect(
						page.locator('[data-e2e="scrollable-nav-secondary"] ul'),
					).toBeVisible();

					const primaryHrefs = await page
						.locator('[data-e2e="scrollable-nav"] a')
						.evaluateAll(links => links.map(link => link.getAttribute('href')));
					const secondaryHrefs = await page
						.locator('[data-e2e="scrollable-nav-secondary"] ul a')
						.evaluateAll(links => links.map(link => link.getAttribute('href')));

					[...primaryHrefs, ...secondaryHrefs].forEach(href => {
						expect(href).toBeTruthy();
						expect(href).not.toBe('');
					});
				});

				test('should show two tier navigation on mobile', async ({ page }) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv) ||
							!shouldTestTwoTierNav(testSuite.service),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					await page.setViewportSize({ width: 320, height: 480 });
					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					await expect(page.locator('[data-e2e="scrollable-nav"]')).toBeVisible();
					await expect(
						page.locator('[data-e2e="scrollable-nav-secondary"] ul'),
					).toBeVisible();

					const primaryHrefs = await page
						.locator('[data-e2e="scrollable-nav"] a')
						.evaluateAll(links => links.map(link => link.getAttribute('href')));
					const secondaryHrefs = await page
						.locator('[data-e2e="scrollable-nav-secondary"] ul a')
						.evaluateAll(links => links.map(link => link.getAttribute('href')));

					[...primaryHrefs, ...secondaryHrefs].forEach(href => {
						expect(href).toBeTruthy();
						expect(href).not.toBe('');
					});
				});

				test('dropdown menu should open and close when the menu button is clicked', async ({
					page,
				}) => {
					test.skip(
						!shouldRunForEnv(testSuite.runForEnv) ||
							!shouldTestTwoTierNav(testSuite.service),
						`Skipped for APP_ENV=${appEnvFromProcess}`,
					);

					await page.setViewportSize({ width: 320, height: 480 });
					await page.goto(`${baseURL}${testSuite.path}`, {
						waitUntil: 'domcontentloaded',
					});

					const menuButton = page.locator('nav button[aria-expanded]').first();

					await expect(page.locator('nav [data-e2e="scrollable-nav"]')).toBeVisible();
					await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
					await expect(
						page.locator('nav [data-e2e="dropdown-nav"] ul'),
					).not.toBeVisible();

					await menuButton.click();
					await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
					await expect(
						page.locator('nav [data-e2e="dropdown-nav"] ul'),
					).toBeVisible();

					await menuButton.click();
					await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
					await expect(
						page.locator('nav [data-e2e="dropdown-nav"] ul'),
					).not.toBeVisible();
				});
			});
		});
	});
});

test.describe('onDemandAudio ATI Analytics', () => {
	onDemandAudioSuites.ati.forEach(testSuite => {
		const testLabel = `${baseURL}${testSuite.path}`;

		test.describe(testLabel, () => {
			test.describe(`ATI Analytics for ${testSuite.service} onDemandAudio`, () => {
				const atiProps = {
					path: testSuite.path,
					baseURL,
					pageIdentifier: testSuite.pageIdentifier,
					siteId: testSuite.siteId,
					applicationType: testSuite.applicationType,
					contentType: testSuite.contentType,
					service: testSuite.service,
					appEnv: appEnvFromProcess,
				};

				if (testSuite.tests.includes('assertPageView')) {
					test('should send a page view event', async ({ page }) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertPageView({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertResonancePageView')) {
					test('should send a resonance page view event when applicable', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertResonancePageView({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertPodcastLinksComponentView')) {
					test('should send a view event for the Podcast Links component', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertPodcastLinksComponentView({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertPodcastLinksComponentClick')) {
					test('should send a click event for the Podcast Links component', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertPodcastLinksComponentClick({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertRecentAudioEpisodesComponentView')) {
					test('should send a view event for the Recent Audio Episodes component', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertRecentAudioEpisodesComponentView({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertRecentAudioEpisodesComponentClick')) {
					test('should send a click event for the Recent Audio Episodes component', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertRecentAudioEpisodesComponentClick({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertRadioScheduleComponentView')) {
					test('should send a view event for the Radio Schedule component', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertRadioScheduleComponentView({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertRadioScheduleComponentClick')) {
					test('should send a click event for the Radio Schedule component', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertRadioScheduleComponentClick({ page, ...atiProps });
					});
				}
			});
		});
	});
});

test.describe('onDemandAudio ATI Analytics Lite', () => {
	onDemandAudioSuites.atiLite.forEach(testSuite => {
		const testLabel = `${baseURL}${testSuite.path}`;

		test.describe(testLabel, () => {
			test.describe(`ATI Analytics Lite for ${testSuite.service} onDemandAudio`, () => {
				const atiProps = {
					path: testSuite.path,
					baseURL,
					pageIdentifier: testSuite.pageIdentifier,
					siteId: testSuite.siteId,
					applicationType: testSuite.applicationType,
					contentType: testSuite.contentType,
					service: testSuite.service,
					appEnv: appEnvFromProcess,
				};

				if (testSuite.tests.includes('assertPageView')) {
					test('should send a page view event', async ({ page }) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertPageView({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertResonancePageView')) {
					test('should send a resonance page view event when applicable', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertResonancePageView({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertPodcastLinksComponentView')) {
					test('should send a view event for the Podcast Links component', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertPodcastLinksComponentView({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertPodcastLinksComponentClick')) {
					test('should send a click event for the Podcast Links component', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertPodcastLinksComponentClick({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertRecentAudioEpisodesComponentView')) {
					test('should send a view event for the Recent Audio Episodes component', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertRecentAudioEpisodesComponentView({ page, ...atiProps });
					});
				}

				if (testSuite.tests.includes('assertRecentAudioEpisodesComponentClick')) {
					test('should send a click event for the Recent Audio Episodes component', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertRecentAudioEpisodesComponentClick({ page, ...atiProps });
					});
				}

				if (
					testSuite.tests.includes('assertLiteSiteSummaryComponentToMainSiteClick')
				) {
					test('should send a click event for the Lite Site Summary component to main site link', async ({
						page,
					}) => {
						test.skip(
							!shouldRunForEnv(testSuite.runForEnv),
							`Skipped for APP_ENV=${appEnvFromProcess}`,
						);

						await assertLiteSiteSummaryComponentToMainSiteClick({
							page,
							...atiProps,
						});
					});
				}
			});
		});
	});
});
