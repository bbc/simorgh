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
import secondLegEt from '#app/components-webcore/SportDataHeader/head-to-head-v2/static-data/event/transformed/mid-event/second-leg-et.json';
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

  describe('Player Actions', () => {
    it('should add a translation for minutes to non western service numerals for applicable service', () => {
      const result = translateSportData(
        fixtureDataDefault,
        persianServiceConfig.default.translations,
        'persian',
      );
      const expected = [
        {
          playerUrn:
            'urn:bbc:sportsdata:football:player:s-2bmeynv0dhsc8sjfuaprkexre',
          playerName: 'J. Rowe',
          actionType: 'goal',
          actions: [
            {
              type: 'Goal',
              typeLabel: { value: 'Goal', accessible: 'Goal' },
              timeLabel: {
                value: "90'",
                translated: "۹۰'",
                accessible: '90 minutes',
              },
            },
          ],
        },
      ];
      expect(result.home.actions).toStrictEqual(expected);
    });

    it('should handle multiple actions for a team', () => {
      const result = translateSportData(
        secondLegAetPens as unknown as HeadToHeadV2Data,
        persianServiceConfig.default.translations,
        'persian',
      );
      const expected = [
        {
          actionType: 'goal',
          playerId: '1dmfp2ow658dsv0re73r62ndh',
          playerName: 'B. Krasniqi',
          actions: [
            {
              type: 'Penalty',
              typeLabel: {
                value: 'Penalty',
                accessible: 'Penalty',
              },
              timeLabel: {
                value: "23'",
                translated: "۲۳'",
                accessible: '23 minutes',
              },
            },
          ],
        },
        {
          playerId: '6r4adhp9hu4ux7egwgd8j2thx',
          playerName: 'N. Redmond',
          actionType: 'goal',
          actions: [
            {
              type: 'Penalty',
              typeLabel: {
                value: 'Penalty',
                accessible: 'Penalty',
              },
              timeLabel: {
                value: "30'",
                translated: "۳۰'",
                accessible: '30 minutes',
              },
            },
          ],
        },
      ];
      expect(result.home.actions).toStrictEqual(expected);
    });
    it('should handle multiple actions for a player', () => {
      const result = translateSportData(
        secondLegAetPens as unknown as HeadToHeadV2Data,
        persianServiceConfig.default.translations,
        'persian',
      );
      const expected = [
        {
          actionType: 'goal',
          participantId: '3rutx3wc2j6q3qq8uqdn8pdja',
          playerId: '7uufcg0dvus42emi9yev9i9cl',
          playerName: 'N. Belaković',
          actions: [
            {
              type: 'Goal',
              typeLabel: {
                value: 'Goal',
                accessible: 'Goal',
              },
              timeLabel: {
                value: "23'",
                accessible: '23 minutes',
                translated: "۲۳'",
              },
            },
            {
              type: 'Penalty',
              typeLabel: {
                value: 'Penalty',
                accessible: 'Penalty',
              },
              timeLabel: {
                value: "27'",
                accessible: '27 minutes',
                translated: "۲۷'",
              },
            },
          ],
        },
      ];
      expect(result.away.actions).toStrictEqual(expected);
    });

    it('should not add a translation for minutes to western service numerals for applicable service', () => {
      const result = translateSportData(
        fixtureDataDefault,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      const expected = [
        {
          playerUrn:
            'urn:bbc:sportsdata:football:player:s-2bmeynv0dhsc8sjfuaprkexre',
          playerName: 'J. Rowe',
          actionType: 'goal',
          actions: [
            {
              type: 'Goal',
              typeLabel: { value: 'Goal', accessible: 'Goal' },
              timeLabel: {
                value: "90'",
                accessible: '90 minutes',
              },
            },
          ],
        },
      ];
      expect(result.home.actions).toStrictEqual(expected);
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

    it('should return the period label unchanged when no translation is found in periodLabelLookup', () => {
      const result = translateSportData(
        firstHalf90 as unknown as HeadToHeadV2Data,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.periodLabel?.value).toEqual("9'");
      expect(result.periodLabel).toStrictEqual({
        value: firstHalf90.periodLabel.value,
        accessible: firstHalf90.periodLabel.accessible,
      });
    });

    it('should return the period label unchanged when translations are not found', () => {
      const result = translateSportData(
        halfTime as unknown as HeadToHeadV2Data,
        translationsWithMissingTranslations,
        'afrique',
      );
      expect(result.periodLabel).toStrictEqual({
        value: halfTime.periodLabel.value,
        accessible: halfTime.periodLabel.accessible,
      });
    });

    describe('Numerals and extra time', () => {
      it('should add a translation for minutes to non western service numerals for applicable service', () => {
        const result = translateSportData(
          firstHalf90 as unknown as HeadToHeadV2Data,
          persianServiceConfig.default.translations,
          'persian',
        );
        expect(result.periodLabel?.value).toEqual("9'");
        expect(result.periodLabel).toStrictEqual({
          value: firstHalf90.periodLabel.value,
          translation: "۹'",
          accessible: firstHalf90.periodLabel.accessible,
        });
      });

      it('should add a translation for minutes with extra time to non western service numerals for applicable service', () => {
        const result = translateSportData(
          firstHalfAddedTime as unknown as HeadToHeadV2Data,
          persianServiceConfig.default.translations,
          'persian',
        );
        expect(result.periodLabel?.value).toEqual("45'+2");
        expect(result.periodLabel).toStrictEqual({
          value: firstHalfAddedTime.periodLabel.value,
          translation: "۴۵'+۲",
          accessible: firstHalfAddedTime.periodLabel.accessible,
        });
      });

      it('should not add a translation for minutes with extra time to a western service numerals for applicable service', () => {
        const result = translateSportData(
          firstHalfAddedTime as unknown as HeadToHeadV2Data,
          afriqueServiceConfig.default.translations,
          'afrique',
        );
        expect(result.periodLabel?.value).toEqual("45'+2");
        expect(result.periodLabel).toStrictEqual({
          value: firstHalfAddedTime.periodLabel.value,
          accessible: firstHalfAddedTime.periodLabel.accessible,
        });
      });

      it('should add translation for extra time text only to western service numerals for applicable service 1', () => {
        const result = translateSportData(
          etFirstHalf as unknown as HeadToHeadV2Data,
          afriqueServiceConfig.default.translations,
          'afrique',
        );
        expect(result.periodLabel?.value).toEqual(" 98' ET");
        expect(result.periodLabel).toStrictEqual({
          accessible: etFirstHalf.periodLabel.accessible,
          translation: "98' Prolongation",
          value: etFirstHalf.periodLabel.value,
        });
      });

      it('should add a translation for extra time text only to western service numerals for applicable service 2', () => {
        const result = translateSportData(
          etFirstHalf as unknown as HeadToHeadV2Data,
          persianServiceConfig.default.translations,
          'arabic',
        );
        expect(result.periodLabel?.value).toEqual(" 98' ET");
        expect(result.periodLabel).toStrictEqual({
          value: etFirstHalf.periodLabel.value,
          accessible: etFirstHalf.periodLabel.accessible,
          translation: "98' وقت اضافه",
        });
      });

      it('should handle numbers up to 3 digits in extra time', () => {
        const result = translateSportData(
          secondLegEt as unknown as HeadToHeadV2Data,
          persianServiceConfig.default.translations,
          'arabic',
        );
        expect(result.periodLabel?.value).toEqual("114' ET");
        expect(result.periodLabel).toStrictEqual({
          value: secondLegEt.periodLabel.value,
          accessible: secondLegEt.periodLabel.accessible,
          translation: "114' وقت اضافه",
        });
      });

      it('should add a translation for minutes in extra time to non western service numerals for applicable service', () => {
        const result = translateSportData(
          etFirstHalf as unknown as HeadToHeadV2Data,
          persianServiceConfig.default.translations,
          'persian',
        );
        expect(result.periodLabel).toStrictEqual({
          value: etFirstHalf.periodLabel.value,
          accessible: etFirstHalf.periodLabel.accessible,
          translation: "۹۸' وقت اضافه",
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

    it('should handle groupName for multiple grouped actions', () => {
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

    it('should handle translated numerals for multiple grouped actions', () => {
      const dataWithMultipleGroupedActions = {
        ...fixtureDataDefault,
        groupedActions: [
          {
            groupName: { fullName: 'Assists', shortName: 'Assists' },
            homeTeamActions: ["J. Lucumí (90')"],
            awayTeamActions: ["Y. Tielemans (44', 90'+4)", "E. Buendía (51')"],
          },
          {
            groupName: { fullName: 'Penalties', shortName: 'Penalties' },
            homeTeamActions: ["J. Lucumí (90')"],
            awayTeamActions: ["Y. Tielemans (44', 90'+4)", "E. Buendía (51')"],
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
        persianServiceConfig.default.translations,
        'persian',
      );
      expect(result.groupedActions).toStrictEqual([
        {
          groupName: {
            fullName: 'پاس گل',
            shortName: 'پاس گل',
          },
          homeTeamActions: ["J. Lucumí (۹۰')"],
          awayTeamActions: ["Y. Tielemans (۴۴', ۹۰'+۴)", "E. Buendía (۵۱')"],
        },
        {
          groupName: {
            fullName: 'پنالتی',
            shortName: 'پنالتی',
          },
          homeTeamActions: ["J. Lucumí (۹۰')"],
          awayTeamActions: ["Y. Tielemans (۴۴', ۹۰'+۴)", "E. Buendía (۵۱')"],
        },
        {
          groupName: {
            fullName: 'something else',
            shortName: 'something else',
          },
          homeTeamActions: [],
          awayTeamActions: undefined,
        },
      ]);
    });

    it('should translate minutes in grouped actions with non western service numerals for applicable service', () => {
      const result = translateSportData(
        fixtureDataDefault,
        persianServiceConfig.default.translations,
        'persian',
      );
      const expectedGroupActions = [
        {
          awayTeamActions: ["Y. Tielemans (۴۴', ۹۰'+۴)", "E. Buendía (۵۱')"],
          groupName: { fullName: 'پاس گل', shortName: 'پاس گل' },
          homeTeamActions: ["J. Lucumí (۹۰')"],
        },
      ];
      expect(result.groupedActions).toStrictEqual(expectedGroupActions);
    });

    it('should not translate minutes in grouped actions for services with western numerals', () => {
      const result = translateSportData(
        fixtureDataDefault,
        translationsWithMissingTranslations,
        'afrique',
      );
      expect(result.groupedActions).toStrictEqual(result.groupedActions);
    });

    it('should return teamAccessibleActions unchanged', () => {
      const fixtureDataWithAccessibleActions = {
        ...fixtureDataDefault,
        groupedActions: [
          {
            groupName: {
              fullName: 'Assists',
              shortName: 'Assists',
            },
            homeTeamActions: [],
            homeTeamAccessibleActions: [],
            awayTeamActions: ["L. Trossard (6')"],
            awayTeamAccessibleActions: ['L. Trossard (6 minutes)'],
          },
        ],
      };

      const result = translateSportData(
        fixtureDataWithAccessibleActions,
        persianServiceConfig.default.translations,
        'persian',
      );
      const expectedGroupActions = [
        {
          awayTeamAccessibleActions: ['L. Trossard (6 minutes)'],
          awayTeamActions: ["L. Trossard (۶')"],
          groupName: { fullName: 'پاس گل', shortName: 'پاس گل' },
          homeTeamAccessibleActions: [],
          homeTeamActions: [],
        },
      ];
      expect(result.groupedActions).toStrictEqual(expectedGroupActions);
    });
  });
  describe('Tournament and Stage Name', () => {
    const dataWithTournamentAndStageNames = {
      ...fixtureDataDefault,
      tournament: {
        id: '70excpe1synn9kadnbppahdn7',
        name: 'FIFA World Cup',
        disambiguatedName: 'FIFA World Cup',
        urn: 'urn:bbc:sportsdata:football:tournament:world-cup',
        thingsGuid: 'de6a07ff-47ff-4551-9b71-7494a71aceac',
      },
      stage: {
        id: '87i5eesbymvgzmz5d0y4a855g',
        name: 'Group Stage',
        urn: '',
      },
    } as unknown as HeadToHeadV2Data;
    it('should add translation for tournament Name', () => {
      const result = translateSportData(
        dataWithTournamentAndStageNames,
        afriqueServiceConfig.default.translations,
        'afrique',
      );
      expect(result.tournament).toStrictEqual({
        id: '70excpe1synn9kadnbppahdn7',
        name: 'Coupe du Monde FIFA',
        disambiguatedName: 'FIFA World Cup',
        urn: 'urn:bbc:sportsdata:football:tournament:world-cup',
        thingsGuid: 'de6a07ff-47ff-4551-9b71-7494a71aceac',
      });
    });

    it('should add translation for stage Name', () => {
      const result = translateSportData(
        dataWithTournamentAndStageNames,
        afriqueServiceConfig.default.translations,
        'afrique',
      );

      expect(result.stage).toStrictEqual({
        id: '87i5eesbymvgzmz5d0y4a855g',
        name: 'Phase de poules',
        urn: '',
      });
    });

    it('should return provided tournament and stage name if translation is missing', () => {
      const result = translateSportData(
        dataWithTournamentAndStageNames,
        translationsWithMissingTranslations,
        'afrique',
      );

      expect(result.tournament).toStrictEqual({
        id: '70excpe1synn9kadnbppahdn7',
        name: 'FIFA World Cup',
        disambiguatedName: 'FIFA World Cup',
        urn: 'urn:bbc:sportsdata:football:tournament:world-cup',
        thingsGuid: 'de6a07ff-47ff-4551-9b71-7494a71aceac',
      });

      expect(result.stage).toStrictEqual({
        id: '87i5eesbymvgzmz5d0y4a855g',
        name: 'Group Stage',
        urn: '',
      });
    });
    it('should return the tournament and stage name unchanged when lookup is not found', () => {
      const dataWithUnknownStageName = {
        ...fixtureDataDefault,
        stage: {
          ...fixtureDataDefault.stage,
          name: 'Unknown Stage Name',
        },
      } as unknown as HeadToHeadV2Data;
      const result = translateSportData(
        dataWithUnknownStageName,
        afriqueServiceConfig.default.translations,
        'afrique',
      );

      expect(result.tournament).toStrictEqual({
        disambiguatedName: 'UEFA Europa League',
        id: '4c1nfi2j1m731hcay25fcgndq',
        name: 'UEFA Europa League',
        thingsGuid: '2afbdda7-71d4-544d-bcc6-d9ff50314b2a',
        urn: 'urn:bbc:sportsdata:football:tournament:europa-league',
      });

      expect(result.stage).toStrictEqual({
        id: '7wxuj38kqm8bz3cmi15vu4w7o',
        name: 'Unknown Stage Name',
        urn: '',
      });
    });
  });
});
