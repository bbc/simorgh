/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable consistent-return */
import path from 'ramda/src/path';
import getInitialData from '#app/routes/topic/getInitialData';
import { getUrlPath } from '#lib/utilities/urlParser';
import envConfig from '../../../support/config/envs';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import getDataUrl from '../../../support/helpers/getDataUrl';
import processRecentEpisodes from '../../../../src/app/routes/utils/processRecentEpisodes';

export default ({ service, pageType, variant, isAmp }) => {
  describe(`Tests for ${service} ${pageType}`, () => {
    it('should render a H1, which contains/displays topic title', () => {
      const currentpath = Cypress.env('currentPath');
      cy.log(currentpath);
      // let topicId;
      //  if (!isAmp)
      //   {topicId  = currentpath.split('topics/').pop().split('?')[0];}
      // else
      //   {topicId  = currentpath.split('topics/').pop().split('.amp')[0];}
      // cy.log(topicId);
      // const initialdata = getInitialData({
      //   getAgent,
      //   service,
      //   path: pathname,
      //   variant,
      // });
     

      // cy.request(`https://fabl.api.bbci.co.uk/module/topic?id=${topicId}`).then(({ body }) => {
      //   const headlineData = getBlockData('headline', body);
      //   cy.get('h1').should(
      //     'contain',
      //     headlineData.model.blocks[0].model.blocks[0].model.text,
      //   );
      // });
    });
  });
};
