/* eslint-disable no-console, no-await-in-loop */
// Spike: compares page weight and beacon sizes for canonical, lite and lite + Resonance.
//
//   node scripts/spikes/liteResonance/measure.mjs --variant=canonical
//   node scripts/spikes/liteResonance/measure.mjs --variant=lite
//   node scripts/spikes/liteResonance/measure.mjs --variant=lite-resonance
//   node scripts/spikes/liteResonance/measure.mjs --report
//
// "lite-resonance" needs the server started with SIMORGH_SPIKE_LITE_RESONANCE=true.
import { chromium } from 'playwright';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const VARIANTS = ['canonical', 'lite', 'lite-resonance'];
const TEXT_TYPES = ['Document', 'Script', 'Stylesheet'];
const LITE_BUDGET_KB = 50;
const resultsDir = join(tmpdir(), 'lite-resonance-spike');

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter(arg => arg.startsWith('--'))
    .map(arg => {
      const [key, value = 'true'] = arg.slice(2).split('=');
      return [key, value];
    }),
);

const baseUrl = args.base ?? 'http://localhost:7081';
const pagePath = args.page ?? '/arabic';
const runs = Number(args.runs ?? 5);

const kb = bytes => Number((bytes / 1024).toFixed(2));
const sum = values => values.reduce((total, value) => total + value, 0);
const median = values => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

const hostnameOf = url => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

const isResonanceBeacon = url =>
  /^bag(\.test)?\.api\.bbc\.co\.uk$/.test(hostnameOf(url));
const isReverbBeacon = url => {
  const hostname = hostnameOf(url);
  return hostname.endsWith('ati-host.net') || hostname === 'a1.api.bbc.co.uk';
};
const isBeacon = url => isResonanceBeacon(url) || isReverbBeacon(url);

const pathForVariant = variant =>
  variant === 'canonical' ? pagePath : `${pagePath}.lite`;

const labelResonanceBeacon = body => {
  try {
    const { bag_metadata: metadata, events } = JSON.parse(body);
    const eventName = events?.[0]?.event_name;
    return [metadata?.event_category, eventName].filter(Boolean).join(':');
  } catch {
    return 'unparsed';
  }
};

const labelReverbBeacon = url => {
  const events = new URL(url).searchParams.get('events') ?? '';
  if (events.includes('"action":"view"')) return 'component-view';
  if (events.includes('"action":"select"')) return 'component-click';
  return 'page-view';
};

const describeBeacon = async ({ request, phase }) => {
  const url = request.url();
  const { pathname, search } = new URL(url);
  const headers = await request.allHeaders();
  const headerBytes = sum(
    Object.entries(headers).map(([name, value]) =>
      Buffer.byteLength(`${name}: ${value}\r\n`),
    ),
  );
  const requestLineBytes = Buffer.byteLength(
    `${request.method()} ${pathname}${search} HTTP/1.1\r\n`,
  );
  const body = request.postData() ?? '';
  const bodyBytes = Buffer.byteLength(body);
  const isResonance = isResonanceBeacon(url);

  return {
    kind: isResonance ? 'resonance' : 'reverb',
    label: isResonance ? labelResonanceBeacon(body) : labelReverbBeacon(url),
    phase,
    method: request.method(),
    urlBytes: Buffer.byteLength(url),
    headerBytes: requestLineBytes + headerBytes + 2,
    bodyBytes,
    totalBytes: requestLineBytes + headerBytes + 2 + bodyBytes,
  };
};

const stubBeacons = async context => {
  const origin = new URL(baseUrl).origin;
  await context.route(
    request => isBeacon(request.toString()),
    route =>
      route.fulfill({
        status: 204,
        headers: {
          'access-control-allow-origin': origin,
          'access-control-allow-credentials': 'true',
          'access-control-allow-headers': '*',
        },
      }),
  );
};

const collectNetwork = async ({ context, page }) => {
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });

  const entries = new Map();
  cdp.on('Network.requestWillBeSent', ({ requestId, request, type }) => {
    entries.set(requestId, {
      requestId,
      url: request.url,
      type: type ?? 'Other',
      status: null,
      decodedBytes: 0,
      transferBytes: 0,
      finished: false,
    });
  });
  cdp.on('Network.responseReceived', ({ requestId, response }) => {
    const entry = entries.get(requestId);
    if (entry) entry.status = response.status;
  });
  cdp.on('Network.dataReceived', ({ requestId, dataLength }) => {
    const entry = entries.get(requestId);
    if (entry) entry.decodedBytes += dataLength;
  });
  cdp.on('Network.loadingFinished', ({ requestId, encodedDataLength }) => {
    const entry = entries.get(requestId);
    if (entry) {
      entry.transferBytes = encodedDataLength;
      entry.finished = true;
    }
  });

  const snapshot = async () => {
    const resources = [...entries.values()].filter(
      ({ url, finished }) =>
        finished && url.startsWith('http') && !isBeacon(url),
    );

    return Promise.all(
      resources.map(async resource => {
        if (!TEXT_TYPES.includes(resource.type)) {
          return { ...resource, normalisedBytes: resource.transferBytes };
        }

        try {
          const { body, base64Encoded } = await cdp.send(
            'Network.getResponseBody',
            { requestId: resource.requestId },
          );
          const buffer = Buffer.from(body, base64Encoded ? 'base64' : 'utf8');
          return {
            ...resource,
            decodedBytes: buffer.length,
            normalisedBytes: gzipSync(buffer, { level: 6 }).length,
          };
        } catch {
          return { ...resource, normalisedBytes: resource.transferBytes };
        }
      }),
    );
  };

  return { snapshot };
};

const scrollThroughPage = page =>
  page.evaluate(async () => {
    const step = 300;
    const pause = 250;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, pause));
    }
  });

const clickFirstLink = async ({ page, variant }) => {
  if (variant === 'canonical') {
    await page.evaluate(() =>
      document.addEventListener('click', event => event.preventDefault(), true),
    );
  }

  const selector =
    variant === 'canonical' ? 'main a[href]' : 'a[data-static-reverb-click]';

  try {
    await page.locator(selector).first().click({ timeout: 5000 });
    await page.waitForTimeout(1000);
  } catch (error) {
    console.warn(`Could not click a link for click beacon: ${error.message}`);
  }
};

const measureRun = async ({ browser, variant, captureBeacons }) => {
  const context = await browser.newContext({
    viewport: { width: 360, height: 740 },
    serviceWorkers: 'block',
  });
  const page = await context.newPage();
  await stubBeacons(context);
  const network = await collectNetwork({ context, page });

  const pendingBeacons = [];
  let phase = 'load';
  page.on('request', request => {
    if (isBeacon(request.url()) && request.method() !== 'OPTIONS') {
      pendingBeacons.push(describeBeacon({ request, phase }));
    }
  });

  await page.goto(`${baseUrl}${pathForVariant(variant)}`, {
    waitUntil: 'load',
  });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(1500);

  const resources = await network.snapshot();

  if (captureBeacons) {
    phase = 'interaction';
    await scrollThroughPage(page);
    await page.waitForTimeout(1500);
    await clickFirstLink({ page, variant });
  }

  const beacons = await Promise.all(pendingBeacons);
  await context.close();

  return { resources, beacons };
};

const weightByType = resources => {
  const bytesFor = (key, types) =>
    sum(
      resources
        .filter(({ type }) => types.includes(type))
        .map(resource => resource[key]),
    );
  const summarise = key => {
    const known = ['Document', 'Script', 'Stylesheet', 'Image', 'Font'];
    return {
      document: kb(bytesFor(key, ['Document'])),
      js: kb(bytesFor(key, ['Script'])),
      css: kb(bytesFor(key, ['Stylesheet'])),
      images: kb(bytesFor(key, ['Image'])),
      fonts: kb(bytesFor(key, ['Font'])),
      other: kb(
        sum(
          resources
            .filter(({ type }) => !known.includes(type))
            .map(resource => resource[key]),
        ),
      ),
      total: kb(sum(resources.map(resource => resource[key]))),
      totalExcludingImages: kb(
        sum(
          resources
            .filter(({ type }) => type !== 'Image')
            .map(resource => resource[key]),
        ),
      ),
    };
  };

  return {
    requests: resources.length,
    transfer: summarise('transferBytes'),
    normalised: summarise('normalisedBytes'),
  };
};

const measureVariant = async variant => {
  const browser = await chromium.launch();
  const runResults = [];

  try {
    for (let run = 0; run < runs; run += 1) {
      console.log(`${variant}: run ${run + 1}/${runs}`);
      const result = await measureRun({
        browser,
        variant,
        captureBeacons: run === 0,
      });
      runResults.push({ ...result, weight: weightByType(result.resources) });
    }
  } finally {
    await browser.close();
  }

  const medianTotal = median(
    runResults.map(({ weight }) => weight.transfer.total),
  );
  const representative =
    runResults.find(({ weight }) => weight.transfer.total === medianTotal) ??
    runResults[0];

  return {
    variant,
    path: pathForVariant(variant),
    runs,
    weight: representative.weight,
    resources: representative.resources.map(
      ({ url, type, transferBytes, normalisedBytes, decodedBytes }) => ({
        url,
        type,
        transferBytes,
        normalisedBytes,
        decodedBytes,
      }),
    ),
    beacons: runResults[0].beacons,
  };
};

const loadResults = () => {
  try {
    return Object.fromEntries(
      readdirSync(resultsDir)
        .filter(file => file.endsWith('.json'))
        .map(file => [
          file.replace('.json', ''),
          JSON.parse(readFileSync(join(resultsDir, file), 'utf8')),
        ]),
    );
  } catch {
    return {};
  }
};

const printReport = results => {
  const present = VARIANTS.filter(variant => results[variant]);

  if (present.length === 0) {
    console.log('No results yet. Run the script with --variant=<name> first.');
    return;
  }

  const row = (key, { variant, weight }) => ({
    variant,
    requests: weight.requests,
    'document KB': weight[key].document,
    'js KB': weight[key].js,
    'css KB': weight[key].css,
    'images KB': weight[key].images,
    'fonts KB': weight[key].fonts,
    'other KB': weight[key].other,
    'total KB': weight[key].total,
    'total excl. images KB': weight[key].totalExcludingImages,
  });

  console.log('\nPage weight, as transferred (initial load, cold cache)');
  console.table(present.map(variant => row('transfer', results[variant])));

  console.log(
    '\nPage weight, text assets re-compressed with gzip level 6 (CDN-like)',
  );
  console.table(present.map(variant => row('normalised', results[variant])));

  const { lite, 'lite-resonance': liteResonance, canonical } = results;

  if (lite && liteResonance) {
    const delta = key =>
      Number(
        (liteResonance.weight[key].total - lite.weight[key].total).toFixed(2),
      );
    const liteTotal = liteResonance.weight.normalised.totalExcludingImages;
    console.log('\nLite with Resonance vs lite without');
    console.table([
      {
        'delta transfer KB': delta('transfer'),
        'delta normalised KB': delta('normalised'),
        'lite+Resonance total excl. images KB': liteTotal,
        [`budget (${LITE_BUDGET_KB} KB) used %`]: Number(
          (
            (liteResonance.weight.normalised.total / LITE_BUDGET_KB) *
            100
          ).toFixed(1),
        ),
      },
    ]);

    const knownUrls = new Set(lite.resources.map(({ url }) => url));
    const added = liteResonance.resources.filter(
      ({ url }) => !knownUrls.has(url),
    );
    if (added.length > 0) {
      console.log('Requests only present with Resonance:');
      console.table(
        added.map(({ url, type, transferBytes, normalisedBytes }) => ({
          url,
          type,
          'transfer KB': kb(transferBytes),
          'normalised KB': kb(normalisedBytes),
        })),
      );
    }
  }

  if (canonical && lite) {
    console.log(
      `\nLite is ${(
        (1 - lite.weight.transfer.total / canonical.weight.transfer.total) *
        100
      ).toFixed(1)}% lighter than canonical (transfer).`,
    );
  }

  const beaconRows = present.flatMap(variant =>
    results[variant].beacons.map(beacon => ({
      variant,
      kind: beacon.kind,
      label: beacon.label,
      phase: beacon.phase,
      method: beacon.method,
      'url bytes': beacon.urlBytes,
      'headers bytes': beacon.headerBytes,
      'body bytes': beacon.bodyBytes,
      'total bytes': beacon.totalBytes,
    })),
  );

  console.log(
    '\nBeacons (first run; request bytes as HTTP/1.1 text, before HTTP/2 header compression)',
  );
  console.table(beaconRows);
};

if (!args.report) {
  if (!VARIANTS.includes(args.variant)) {
    console.error(`Pass --variant=${VARIANTS.join('|')} or --report`);
    process.exit(1);
  }

  const result = await measureVariant(args.variant);
  mkdirSync(resultsDir, { recursive: true });
  writeFileSync(
    join(resultsDir, `${args.variant}.json`),
    JSON.stringify(result, null, 2),
  );
  console.log(`Saved results to ${join(resultsDir, `${args.variant}.json`)}`);
}

printReport(loadResults());
