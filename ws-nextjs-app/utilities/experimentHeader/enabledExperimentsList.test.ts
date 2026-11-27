import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { MAP_REGISTRATION_EXPERIMENT_NAME } from '#app/components/Account/MapRegistrationBannerExperiment/config';
import enabledExperimentList from './enabledExperimentsList';

describe('enabledExperimentList', () => {
  it('enables the Hindi MAP registration experiment for article request types', () => {
    expect(enabledExperimentList).toContainEqual({
      name: MAP_REGISTRATION_EXPERIMENT_NAME,
      services: ['hindi'],
      pageTypes: [ARTICLE_PAGE, MEDIA_ARTICLE_PAGE],
    });
  });
});
