import { Translations } from '#app/models/types/translations';
import { service as afriqueServiceConfig } from '#app/lib/config/services/afrique';
import { service as persianServiceConfig } from '#app/lib/config/services/persian';
import fixtureData from '#data/afrique/live/c7gk1vjglxn1t.json';
import preEvent from '#app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/pre-event/pre-event.json';
import beforeExtraTime from '#app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/mid-event/before-extra-time.json';
import beforePens from '#app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/mid-event/before-pens.json';
import firstHalf90 from '#app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/mid-event/first-half-90.json';
import etFirstHalf from '#app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/mid-event/et-first-half.json';
import halfTime from '#app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/mid-event/half-time.json';
import firstHalfAddedTime from '#app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/mid-event/first-half-added-time.json';
import secondLegAetPens from '#app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/mid-event/second-leg-aet-pens.json';
import aet from '#src/app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/post-event/aet.json';
import postEvent from '#src/app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/post-event/post-event.json';
import translateSportData from './translateSportData';
import { HeadToHeadV2Data } from '../types';

const fixtureDataDefault = fixtureData.data.sportDataEventContent
  .sportDataEvent as unknown as HeadToHeadV2Data;

const fixtureDataWithWorldCupTeamNames = {
  ...fixtureData.data.sportDataEventContent.sportDataEvent,
  home: {
    ...fixtureData.data.sportDataEventContent.sportDataEvent.home,
    fullName: 'England',
    shortName: 'England',
    urn: 'urn:bbc:sportsdata:football:team:england',
  },
  away: {
    ...fixtureData.data.sportDataEventContent.sportDataEvent.away,
    fullName: 'Germany',
    shortName: 'Germany',
    urn: 'urn:bbc:sportsdata:football:team:germany',
  },
} as unknown as HeadToHeadV2Data;

const translationsWithMissingTranslations = {
  ...afriqueServiceConfig.default.translations,
  sport: {
    matchSummary: 'matchSummary',
  },
};

describe('TranslateSportData', () => {
  it('should return the data unchanged if no sport translations are available', () => {
    const result = translateSportData(
      fixtureData.data.sportDataEventContent
        .sportDataEvent as unknown as HeadToHeadV2Data,
      {} as Translations,
      'afrique',
    );
    expect(result).toStrictEqual(
      fixtureData.data.sportDataEventContent.sportDataEvent,
    );
  });

  it('should return pre event unchanged since there are no applicable translations', () => {
    const result = translateSportData(
      preEvent as unknown as HeadToHeadV2Data,
      afriqueServiceConfig.default.translations,
      'afrique',
    );
    expect(result).toStrictEqual(preEvent);
  });

  describe('Team names', () => {
    it('should translate the team names correctly when translations are available', () => {
      const result = translateSportData(
        fixtureDataWithWorldCupTeamNames,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.home.fullName).toEqual('Angleterre');
      expect(result.home.shortName).toEqual('Angleterre');
      expect(result.away.fullName).toEqual('Allemagne');
      expect(result.away.shortName).toEqual('Allemagne');
    });

    it('should return the team names unchanged when translations are not available', () => {
      const result = translateSportData(
        fixtureDataWithWorldCupTeamNames,
        translationsWithMissingTranslations,
        'afrique',
      );
      expect(result.home.fullName).toEqual('England');
      expect(result.home.shortName).toEqual('England');
      expect(result.away.fullName).toEqual('Germany');
      expect(result.away.shortName).toEqual('Germany');
    });

    it('should return the team names unchanged when translations are not found', () => {
      const result = translateSportData(
        fixtureDataDefault,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.home.fullName).toEqual('Bologna');
      expect(result.home.shortName).toEqual('Bologna');
      expect(result.away.fullName).toEqual('Aston Villa');
      expect(result.away.shortName).toEqual('Aston Villa');
    });
  });

  describe('Scores and Running Scores', () => {
    it('should update the scores to non western service numerals for applicable service', () => {
      const result = translateSportData(
        fixtureDataDefault,
        persianServiceConfig.default.translations,
        'persian',
      );
      expect(result.home.score).toEqual('۱');
      expect(result.home.scoreUnconfirmed).toEqual('۱');
      expect(result.away.score).toEqual('۳');
      expect(result.away.scoreUnconfirmed).toEqual('۳');
    });

    it('should update the scores to western service numerals for applicable service', () => {
      const result = translateSportData(
        fixtureDataDefault,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.home.score).toEqual('1');
      expect(result.home.scoreUnconfirmed).toEqual('1');
      expect(result.away.score).toEqual('3');
      expect(result.away.scoreUnconfirmed).toEqual('3');
    });

    it('should update the running scores to non western service numerals for applicable service', () => {
      const result = translateSportData(
        fixtureDataDefault,
        persianServiceConfig.default.translations,
        'persian',
      );
      expect(result.home.runningScores).toStrictEqual({
        aggregate: '۱',
        fulltime: '۱',
        halftime: '۰',
      });
      expect(result.away.runningScores).toStrictEqual({
        aggregate: '۳',
        fulltime: '۳',
        halftime: '۱',
      });
    });

    it('should update the running scores to western service numerals for applicable service', () => {
      const result = translateSportData(
        fixtureDataDefault,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.home.runningScores).toStrictEqual({
        aggregate: '1',
        fulltime: '1',
        halftime: '0',
      });
      expect(result.away.runningScores).toStrictEqual({
        aggregate: '3',
        fulltime: '3',
        halftime: '1',
      });
    });

    it('should handle all possible running scores fields', () => {
      const result = translateSportData(
        secondLegAetPens as unknown as HeadToHeadV2Data,
        persianServiceConfig.default.translations,
        'persian',
      );
      expect(result.home.runningScores).toStrictEqual({
        aggregate: '۴',
        extratime: '۲',
        fulltime: '۲',
        halftime: '۲',
        penaltyShootout: '۲',
      });
      expect(result.away.runningScores).toStrictEqual({
        aggregate: '۳',
        extratime: '۲',
        fulltime: '۲',
        halftime: '۲',
        penaltyShootout: '۲',
      });
    });

    it('should return unknown running scores fields unchanged', () => {
      const fixtureDataWithUnknownRunningScoreField = {
        ...secondLegAetPens,
        home: {
          ...secondLegAetPens.home,
          runningScores: {
            fulltime: '1',
            blah: '0',
          },
        },
        away: {
          ...secondLegAetPens.away,
          runningScores: {
            fulltime: '1',
            blah: '2',
          },
        },
      };
      const result = translateSportData(
        fixtureDataWithUnknownRunningScoreField as unknown as HeadToHeadV2Data,
        persianServiceConfig.default.translations,
        'persian',
      );
      expect(result.home.runningScores).toStrictEqual({
        blah: '0',
        fulltime: '۱',
      });
      expect(result.away.runningScores).toStrictEqual({
        blah: '2',
        fulltime: '۱',
      });
    });
  });

  describe('Period label', () => {
    it('should add translation for Extra Time', () => {
      const result = translateSportData(
        beforeExtraTime as unknown as HeadToHeadV2Data,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.periodLabel).toStrictEqual({
        accessible: beforeExtraTime.periodLabel.accessible,
        translation: 'Prolongation',
        value: beforeExtraTime.periodLabel.value,
      });
    });

    it('should add translation for Extra Time with minute count', () => {
      const result = translateSportData(
        etFirstHalf as unknown as HeadToHeadV2Data,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.periodLabel).toStrictEqual({
        accessible: etFirstHalf.periodLabel.accessible,
        translation: "98' Prolongation",
        value: "98' ET", // not an exact match for fixture since the function trims white space
      });
    });

    it('should add translation for Penalties', () => {
      const result = translateSportData(
        beforePens as unknown as HeadToHeadV2Data,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.periodLabel).toStrictEqual({
        accessible: beforePens.periodLabel.accessible,
        translation: 'PEN',
        value: beforePens.periodLabel.value,
      });
    });

    it('should add translation for Half Time', () => {
      const result = translateSportData(
        halfTime as unknown as HeadToHeadV2Data,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.periodLabel).toStrictEqual({
        accessible: halfTime.periodLabel.accessible,
        translation: 'Mi-temps',
        value: halfTime.periodLabel.value,
      });
    });

    it('should add translation for After Extra Time', () => {
      const result = translateSportData(
        aet as unknown as HeadToHeadV2Data,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.periodLabel).toStrictEqual({
        accessible: aet.periodLabel.accessible,
        translation: 'Après prolongation',
        value: aet.periodLabel.value,
      });
    });

    it('should add translation for Full Time', () => {
      const result = translateSportData(
        postEvent as unknown as HeadToHeadV2Data,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.periodLabel).toStrictEqual({
        accessible: postEvent.periodLabel.accessible,
        translation: 'Fin du match',
        value: postEvent.periodLabel.value,
      });
    });

    it('should return the period label unchanged when no translation is available', () => {
      const result = translateSportData(
        firstHalf90 as unknown as HeadToHeadV2Data,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.periodLabel).toStrictEqual({
        value: "9'",
        accessible: '9 minutes',
      });
    });

    it('should return the period label unchanged when translations are not found', () => {
      const result = translateSportData(
        halfTime as unknown as HeadToHeadV2Data,
        translationsWithMissingTranslations,
        'afrique',
      );
      expect(result.periodLabel).toStrictEqual({
        accessible: halfTime.periodLabel.accessible,
        value: halfTime.periodLabel.value,
      });
    });

    describe('Numerals', () => {
      it('should return the period label minutes to non western service numerals for applicable service', () => {
        const result = translateSportData(
          firstHalf90 as unknown as HeadToHeadV2Data,
          persianServiceConfig.default.translations,
          'persian',
        );
        expect(result.periodLabel).toStrictEqual({
          value: "۹'",
          accessible: '9 minutes',
        });
      });

      it('should update the period label with extra time to non western service numerals for applicable service', () => {
        const result = translateSportData(
          firstHalfAddedTime as unknown as HeadToHeadV2Data,
          persianServiceConfig.default.translations,
          'persian',
        );
        expect(result.periodLabel).toStrictEqual({
          value: "۴۵'+۲",
          accessible: '45 minutes plus 2',
        });
      });

      it('should update the period label with extra time to a western service numerals for applicable service', () => {
        const result = translateSportData(
          firstHalfAddedTime as unknown as HeadToHeadV2Data,
          afriqueServiceConfig.default.translations,
          'afrique',
        );
        expect(result.periodLabel).toStrictEqual({
          value: "45'+2",
          accessible: '45 minutes plus 2',
        });
      });

      it('should update the period label in extra time to non western service numerals for applicable service', () => {
        const result = translateSportData(
          etFirstHalf as unknown as HeadToHeadV2Data,
          persianServiceConfig.default.translations,
          'persian',
        );
        expect(result.periodLabel).toStrictEqual({
          accessible: '98 minutes extra time',
          value: "۹۸' ET", // to do - add these translations for now
        });
      });
    });
  });

  describe('Grouped actions', () => {
    it('should add translation for group action name assists', () => {
      const result = translateSportData(
        fixtureDataDefault,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.groupedActions?.[0].groupName).toStrictEqual({
        fullName: 'Passes décisives',
        shortName: 'Passes décisives',
      });
    });

    it('should return the group name unchanged when no translation is available', () => {
      const result = translateSportData(
        fixtureDataDefault,
        translationsWithMissingTranslations,
        'afrique',
      );
      expect(result.groupedActions?.[0].groupName).toStrictEqual({
        fullName: 'Assists',
        shortName: 'Assists',
      });
    });

    it('should handle multiple grouped actions', () => {
      const dataWithMultipleGroupedActions = {
        ...fixtureDataDefault,
        groupedActions: [
          {
            groupName: { fullName: 'Assists', shortName: 'Assists' },
            homeTeamActions: [],
          },
          {
            groupName: { fullName: 'Penalties', shortName: 'Penalties' },
            homeTeamActions: [],
          },
          {
            groupName: {
              fullName: 'something else',
              shortName: 'something else',
            },
            homeTeamActions: [],
          },
        ],
      } as unknown as HeadToHeadV2Data;

      const result = translateSportData(
        dataWithMultipleGroupedActions,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.groupedActions?.[0].groupName).toStrictEqual({
        fullName: 'Passes décisives',
        shortName: 'Passes décisives',
      });
      expect(result.groupedActions?.[1].groupName).toStrictEqual({
        fullName: 'Tirs au but',
        shortName: 'Tirs au but',
      });
      expect(result.groupedActions?.[2].groupName).toStrictEqual({
        fullName: 'something else',
        shortName: 'something else',
      });
    });
  });
});
