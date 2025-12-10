import { Platforms } from '#app/models/types/global';
import * as genericLabelHelpers from '../../../lib/analyticsUtils';
import { buildReverbAnalyticsModel, buildReverbEventModel } from '.';

const mockAndSet = ({ name, source }, response) => {
  source[name] = jest.fn(); // eslint-disable-line no-param-reassign
  source[name].mockImplementation(() => response);
};

const analyticsUtilFunctions = [
  { name: 'getDestination', source: genericLabelHelpers },
  { name: 'getAppType', source: genericLabelHelpers },
  { name: 'getScreenInfo', source: genericLabelHelpers },
  { name: 'getBrowserViewPort', source: genericLabelHelpers },
  { name: 'getCurrentTime', source: genericLabelHelpers },
  { name: 'getDeviceLanguage', source: genericLabelHelpers },
  { name: 'getHref', source: genericLabelHelpers },
  { name: 'getReferrer', source: genericLabelHelpers },
  { name: 'getAtUserId', source: genericLabelHelpers },
  { name: 'getATIMarketingString,', source: genericLabelHelpers },
  { name: 'isLocServeCookieSet', source: genericLabelHelpers },
  { name: 'sanitise', source: genericLabelHelpers },
];

describe('atiUrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Reverb', () => {
    describe('buildReverbAnalyticsModel', () => {
      beforeEach(() => {
        analyticsUtilFunctions.forEach(func => {
          mockAndSet(func, func.name);
        });
      });

      const input = {
        appName: 'news',
        campaigns: [
          {
            campaignId: '1',
            campaignName: 'campaign1',
          },
          {
            campaignId: '2',
            campaignName: 'campaign2',
          },
        ],
        categoryName: 'categoryName',
        contentId: 'contentId',
        contentType: 'contentType',
        language: 'language',
        ldpThingIds: 'ldpThingIds',
        ldpThingLabels: 'ldpThingLabels',
        libraryVersion: 'libraryVersion',
        pageIdentifier: 'pageIdentifier',
        pageTitle: 'pageTitle',
        platform: 'canonical' as Platforms,
        producerName: 'producerName',
        nationsProducer: '',
        statsDestination: 'statsDestination',
        timePublished: 'timePublished',
        timeUpdated: 'timeUpdated',
      };

      it('should return the correct Reverb analytics model', () => {
        const reverbAnalyticsModel = buildReverbAnalyticsModel(input);

        const pageParams = {
          contentId: 'contentId',
          contentType: 'contentType',
          destination: 'statsDestination',
          name: 'pageIdentifier',
          producer: 'producerName',
          additionalProperties: {
            app_name: 'news',
            app_type: 'getAppType',
            content_language: 'language',
            product_platform: null,
            referrer_url: 'getReferrer',
            x5: 'getHref',
            x8: 'libraryVersion',
            x9: 'sanitise',
            x10: '',
            x11: 'timePublished',
            x12: 'timeUpdated',
            x13: 'ldpThingLabels',
            x14: 'ldpThingIds',
            x16: 'campaign1~campaign2',
            x17: 'categoryName',
            x18: 'isLocServeCookieSet',
          },
        };
        const userParams = { isSignedIn: false };

        expect(reverbAnalyticsModel.params.page).toEqual(pageParams);
        expect(reverbAnalyticsModel.params.user).toEqual(userParams);

        expect(reverbAnalyticsModel.eventDetails).toEqual({
          eventName: 'pageView',
        });
      });

      it('should return the correct Reverb analytics model for AMP', () => {
        const reverbAnalyticsModel = buildReverbAnalyticsModel({
          ...input,
          platform: 'amp' as Platforms,
        });

        const pageParams = {
          contentId: 'contentId',
          contentType: 'contentType',
          destination: 'statsDestination',
          name: 'pageIdentifier',
          producer: 'producerName',
          additionalProperties: {
            app_name: 'news',
            app_type: 'getAppType',
            content_language: 'language',
            product_platform: null,
            referrer_url: 'getReferrer',
            x5: 'getHref',
            x8: 'libraryVersion',
            x9: 'sanitise',
            x10: '',
            x11: 'timePublished',
            x12: 'timeUpdated',
            x13: 'ldpThingLabels',
            x14: 'ldpThingIds',
            x16: 'campaign1~campaign2',
            x17: 'categoryName',
            x18: 'isLocServeCookieSet',
          },
        };
        const userParams = { isSignedIn: false };

        expect(reverbAnalyticsModel.params.page).toEqual(pageParams);
        expect(reverbAnalyticsModel.params.user).toEqual(userParams);

        expect(reverbAnalyticsModel.eventDetails).toEqual({
          eventName: 'pageView',
        });
      });

      it('should add experiment fields if experimentVariant is present', () => {
        const reverbAnalyticsModel = buildReverbAnalyticsModel({
          ...input,
          experimentName: 'dummy_experiment',
          experimentVariant: 'variant_1',
        });

        const pageParams = {
          contentId: 'contentId',
          contentType: 'contentType',
          destination: 'statsDestination',
          name: 'pageIdentifier',
          producer: 'producerName',
          additionalProperties: {
            app_name: 'news',
            app_type: 'getAppType',
            content_language: 'language',
            product_platform: null,
            referrer_url: 'getReferrer',
            x5: 'getHref',
            x8: 'libraryVersion',
            x9: 'sanitise',
            x10: '',
            x11: 'timePublished',
            x12: 'timeUpdated',
            x13: 'ldpThingLabels',
            x14: 'ldpThingIds',
            x16: 'campaign1~campaign2',
            x17: 'categoryName',
            x18: 'isLocServeCookieSet',
            mv_creation: 'variant_1',
            mv_test: 'dummy_experiment',
          },
        };

        expect(reverbAnalyticsModel.params.page).toEqual(pageParams);
      });
    });

    describe('buildReverbEventModel', () => {
      const input = {
        pageIdentifier: 'mundo.page',
        producerName: 'MUNDO',
        statsDestination: 'statsDestination',
        componentName: 'top-stories',
        campaignID: '1234',
        format: 'format',
        type: 'view',
        advertiserID: 'advertiserID',
        url: 'http://localhost',
      };

      it('should return the correct Reverb page section view event model', () => {
        const reverbPageSectionViewEventModel = buildReverbEventModel(input);

        const pageSectionViewEventParams = {
          destination: 'statsDestination',
          name: 'mundo.page',
          producer: 'MUNDO',
          additionalProperties: {
            type: 'AT',
          },
        };

        expect(reverbPageSectionViewEventModel.params.page).toEqual(
          pageSectionViewEventParams,
        );
      });

      it('should return the correct Reverb page section click event model', () => {
        const reverbPageSectionViewEventModel = buildReverbEventModel({
          ...input,
          type: 'click',
        });

        const pageSectionViewEventParams = {
          destination: 'statsDestination',
          name: 'mundo.page',
          producer: 'MUNDO',
          additionalProperties: {
            type: 'AT',
          },
        };

        expect(reverbPageSectionViewEventModel.params.page).toEqual(
          pageSectionViewEventParams,
        );
      });

      it('should return the correct Reverb user object configuration', () => {
        const reverbPageSectionViewEventModel = buildReverbEventModel(input);

        expect(reverbPageSectionViewEventModel.params.user).toEqual({
          isSignedIn: false,
        });
      });

      it('should return the correct Reverb item event model', () => {
        const componentSpecificTrack = buildReverbEventModel({
          ...input,
          itemTracker: {
            type: 'portrait-video-promo',
            text: 'Rollercoaster facts... while riding a rollercoaster',
            position: 1,
            duration: 73000,
            resourceId: 'testResourceId',
          },
        });

        expect(componentSpecificTrack.eventDetails.item).toEqual({
          attribution: 'advertiserID',
          duration: 73000,
          link: 'http://localhost',
          name: 'top-stories',
          position: 1,
          resource_id: 'testResourceId',
          text: 'Rollercoaster facts... while riding a rollercoaster',
          type: 'portrait-video-promo',
        });
      });

      it('should return the correct Reverb group event model', () => {
        const blockSpecificTrack = buildReverbEventModel({
          ...input,
          groupTracker: {
            itemCount: 11,
            resourceId: 'blockLevelResourceId',
          },
        });

        expect(blockSpecificTrack.eventDetails.group).toEqual({
          item_count: 11,
          name: '1234',
          resource_id: 'blockLevelResourceId',
          type: 'top-stories',
        });
      });

      it('should return the correct Reverb event details grouping data', () => {
        const result = buildReverbEventModel({
          ...input,
          eventGroupingName: 'customEventGroupingName',
        });

        expect(result.eventDetails.event).toEqual({
          action: 'view',
          category: 'viewability',
          grouping: 'customEventGroupingName',
        });
      });

      describe('Viewability Model', () => {
        it('should return the correct event details for the Reverb page section view event model', () => {
          const reverbPageSectionViewEventModel = buildReverbEventModel(input);

          expect(reverbPageSectionViewEventModel.eventDetails).toEqual({
            eventName: 'sectionView',
            eventPublisher: 'viewability',
            item: {
              attribution: 'advertiserID',
              name: 'top-stories',
              link: 'http://localhost',
            },
            group: {
              name: '1234',
              type: 'top-stories',
            },
            event: {
              category: 'viewability',
              action: 'view',
            },
            isClick: false,
          });
        });

        it('should return the correct event details for the Reverb page section click event model', () => {
          const reverbPageSectionViewEventModel = buildReverbEventModel({
            ...input,
            type: 'click',
          });

          expect(reverbPageSectionViewEventModel.eventDetails).toEqual({
            eventName: 'sectionClick',
            eventPublisher: 'viewability',
            item: {
              attribution: 'advertiserID',
              name: 'top-stories',
              link: 'http://localhost',
            },
            group: {
              name: '1234',
              type: 'top-stories',
            },
            event: {
              category: 'viewability',
              action: 'select',
            },
            isClick: true,
          });
        });

        it('should omit the attribution and link attributes from the event details configuration', () => {
          const inputWithAdvertiserIDAndUrlMissing = {
            pageIdentifier: 'mundo.page',
            producerName: 'MUNDO',
            statsDestination: 'statsDestination',
            componentName: 'top-stories',
            campaignID: '1234',
            format: 'format',
            type: 'view',
          };

          const reverbPageSectionViewEventModel = buildReverbEventModel(
            inputWithAdvertiserIDAndUrlMissing,
          );

          expect(reverbPageSectionViewEventModel.eventDetails).toEqual({
            eventName: 'sectionView',
            eventPublisher: 'viewability',
            item: {
              name: 'top-stories',
            },
            group: {
              name: '1234',
              type: 'top-stories',
            },
            event: {
              category: 'viewability',
              action: 'view',
            },
            isClick: false,
          });
        });

        it('should add experiment fields if experimentVariant is present', () => {
          const reverbPageSectionViewEventModel = buildReverbEventModel({
            ...input,
            experimentName: 'dummy_experiment',
            experimentVariant: 'variant_1',
          });

          expect(reverbPageSectionViewEventModel.eventDetails).toEqual({
            eventName: 'sectionView',
            eventPublisher: 'viewability',
            item: {
              attribution: 'advertiserID',
              name: 'top-stories',
              link: 'http://localhost',
            },
            group: {
              name: '1234',
              type: 'top-stories',
            },
            event: {
              category: 'viewability',
              action: 'view',
            },
            isClick: false,
            experience: {
              engine_type: ['experimentation'],
              engine_id: ['optimizely.dummy_experiment.variant_1'],
            },
          });
        });
      });
    });
  });
});
