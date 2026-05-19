import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import cancelledMockData from '../static-data/event/transformed/cancelled.json';
import postponedMockData from '../static-data/event/transformed/postponed.json';
import suspendedMockData from '../static-data/event/transformed/suspended.json';
import {
  preEventData as preEventMockData,
  preEventNoTeamsOrVenueProvided as preEventNoTeamsMockData,
} from '../static-data/event/transformed/pre-event/index';
import {
  postEventAETData,
  postEventAgg90Data,
  postEventPensAetAggData,
  postEventPens90Data,
  postEventPensAetData,
  finishedAetAggData,
} from '../static-data/event/transformed/post-event/index';
import {
  firstHalf90Data as firstHalfData,
  firstHalfAddedTimeData,
  etFirstHalfData,
  inPensAetData,
  beforePensAetData,
  inPens90Data,
  secondHalf90Data,
} from '../static-data/event/transformed/mid-event/index';
import HeadToHead from '../head-to-head-v2';
import type { HeadToHeadV2Data } from '../types';

interface RenderOptions {
  data: HeadToHeadV2Data;
  isConciseView?: boolean;
  shouldShowActions?: boolean;
}

const renderHeadToHead = ({
  data,
  isConciseView = false,
  shouldShowActions = false,
}: RenderOptions) =>
  render(
    <HeadToHead
      data={data}
      isConciseView={isConciseView}
      shouldShowActions={shouldShowActions}
    />,
  );

const asH2HData = (data: unknown) => data as HeadToHeadV2Data;

describe('Skipped Tests for MVP', () => {
  // skipped - we do not support concise view in MVP
  describe.each([
    true,
    false,
  ])('head to head concise view %s', isConciseView => {
    test.skip('renders the component of PreEvent status with data', () => {
      const { queryByText, getAllByText, queryAllByText } = renderHeadToHead({
        data: asH2HData(preEventMockData),
        isConciseView,
      });
      const homeTeam = queryAllByText('Fulham');
      const awayTeam = queryAllByText('Liverpool');
      const time = getAllByText('12:30');
      const conciseSummary = queryByText(
        'Fulham versus Liverpool kick off 12:30',
      );

      expect(homeTeam).toHaveLength(3);
      expect(awayTeam).toHaveLength(3);
      expect(time[0]).toBeInTheDocument();
      expect(conciseSummary).toBeInTheDocument();
    });

    test.skip('does render the aggregate score if it is the Leg 2 of a game in Concise View', () => {
      const { queryByText } = renderHeadToHead({
        data: asH2HData({
          ...postEventAgg90Data,
          multiLeg: {
            leg: 2,
            relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
            aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
          },
        }),
        isConciseView,
      });
      const aggScore = queryByText('(Agg 1-2)');
      const a11yAggScore = queryByText(
        'Aggregate score Southampton 1 , Liverpool 2',
      );

      expect(aggScore).toBeInTheDocument();
      expect(a11yAggScore).toBeInTheDocument();
    });

    test.skip('does not render the aggregate score if it is the Leg 1 of a game in Concise View', () => {
      const { queryByText } = renderHeadToHead({
        data: asH2HData({
          ...postEventAgg90Data,
          multiLeg: {
            leg: 1,
            relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
            aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
          },
        }),
        isConciseView,
      });
      const aggScore = queryByText('(Agg 1-2)');
      const a11yAggScore = queryByText(
        'Aggregate score Southampton 1 , Liverpool 2',
      );

      expect(aggScore).not.toBeInTheDocument();
      expect(a11yAggScore).not.toBeInTheDocument();
    });

    test.skip('renders the head to head of MidEvent status', () => {
      const { queryByText, getAllByText } = renderHeadToHead({
        data: asH2HData(firstHalfData),
        isConciseView,
      });
      const homeTeamName = getAllByText('Liepāja');
      const awayTeamName = getAllByText('Gjilani');
      const homeScore = getAllByText('0');
      const homeUnconfirmedScore = getAllByText('1');
      const awayScore = getAllByText('0');
      const time = queryByText("9'");

      expect(homeTeamName).toHaveLength(3);
      expect(awayTeamName).toHaveLength(3);
      expect(homeScore[0]).toBeInTheDocument();
      expect(homeUnconfirmedScore[0]).toBeInTheDocument();
      expect(awayScore[0]).toBeInTheDocument();
      expect(time).toBeInTheDocument();
    });

    test.skip('renders the head to head of MidEvent with added time', () => {
      const { queryByText } = renderHeadToHead({
        data: asH2HData(firstHalfAddedTimeData),
        isConciseView,
      });
      const period = queryByText('45 minutes plus 2 , in progress');
      const matchProgress = queryByText("45'+2");

      expect(period).toBeInTheDocument();
      expect(matchProgress).toBeInTheDocument();
    });

    test.skip('renders the head to head of PostEvent with added time', () => {
      const { queryByText, getByText } = renderHeadToHead({
        data: asH2HData(postEventAETData),
        isConciseView,
      });
      const period = queryByText('AET');
      const homeScore = getByText('1');
      const awayScore = getByText('2');
      const a11yAETPeriod = queryByText('After extra time');
      const a11ySummary = queryByText(
        /Southampton 1 , Liverpool 2 After extra time/,
      );

      expect(homeScore).toBeInTheDocument();
      expect(awayScore).toBeInTheDocument();
      expect(period).toBeInTheDocument();
      expect(a11ySummary).toBeInTheDocument();
      expect(a11yAETPeriod).toBeInTheDocument();
    });

    test.skip('renders the head to head with FT scores and AET of PostEvent including penalties', () => {
      const { queryByText, container } = renderHeadToHead({
        data: asH2HData(postEventPensAetData),
        isConciseView,
      });
      const period = queryByText('AET');
      const a11yAetPeriod = queryByText('After extra time');
      const a11yPenScore = queryByText('Southampton win 5 - 3 on penalties');
      const a11ySummary = queryByText(
        /Southampton 1 , Liverpool 1 After extra time , Southampton win 5 - 3 on penalties/,
      );

      expect(container).toHaveTextContent('Southampton win 5-3 on pens');
      expect(period).toBeInTheDocument();
      expect(a11ySummary).toBeInTheDocument();
      expect(a11yAetPeriod).toBeInTheDocument();
      expect(a11yPenScore).toBeInTheDocument();
    });

    test.skip('renders a concise event summary', () => {
      const { getByText } = renderHeadToHead({
        data: asH2HData(preEventMockData),
        isConciseView,
      });
      const conciseEventSummary = getByText(
        'Fulham versus Liverpool kick off 12:30',
      );

      expect(conciseEventSummary).toBeInTheDocument();
    });
  });

  // skipped - we do not support OJ path in MVP
  test.skip('does not wrap the card with a link when not given an onward journey path', () => {
    const { queryByRole } = renderHeadToHead({
      data: asH2HData(firstHalfData),
      isConciseView: true,
    });
    const onwardJourneyLink = queryByRole('link');

    expect(onwardJourneyLink).not.toBeInTheDocument();
  });

  // skipped - we do not support OJ path in MVP
  test.skip('wraps the card with a link when given an onward journey path', () => {
    const { getByRole, queryAllByText } = renderHeadToHead({
      data: asH2HData(preEventMockData),
      isConciseView: true,
    });
    const onwardJourneyLink = getByRole('link');
    const homeTeamName = queryAllByText('Fulham');
    const awayTeamName = queryAllByText('Liverpool');

    expect(onwardJourneyLink.getAttribute('href')).toBe(
      '/sport/football/live/cvp5j5ndx5nt',
    );
    expect(homeTeamName).toHaveLength(3);
    expect(awayTeamName).toHaveLength(3);
  });
});

describe('Head to Head Component', () => {
  test('renders head to head component of PreEvent status with No teams', () => {
    renderHeadToHead({ data: asH2HData(preEventNoTeamsMockData) });

    const date = screen.queryByText('Sat 6 Aug 2022');
    const tournament = screen.queryByText('Premier League');
    const venue = screen.getByText('To be confirmed');
    const teamName = screen.getByText(
      'Team to be confirmed versus Team to be confirmed kick off 12:30',
    );

    expect(venue).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(tournament).toBeInTheDocument();
    expect(teamName).toBeInTheDocument();
  });

  test('renders head to head component of PreEvent status', () => {
    renderHeadToHead({ data: asH2HData(preEventMockData) });

    const date = screen.queryByText('Sat 6 Aug 2022');
    const tournamentLabel = screen.queryByText('Premier League');

    expect(date).toBeInTheDocument();
    expect(tournamentLabel).toBeInTheDocument();
  });

  test('renders the head to head of MidEvent status', () => {
    const tournamentDescriptionLabel = 'UEFA Europa Conference League';

    renderHeadToHead({
      data: asH2HData({ ...firstHalfData, tournamentDescriptionLabel }),
    });

    const tournamentText = screen.queryByText(tournamentDescriptionLabel);
    const time = screen.queryByText(firstHalfData.date);
    const venue = screen.queryByText('Stadions Daugava');

    expect(tournamentText).toBeInTheDocument();
    expect(time).not.toBeInTheDocument();
    expect(venue).toBeInTheDocument();
  });

  test('renders head to head with half time, full time scores for a MidEvent in Extra Time', () => {
    renderHeadToHead({ data: asH2HData(etFirstHalfData) });

    const halfTimeScore = screen.getByText('HT 1-1');
    const fullTime = screen.getByText('FT 2-2');
    const extraTime = screen.getByText("98' ET");
    const minsInProgress = screen.getByText(
      '98 minutes extra time , in progress',
    );
    const a11yFTScore = screen.getByText('Full Time Liepāja 2 , Gjilani 2');
    const a11yHTScore = screen.getByText('Half Time Liepāja 1 , Gjilani 1');
    const a11ySummary = screen.getByText(
      /Liepāja 2 , Gjilani 2 Extra time in progress/,
    );

    expect(halfTimeScore).toBeInTheDocument();
    expect(fullTime).toBeInTheDocument();
    expect(extraTime).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(minsInProgress).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head with half time, full time and penalties scores for a MidEvent in Pens aet', () => {
    renderHeadToHead({ data: asH2HData(inPensAetData) });

    const halfTimeScore = screen.getByText('HT 1-1');
    const fullTime = screen.getByText('FT 2-2');
    const pens = screen.getByText('Penalties 1-1');
    const a11yFTScore = screen.getByText('Full Time Liepāja 2 , Gjilani 2');
    const a11yHTScore = screen.getByText('Half Time Liepāja 1 , Gjilani 1');
    const a11ySummary = screen.getByText(
      /Liepāja 2 , Gjilani 2 after extra time penalties in progress/,
    );

    expect(halfTimeScore).toBeInTheDocument();
    expect(fullTime).toBeInTheDocument();
    expect(pens).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head with half time, full time and penalties scores for a MidEvent aet before pens', () => {
    renderHeadToHead({ data: asH2HData(beforePensAetData) });

    const halfTimeScore = screen.getByText('HT 1-1');
    const fullTime = screen.getByText('FT 2-2');
    const pens = screen.getByText('Penalties');
    const excludedPensScore = screen.queryByText('Penalties 1-0');
    const a11yPenPeriod = screen.getByText('Penalties');
    const a11yFTScore = screen.getByText('Full Time Liepāja 2 , Gjilani 2');
    const a11yHTScore = screen.getByText('Half Time Liepāja 1 , Gjilani 1');
    const a11ySummary = screen.getByText(
      /Liepāja 2 , Gjilani 2 after extra time going to penalties/,
    );

    expect(halfTimeScore).toBeInTheDocument();
    expect(fullTime).toBeInTheDocument();
    expect(pens).toBeInTheDocument();
    expect(excludedPensScore).not.toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yPenPeriod).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head with half time, full time and penalties scores for a MidEvent after 90 mins in pens', () => {
    renderHeadToHead({ data: asH2HData(inPens90Data) });

    const halfTimeScore = screen.getByText('HT 2-3');
    const pens = screen.getByText('Penalties 2-3');
    const a11yPenPeriod = screen.getByText('Penalties Liepāja 2 , Gjilani 3');
    const a11yHTScore = screen.getByText('Half Time Liepāja 2 , Gjilani 3');
    const a11ySummary = screen.getByText(
      /Liepāja 3 , Gjilani 3 after full time penalties in progress/,
    );

    expect(halfTimeScore).toBeInTheDocument();
    expect(pens).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yPenPeriod).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head and shows actions data when showScorers prop is true', () => {
    renderHeadToHead({
      data: asH2HData(inPensAetData),
      isConciseView: true,
      shouldShowActions: true,
    });

    const player = screen.getByText('A. Karašausks');
    const firstGoalByMinutes = screen.getByText(/13'/);
    const secondGoalByMinutes = screen.getByText(/85'/);

    expect(player).toBeInTheDocument();
    expect(firstGoalByMinutes).toBeInTheDocument();
    expect(secondGoalByMinutes).toBeInTheDocument();
  });

  test('renders head to head but does not show actions data when showScorers prop is false', () => {
    renderHeadToHead({
      data: asH2HData(inPensAetData),
      isConciseView: true,
      shouldShowActions: false,
    });

    const player = screen.queryByText('A. Karašausks');
    const goalsByMinutes = screen.queryByText(`13', 85'`);

    expect(player).not.toBeInTheDocument();
    expect(goalsByMinutes).not.toBeInTheDocument();
  });

  test('renders head to head with aet and penalties scores for a MidEvent after aet', () => {
    renderHeadToHead({ data: asH2HData(inPens90Data) });

    const halfTimeScore = screen.queryByText('HT 2-3');
    const pens = screen.queryByText('Penalties 2-3');
    const a11yPenPeriod = screen.queryByText('Penalties Liepāja 2 , Gjilani 3');
    const a11yHTScore = screen.queryByText('Half Time Liepāja 2 , Gjilani 3');
    const a11ySummary = screen.queryByText(
      /Liepāja 3 , Gjilani 3 after full time penalties in progress/,
    );

    expect(pens).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yPenPeriod).toBeInTheDocument();
    expect(halfTimeScore).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head after aet and displays penalties before pens start in MidEvent', () => {
    renderHeadToHead({ data: asH2HData(beforePensAetData) });

    const halfTimeScore = screen.queryByText('HT 1-1');
    const fullTime = screen.queryByText('FT 2-2');
    const pens = screen.queryByText('Penalties');
    const excludedPensScore = screen.queryByText('Penalties 1-0');
    const a11yPenPeriod = screen.queryByText('Penalties');
    const a11yFTScore = screen.queryByText('Full Time Liepāja 2 , Gjilani 2');
    const a11yHTScore = screen.queryByText('Half Time Liepāja 1 , Gjilani 1');
    const a11ySummary = screen.queryByText(
      /Liepāja 2 , Gjilani 2 after extra time going to penalties/,
    );

    expect(pens).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yPenPeriod).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
    expect(halfTimeScore).toBeInTheDocument();
    expect(fullTime).toBeInTheDocument();
    expect(excludedPensScore).not.toBeInTheDocument();
  });

  test('renders head to head if an event is cancelled with match status letter data', () => {
    renderHeadToHead({ data: asH2HData(cancelledMockData) });

    const homeTeam = screen.getAllByText('Fulham');
    const awayTeam = screen.getAllByText('Liverpool');
    const matchProgress = screen.getAllByText('Match Cancelled');
    const homeReplacementScore = screen.getAllByText('C');
    const awayReplacementScore = screen.getAllByText('C');

    expect(homeTeam).toHaveLength(3);
    expect(awayTeam).toHaveLength(3);
    expect(matchProgress[1]).toBeInTheDocument();
    expect(homeReplacementScore[0]).toBeInTheDocument();
    expect(awayReplacementScore[1]).toBeInTheDocument();
  });

  test('renders head to head if an event is postponed with match status letter data', () => {
    renderHeadToHead({ data: asH2HData(postponedMockData) });

    const homeTeam = screen.getAllByText('Fulham');
    const awayTeam = screen.getAllByText('Liverpool');
    const matchProgress = screen.getAllByText('Match Postponed');
    const homeReplacementScore = screen.getAllByText('P');
    const awayReplacementScore = screen.getAllByText('P');

    expect(homeTeam).toHaveLength(3);
    expect(awayTeam).toHaveLength(3);
    expect(matchProgress[1]).toBeInTheDocument();
    expect(homeReplacementScore[0]).toBeInTheDocument();
    expect(awayReplacementScore[1]).toBeInTheDocument();
  });

  test('renders head to head if an event is suspended with score data', () => {
    renderHeadToHead({ data: asH2HData(suspendedMockData) });

    const homeTeam = screen.getAllByText('Liepāja');
    const awayTeam = screen.getAllByText('Gjilani');
    const matchProgress = screen.getByText('Suspended');
    const runningScore = screen.getAllByText('0');

    expect(homeTeam).toHaveLength(3);
    expect(awayTeam).toHaveLength(3);
    expect(matchProgress).toBeInTheDocument();
    expect(runningScore[0]).toBeInTheDocument();
    expect(runningScore[1]).toBeInTheDocument();
  });

  test('renders the head to head of PostEvent with added time and accessibility text', () => {
    renderHeadToHead({ data: asH2HData(postEventAETData) });

    const a11yHTScore = screen.queryByText(
      'Half Time Southampton 0 , Liverpool 0',
    );
    const a11yFTScore = screen.queryByText(
      'Full Time Southampton 1 , Liverpool 1',
    );
    const a11ySummary = screen.queryByText(
      /Southampton 1 , Liverpool 2 After extra time/,
    );

    expect(a11ySummary).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
  });

  test('renders head to head with half time and full time scores of PostEvent after extra time', () => {
    renderHeadToHead({ data: asH2HData(postEventAETData) });

    const halfTimeScore = screen.getByText('HT 0-0');
    const fullTimeScore = screen.getByText('FT 1-1');
    const period = screen.getByText('AET');
    const a11yAETPeriod = screen.getByText('After extra time');
    const a11yFTScore = screen.getByText(
      'Full Time Southampton 1 , Liverpool 1',
    );
    const a11yHTScore = screen.getByText(
      'Half Time Southampton 0 , Liverpool 0',
    );
    const a11ySummary = screen.getByText(
      /Southampton 1 , Liverpool 2 After extra time/,
    );

    expect(halfTimeScore).toBeInTheDocument();
    expect(fullTimeScore).toBeInTheDocument();
    expect(period).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yAETPeriod).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head with the full time scores of PostEvent aet', () => {
    renderHeadToHead({ data: asH2HData(postEventAETData) });

    const period = screen.queryByText('AET');
    const homeScore = screen.getByText('1');
    const awayScore = screen.getByText('2');
    const a11yAETPeriod = screen.queryByText('After extra time');
    const a11yHTScore = screen.queryByText(
      'Half Time Southampton 0 , Liverpool 0',
    );
    const a11yFTScore = screen.queryByText(
      'Full Time Southampton 1 , Liverpool 1',
    );
    const a11ySummary = screen.queryByText(
      /Southampton 1 , Liverpool 2 After extra time/,
    );

    expect(homeScore).toBeInTheDocument();
    expect(awayScore).toBeInTheDocument();
    expect(period).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yAETPeriod).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
  });

  test('does not render the aggregate score if it is the Leg 1 of a game', () => {
    renderHeadToHead({
      data: asH2HData({
        ...postEventAgg90Data,
        multiLeg: {
          leg: 1,
          relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
          aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
        },
      }),
    });

    const aggScore = screen.queryByText('(Agg 1-2)');
    const a11yAggScore = screen.queryByText(
      'Aggregate score Southampton 1 , Liverpool 2',
    );

    expect(aggScore).not.toBeInTheDocument();
    expect(a11yAggScore).not.toBeInTheDocument();
  });

  test('renders head to head with half time, full time and aggregate scores of PostEvent FT and a win on agg', () => {
    renderHeadToHead({
      data: asH2HData({
        ...postEventAgg90Data,
        multiLeg: {
          leg: 2,
          relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
          aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
        },
      }),
    });

    const halfTimeScore = screen.getByText('HT 1-1');
    const aggScore = screen.getByText('(Agg 1-2)');
    const period = screen.getByText('FT');
    const a11yAggScore = screen.getByText(
      'Aggregate score Southampton 1 , Liverpool 2',
    );
    const a11yFTPeriod = screen.getByText('Full time');
    const a11yHTScore = screen.getByText(
      'Half Time Southampton 1 , Liverpool 1',
    );
    const a11ySummary = screen.getByText(
      /Southampton 1 , Liverpool 2 at Full time , Liverpool win 2 - 1 on aggregate/,
    );

    expect(halfTimeScore).toBeInTheDocument();
    expect(aggScore).toBeInTheDocument();
    expect(period).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yAggScore).toBeInTheDocument();
    expect(a11yFTPeriod).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head with half time, full time, aggregate scores and AET period of PostEvent AET and a win on agg', () => {
    renderHeadToHead({
      data: asH2HData({
        ...finishedAetAggData,
        multiLeg: {
          leg: 2,
          relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
          aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
        },
      }),
    });

    const halfTimeScore = screen.getByText('HT 2-1');
    const fullTimeScore = screen.getByText('FT 2-2');
    const aggScore = screen.getByText('(Agg 5-3)');
    const period = screen.getByText('AET');
    const a11yAggScore = screen.getByText(
      'Aggregate score Southampton 5 , Liverpool 3',
    );
    const a11yAetPeriod = screen.getByText('After extra time');
    const a11yFTScore = screen.getByText(
      'Full Time Southampton 2 , Liverpool 2',
    );
    const a11yHTScore = screen.getByText(
      'Half Time Southampton 2 , Liverpool 1',
    );
    const a11ySummary = screen.getByText(
      /Southampton 4 , Liverpool 2 After extra time , Southampton win 5 - 3 on aggregate/,
    );

    expect(halfTimeScore).toBeInTheDocument();
    expect(fullTimeScore).toBeInTheDocument();
    expect(aggScore).toBeInTheDocument();
    expect(period).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yAggScore).toBeInTheDocument();
    expect(a11yAetPeriod).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head with half time score, full time status and penalties scores of PostEvent after 90 straight to penalties', () => {
    const { container } = renderHeadToHead({
      data: asH2HData(postEventPens90Data),
    });

    const halfTimeScore = screen.getByText('HT 1-1');
    const fullTimeScore = screen.queryByText('FT 1-1');
    const period = screen.getByText('FT');
    const a11yFTPeriod = screen.getByText('Full time');
    const a11yPenScore = screen.getByText('Liverpool win 5 - 3 on penalties');
    const a11yHTScore = screen.getByText(
      'Half Time Southampton 1 , Liverpool 1',
    );
    const a11ySummary = screen.getByText(
      /Southampton 1 , Liverpool 1 at Full time , Liverpool win 5 - 3 on penalties/,
    );

    expect(halfTimeScore).toBeInTheDocument();
    expect(fullTimeScore).not.toBeInTheDocument();
    expect(period).toBeInTheDocument();
    expect(container).toHaveTextContent(/Liverpool win 5-3 on pens/);
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yFTPeriod).toBeInTheDocument();
    expect(a11yPenScore).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head with FT scores and AET of PostEvent including penalties', () => {
    renderHeadToHead({ data: asH2HData(postEventPensAetData) });

    const halfTimeScore = screen.queryByText('HT 1-1');
    const fullTime = screen.queryByText('FT 1-1');
    const a11yFTScore = screen.queryByText(
      'Full Time Southampton 1 , Liverpool 1',
    );
    const a11yHTScore = screen.queryByText(
      'Half Time Southampton 1 , Liverpool 1',
    );

    expect(a11yHTScore).toBeInTheDocument();
    expect(halfTimeScore).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
    expect(fullTime).toBeInTheDocument();
  });

  test('renders head to head with half time, full time scores and AET of PostEvent AET and penalties', () => {
    const { container } = renderHeadToHead({
      data: asH2HData(postEventPensAetData),
    });

    const halfTimeScore = screen.getByText('HT 1-1');
    const fullTime = screen.getByText('FT 1-1');
    const aet = screen.getByText('AET');
    const a11yAetPeriod = screen.getByText('After extra time');
    const a11yPenScore = screen.getByText('Southampton win 5 - 3 on penalties');
    const a11yFTScore = screen.getByText(
      'Full Time Southampton 1 , Liverpool 1',
    );
    const a11yHTScore = screen.getByText(
      'Half Time Southampton 1 , Liverpool 1',
    );
    const a11ySummary = screen.getByText(
      /Southampton 1 , Liverpool 1 After extra time , Southampton win 5 - 3 on penalties/,
    );

    expect(halfTimeScore).toBeInTheDocument();
    expect(fullTime).toBeInTheDocument();
    expect(container).toHaveTextContent('Southampton win 5-3 on pens');
    expect(aet).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yAetPeriod).toBeInTheDocument();
    expect(a11yPenScore).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head with half time, full time scores and AET of PostEvent with agg AET and penalties', () => {
    const { container } = renderHeadToHead({
      data: asH2HData({
        ...postEventPensAetAggData,
        seriesWinner: postEventPensAetAggData.winner,
        multiLeg: {
          leg: 2,
          relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
          aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
        },
      }),
    });

    const halfTimeScore = screen.getByText('HT 1-1');
    const fullTime = screen.getByText('FT 1-1');
    const aet = screen.getByText('AET');
    const agg = screen.getByText('(Agg 2-2)');
    const a11yAetPeriod = screen.getByText('After extra time');
    const a11yAggScore = screen.getByText(
      'Aggregate score Southampton 2 , Liverpool 2',
    );
    const a11yPenScore = screen.getByText('Southampton win 5 - 3 on penalties');
    const a11yFTScore = screen.getByText(
      'Full Time Southampton 1 , Liverpool 1',
    );
    const a11yHTScore = screen.getByText(
      'Half Time Southampton 1 , Liverpool 1',
    );
    const a11ySummary = screen.getByText(
      /Southampton 1 , Liverpool 1 After extra time , Southampton 2 , Liverpool 2 on aggregate , Southampton win 5 - 3 on penalties/,
    );

    expect(halfTimeScore).toBeInTheDocument();
    expect(fullTime).toBeInTheDocument();
    expect(container).toHaveTextContent('Southampton win 5-3 on pens');
    expect(aet).toBeInTheDocument();
    expect(agg).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yAetPeriod).toBeInTheDocument();
    expect(a11yAggScore).toBeInTheDocument();
    expect(a11yPenScore).toBeInTheDocument();
    expect(a11yFTScore).toBeInTheDocument();
    expect(a11yHTScore).toBeInTheDocument();
  });

  test('renders head to head with penalty scores using seriesWinner if present', () => {
    renderHeadToHead({
      data: asH2HData({
        ...postEventPensAetAggData,
        winner: 'home',
        seriesWinner: 'away',
        multiLeg: {
          leg: 2,
          relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
          aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
        },
      }),
    });

    const penaltiesText = screen.getByTestId('penalties-text');

    expect(penaltiesText).toBeInTheDocument();
    expect(penaltiesText).toHaveTextContent(/Liverpool/);
  });

  test.each([
    { props: { winner: undefined }, text: 'winner is undefined' },
    {
      props: { winner: 'draw', seriesWinner: undefined },
      text: 'winner is draw and seriesWinner is undefined',
    },
    {
      props: {
        multiLeg: {
          leg: 2,
          relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
          aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
        },
        seriesWinner: undefined,
      },
      text: 'match is second leg in a multi-leg tie and seriesWinner is undefined',
    },
  ])('renders head to head without penalty scores for match with penalties when $text', ({
    props,
  }) => {
    renderHeadToHead({
      data: asH2HData({ ...postEventPensAetAggData, ...props }),
    });

    const fullTime = screen.getByText('FT 1-1');

    expect(fullTime).toBeInTheDocument();
    expect(screen.queryByTestId('penalties-text')).not.toBeInTheDocument();
  });

  test('renders the value of Attendance', () => {
    renderHeadToHead({
      data: asH2HData({ ...secondHalf90Data, attendance: { value: 73456 } }),
    });

    expect(screen.queryByText('73,456')).toBeInTheDocument();
  });

  test('renders the value of AttendanceInfo in the venue', () => {
    renderHeadToHead({
      data: asH2HData({
        ...secondHalf90Data,
        attendance: { additionalInfo: 'Limited Audience' },
      }),
    });

    expect(
      screen.queryByText('Stadions Daugava (Limited Audience)'),
    ).toBeInTheDocument();
  });

  test('renders the value of Attendance and Attendance Info', () => {
    renderHeadToHead({
      data: asH2HData({
        ...secondHalf90Data,
        attendance: { value: 73456, additionalInfo: 'Limited Audience' },
      }),
    });

    expect(screen.queryByText('73,456')).toBeInTheDocument();
    expect(
      screen.queryByText('Stadions Daugava (Limited Audience)'),
    ).toBeInTheDocument();
  });

  test('does not render the value of Attendance and Attendance Info when they are not present in the data', () => {
    renderHeadToHead({
      data: asH2HData({ ...secondHalf90Data, attendance: {} }),
    });

    expect(screen.queryByText('73,456')).not.toBeInTheDocument();
    expect(screen.queryByText('Stadions Daugava')).toBeInTheDocument();
  });

  // Not MVP - Rugby fixture data required
  // test('renders head to head with a goal summary', () => {
  // ...existing code...
  // });
});
