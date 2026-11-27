import type { Page } from '@playwright/test';
import type { OnwardJourney } from '#app/contexts/ArticleOnwardJourneysContext';

const scrollToOnwardJourney = async ({
  page,
  onwardJourney,
  selector,
}: {
  page: Page;
  onwardJourney: OnwardJourney;
  selector: string;
}) => {
  await page
    .locator(
      `:is(${selector}, [data-testid="onward-journey-reservation-${onwardJourney}"], [data-testid="onward-journey-skeleton-${onwardJourney}"]):visible`,
    )
    .first()
    .evaluate(element => element.scrollIntoView({ block: 'center' }));
  await page.locator(selector).first().scrollIntoViewIfNeeded();
};

export default scrollToOnwardJourney;
