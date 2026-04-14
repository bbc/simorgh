import React from 'react';
import { render, screen } from 'test-utils';
import cancelledMockData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/cancelled.json';
import postponedMockData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/postponed.json';
import suspendedMockData from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/suspended.json';
import {
  preEventData as preEventMockData,
  preEventNoTeamsOrVenueProvided as preEventNoTeamsMockData
} from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/pre-event/index.js';
import {
  postEventAETData,
  postEventAgg90Data,
  postEventPensAetAggData,
  postEventPens90Data,
  postEventPensAetData,
  finishedAetAggData
} from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/post-event/index.js';
import {
  firstHalf90Data as firstHalfData,
  firstHalfAddedTimeData,
  etFirstHalfData,
  inPensAetData,
  beforePensAetData,
  inPens90Data,
  secondHalf90Data
} from '@bbc/web-sport-utils/tests/static-data/football/event/transformed/mid-event/index.js';
import { rugbyTransformedMidEvent } from '@bbc/web-sport-utils/tests/static-data/rugby/event/transformed/index.js';
import HeadToHead from '../head-to-head-v2.jsx';

const renderComponent = (data, isConciseView, shouldShowActions, props) => {
  return render(
    <HeadToHead
      data={data}
      isConciseView={isConciseView}
      shouldShowActions={shouldShowActions}
      renderEventSummaryHeading
      {...props}
    />
  );
};

describe.each([true, false])('head to head concise view %s', isConciseView => {
  test('renders the component of PreEvent status with data', () => {
    const { queryByText, getAllByText, queryAllByText } = renderComponent(preEventMockData, isConciseView);
    const homeTeam = queryAllByText('Fulham');
    const awayTeam = queryAllByText('Liverpool');
    const time = getAllByText('12:30');
    const conciseSummary = queryByText('Fulham versus Liverpool kick off 12:30');

    expect(homeTeam).toHaveLength(3);
    expect(awayTeam).toHaveLength(3);
    expect(time[0]).toBeInTheDocument();
    expect(conciseSummary).toBeInTheDocument();
  });

  test('does render the aggregate score if it is the Leg 2 of a game in Concise View', () => {
    const data = {
      ...postEventAgg90Data,
      multiLeg: {
        leg: 2,
        relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
        aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr'
      }
    };
    const { queryByText } = renderComponent(data, isConciseView);
    const aggScore = queryByText('(Agg 1-2)');
    const a11yAggScore = queryByText('Aggregate score Southampton 1 , Liverpool 2');

    expect(aggScore).toBeInTheDocument();
    expect(a11yAggScore).toBeInTheDocument();
  });

  test('does not render the aggregate score if it is the Leg 1 of a game in Concise View', () => {
    const data = {
      ...postEventAgg90Data,
      multiLeg: {
        leg: 1,
        relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
        aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr'
      }
    };
    const { queryByText } = renderComponent(data, isConciseView);
    const aggScore = queryByText('(Agg 1-2)');
    const a11yAggScore = queryByText('Aggregate score Southampton 1 , Liverpool 2');

    expect(aggScore).not.toBeInTheDocument();
    expect(a11yAggScore).not.toBeInTheDocument();
  });

  test('renders the head to head of MidEvent status', () => {
    const { queryByText, getAllByText } = renderComponent(firstHalfData, isConciseView);
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

  test('renders the head to head of MidEvent with added time', () => {
    const { queryByText } = renderComponent(firstHalfAddedTimeData, isConciseView);
    const period = queryByText('45 minutes plus 2 , in progress');
    const matchProgress = queryByText("45'+2");

    expect(period).toBeInTheDocument();
    expect(matchProgress).toBeInTheDocument();
  });

  test('renders the head to head of PostEvent with added time', () => {
    const { queryByText, getByText } = renderComponent(postEventAETData, isConciseView);
    const period = queryByText('AET');
    const homeScore = getByText('1');
    const awayScore = getByText('2');
    const a11yAETPeriod = queryByText('After extra time');

    const a11ySummaryRegex = /Southampton 1 , Liverpool 2 After extra time/;
    const a11ySummary = queryByText(a11ySummaryRegex);

    expect(homeScore).toBeInTheDocument();
    expect(awayScore).toBeInTheDocument();
    expect(period).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yAETPeriod).toBeInTheDocument();
  });

  test('renders the head to head with FT scores and AET of PostEvent including penalties', () => {
    const { queryByText, container } = renderComponent(postEventPensAetData, isConciseView);
    const period = queryByText('AET');
    const a11yAetPeriod = queryByText('After extra time');
    const a11yPenScore = queryByText('Southampton win 5 - 3 on penalties');
    const a11ySummaryRegex = /Southampton 1 , Liverpool 1 After extra time , Southampton win 5 - 3 on penalties/;
    const a11ySummary = queryByText(a11ySummaryRegex);

    expect(container).toHaveTextContent('Southampton win 5-3 on pens');
    expect(period).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yAetPeriod).toBeInTheDocument();
    expect(a11yPenScore).toBeInTheDocument();
  });

  test('renders a concise event summary', () => {
    const { getByText } = renderComponent(preEventMockData, isConciseView, { renderEventSummaryHeading: true });
    const conciseEventSummary = getByText('Fulham versus Liverpool kick off 12:30');

    expect(conciseEventSummary).toBeInTheDocument();
  });
});

test('does not wrap the card with a link when not given an onward journey path', () => {
  const { queryByRole } = renderComponent(firstHalfData, true);
  const onwardJourneyLink = queryByRole('link');

  expect(onwardJourneyLink).not.toBeInTheDocument();
});

test('wraps the card with a link when given an onward journey path', async () => {
  const { getByRole, queryAllByText } = renderComponent(preEventMockData, true);
  const onwardJourneyLink = getByRole('link');
  const homeTeamName = queryAllByText('Fulham');
  const awayTeamName = queryAllByText('Liverpool');

  expect(onwardJourneyLink.getAttribute('href')).toBe('/sport/football/live/cvp5j5ndx5nt');
  expect(homeTeamName).toHaveLength(3);
  expect(awayTeamName).toHaveLength(3);
});

test('renders head to head component of PreEvent status with No teams', () => {
  const { queryByText, getByText } = renderComponent(preEventNoTeamsMockData);
  const date = queryByText('Sat 6 Aug 2022');
  const tournament = queryByText('Premier League');

  const venue = getByText('To be confirmed');
  const teamName = getByText('Team to be confirmed versus Team to be confirmed kick off 12:30');

  expect(venue).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(tournament).toBeInTheDocument();

  expect(teamName).toBeInTheDocument();
});

test('renders head to head component of PreEvent status', () => {
  const { queryByText } = renderComponent(preEventMockData);
  const date = queryByText('Sat 6 Aug 2022');
  const tournamentLabel = queryByText('Premier League');

  expect(date).toBeInTheDocument();
  expect(tournamentLabel).toBeInTheDocument();
});

test('renders the head to head of MidEvent status', () => {
  const tournamentDescriptionLabel = 'UEFA Europa Conference League';

  const { queryByText } = renderComponent({ ...firstHalfData, tournamentDescriptionLabel });
  const tournamentText = queryByText(tournamentDescriptionLabel);
  const time = queryByText(firstHalfData.date);
  const venue = queryByText('Stadions Daugava');

  expect(tournamentText).toBeInTheDocument();
  expect(time).not.toBeInTheDocument();
  expect(venue).toBeInTheDocument();
});

test('renders head to head with half time, full time scores for a MidEvent in Extra Time', () => {
  const { getByText } = renderComponent(etFirstHalfData);
  const halfTimeScore = getByText('HT 1-1');
  const fullTime = getByText('FT 2-2');
  const extraTime = getByText("98' ET");
  const minsInProgress = getByText('98 minutes extra time , in progress');
  const a11yFTScore = getByText('Full Time Liepāja 2 , Gjilani 2');
  const a11yHTScore = getByText('Half Time Liepāja 1 , Gjilani 1');

  const a11ySummaryRegex = /Liepāja 2 , Gjilani 2 Extra time in progress/;
  const a11ySummary = getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTime).toBeInTheDocument();
  expect(extraTime).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(minsInProgress).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with half time, full time and penalties scores for a MidEvent in Pens aet', () => {
  const { getByText } = renderComponent(inPensAetData);
  const halfTimeScore = getByText('HT 1-1');
  const fullTime = getByText('FT 2-2');
  const pens = getByText('Penalties 1-1');
  const a11yFTScore = getByText('Full Time Liepāja 2 , Gjilani 2');
  const a11yHTScore = getByText('Half Time Liepāja 1 , Gjilani 1');

  const a11ySummaryRegex = /Liepāja 2 , Gjilani 2 after extra time penalties in progress/;
  const a11ySummary = getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTime).toBeInTheDocument();
  expect(pens).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with half time, full time and penalties scores for a MidEvent aet before pens', () => {
  const { getByText, queryByText } = renderComponent(beforePensAetData);
  const halfTimeScore = getByText('HT 1-1');
  const fullTime = getByText('FT 2-2');
  const pens = getByText('Penalties');
  const excludedPensScore = queryByText('Penalties 1-0');
  const a11yPenPeriod = getByText('Penalties');
  const a11yFTScore = getByText('Full Time Liepāja 2 , Gjilani 2');
  const a11yHTScore = getByText('Half Time Liepāja 1 , Gjilani 1');

  const a11ySummaryRegex = /Liepāja 2 , Gjilani 2 after extra time going to penalties/;
  const a11ySummary = getByText(a11ySummaryRegex);

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
  const { getByText } = renderComponent(inPens90Data);
  const halfTimeScore = getByText('HT 2-3');
  const pens = getByText('Penalties 2-3');
  const a11yPenPeriod = getByText('Penalties Liepāja 2 , Gjilani 3');
  const a11yHTScore = getByText('Half Time Liepāja 2 , Gjilani 3');

  const a11ySummaryRegex = /Liepāja 3 , Gjilani 3 after full time penalties in progress/;
  const a11ySummary = getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(pens).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yPenPeriod).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head and shows actions data when showScorers prop is true', () => {
  const { getByText } = renderComponent(inPensAetData, true, true);
  const player = getByText('A. Karašausks');
  const firstGoalByMinutes = getByText(/13'/);
  const secondGoalByMinutes = getByText(/85'/);

  expect(player).toBeInTheDocument();
  expect(firstGoalByMinutes).toBeInTheDocument();
  expect(secondGoalByMinutes).toBeInTheDocument();
});

test('renders head to head but does not show actions data when showScorers prop is false', () => {
  const { queryByText } = renderComponent(inPensAetData, true, false);
  const player = queryByText('A. Karašausks');
  const goalsByMinutes = queryByText(`13', 85'`);

  expect(player).not.toBeInTheDocument();
  expect(goalsByMinutes).not.toBeInTheDocument();
});

test('renders head to head with aet and penalties scores for a MidEvent after aet', () => {
  const { queryByText } = renderComponent(inPens90Data);
  const halfTimeScore = queryByText('HT 2-3');
  const pens = queryByText('Penalties 2-3');
  const a11yPenPeriod = queryByText('Penalties Liepāja 2 , Gjilani 3');
  const a11yHTScore = queryByText('Half Time Liepāja 2 , Gjilani 3');

  const a11ySummaryRegex = /Liepāja 3 , Gjilani 3 after full time penalties in progress/;
  const a11ySummary = queryByText(a11ySummaryRegex);

  expect(pens).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yPenPeriod).toBeInTheDocument();
  expect(halfTimeScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head after aet and displays penalties before pens start in MidEvent', () => {
  const { queryByText } = renderComponent(beforePensAetData);
  const halfTimeScore = queryByText('HT 1-1');
  const fullTime = queryByText('FT 2-2');
  const pens = queryByText('Penalties');
  const excludedPensScore = queryByText('Penalties 1-0');
  const a11yPenPeriod = queryByText('Penalties');
  const a11yFTScore = queryByText('Full Time Liepāja 2 , Gjilani 2');
  const a11yHTScore = queryByText('Half Time Liepāja 1 , Gjilani 1');

  const a11ySummaryRegex = /Liepāja 2 , Gjilani 2 after extra time going to penalties/;
  const a11ySummary = queryByText(a11ySummaryRegex);

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
  const { getAllByText } = renderComponent(cancelledMockData);
  const homeTeam = getAllByText('Fulham');
  const awayTeam = getAllByText('Liverpool');
  const matchProgress = getAllByText('Match Cancelled');
  const homeReplacementScore = getAllByText('C');
  const awayReplacementScore = getAllByText('C');

  expect(homeTeam).toHaveLength(3);
  expect(awayTeam).toHaveLength(3);
  expect(matchProgress[1]).toBeInTheDocument();
  expect(homeReplacementScore[0]).toBeInTheDocument();
  expect(awayReplacementScore[1]).toBeInTheDocument();
});

test('renders head to head if an event is postponed with match status letter data', () => {
  const { getAllByText } = renderComponent(postponedMockData);
  const homeTeam = getAllByText('Fulham');
  const awayTeam = getAllByText('Liverpool');
  const matchProgress = getAllByText('Match Postponed');
  const homeReplacementScore = getAllByText('P');
  const awayReplacementScore = getAllByText('P');

  expect(homeTeam).toHaveLength(3);
  expect(awayTeam).toHaveLength(3);
  expect(matchProgress[1]).toBeInTheDocument();
  expect(homeReplacementScore[0]).toBeInTheDocument();
  expect(awayReplacementScore[1]).toBeInTheDocument();
});

test('renders head to head if an event is suspended with score data', () => {
  const { getByText, getAllByText } = renderComponent(suspendedMockData);
  const homeTeam = getAllByText('Liepāja');
  const awayTeam = getAllByText('Gjilani');
  const matchProgress = getByText('Suspended');
  const runningScore = getAllByText('0');

  expect(homeTeam).toHaveLength(3);
  expect(awayTeam).toHaveLength(3);
  expect(matchProgress).toBeInTheDocument();
  expect(runningScore[0]).toBeInTheDocument();
  expect(runningScore[1]).toBeInTheDocument();
});

test('renders the head to head of PostEvent with added time and accessibility text', () => {
  const { queryByText } = renderComponent(postEventAETData);

  const a11yHTScore = queryByText('Half Time Southampton 0 , Liverpool 0');
  const a11yFTScore = queryByText('Full Time Southampton 1 , Liverpool 1');

  const a11ySummaryRegex = /Southampton 1 , Liverpool 2 After extra time/;
  const a11ySummary = queryByText(a11ySummaryRegex);

  expect(a11ySummary).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
});

test('renders head to head with half time and full time scores of PostEvent after extra time', () => {
  const { getByText } = renderComponent(postEventAETData);
  const halfTimeScore = getByText('HT 0-0');
  const fullTimeScore = getByText('FT 1-1');
  const period = getByText('AET');
  const a11yAETPeriod = getByText('After extra time');
  const a11yFTScore = getByText('Full Time Southampton 1 , Liverpool 1');
  const a11yHTScore = getByText('Half Time Southampton 0 , Liverpool 0');

  const a11ySummaryRegex = /Southampton 1 , Liverpool 2 After extra time/;
  const a11ySummary = getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTimeScore).toBeInTheDocument();
  expect(period).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yAETPeriod).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with the full time scores of PostEvent aet', () => {
  const { queryByText, getByText } = renderComponent(postEventAETData);
  const period = queryByText('AET');
  const homeScore = getByText('1');
  const awayScore = getByText('2');
  const a11yAETPeriod = queryByText('After extra time');
  const a11yHTScore = queryByText('Half Time Southampton 0 , Liverpool 0');
  const a11yFTScore = queryByText('Full Time Southampton 1 , Liverpool 1');

  const a11ySummaryRegex = /Southampton 1 , Liverpool 2 After extra time/;
  const a11ySummary = queryByText(a11ySummaryRegex);

  expect(homeScore).toBeInTheDocument();
  expect(awayScore).toBeInTheDocument();
  expect(period).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yAETPeriod).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
});

test('does not render the aggregate score if it is the Leg 1 of a game', () => {
  const data = {
    ...postEventAgg90Data,
    multiLeg: {
      leg: 1,
      relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
      aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr'
    }
  };
  const { queryByText } = renderComponent(data);
  const aggScore = queryByText('(Agg 1-2)');
  const a11yAggScore = queryByText('Aggregate score Southampton 1 , Liverpool 2');

  expect(aggScore).not.toBeInTheDocument();
  expect(a11yAggScore).not.toBeInTheDocument();
});

test('renders head to head with half time, full time and aggregate scores of PostEvent FT and a win on agg', () => {
  const data = {
    ...postEventAgg90Data,
    multiLeg: {
      leg: 2,
      relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
      aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr'
    }
  };
  const { getByText } = renderComponent(data);
  const halfTimeScore = getByText('HT 1-1');
  const aggScore = getByText('(Agg 1-2)');
  const period = getByText('FT');
  const a11yAggScore = getByText('Aggregate score Southampton 1 , Liverpool 2');
  const a11yFTPeriod = getByText('Full time');
  const a11yHTScore = getByText('Half Time Southampton 1 , Liverpool 1');

  const a11ySummaryRegex = /Southampton 1 , Liverpool 2 at Full time , Liverpool win 2 - 1 on aggregate/;
  const a11ySummary = getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(aggScore).toBeInTheDocument();
  expect(period).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yAggScore).toBeInTheDocument();
  expect(a11yFTPeriod).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with half time, full time, aggregate scores and AET period of PostEvent AET and a win on agg', () => {
  const data = {
    ...finishedAetAggData,
    multiLeg: {
      leg: 2,
      relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
      aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr'
    }
  };
  const { getByText } = renderComponent(data);
  const halfTimeScore = getByText('HT 2-1');
  const fullTimeScore = getByText('FT 2-2');
  const aggScore = getByText('(Agg 5-3)');
  const period = getByText('AET');
  const a11yAggScore = getByText('Aggregate score Southampton 5 , Liverpool 3');
  const a11yAetPeriod = getByText('After extra time');
  const a11yFTScore = getByText('Full Time Southampton 2 , Liverpool 2');
  const a11yHTScore = getByText('Half Time Southampton 2 , Liverpool 1');

  const a11ySummaryRegex = /Southampton 4 , Liverpool 2 After extra time , Southampton win 5 - 3 on aggregate/;
  const a11ySummary = getByText(a11ySummaryRegex);

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
  const { container, getByText, queryByText } = renderComponent(postEventPens90Data);
  const halfTimeScore = getByText('HT 1-1');
  const fullTimeScore = queryByText('FT 1-1');
  const period = getByText('FT');
  const a11yFTPeriod = getByText('Full time');
  const a11yPenScore = getByText('Liverpool win 5 - 3 on penalties');
  const a11yHTScore = getByText('Half Time Southampton 1 , Liverpool 1');

  const a11ySummaryRegex = /Southampton 1 , Liverpool 1 at Full time , Liverpool win 5 - 3 on penalties/;
  const a11ySummary = getByText(a11ySummaryRegex);

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
  const { queryByText } = renderComponent(postEventPensAetData);
  const halfTimeScore = queryByText('HT 1-1');
  const fullTime = queryByText('FT 1-1');
  const a11yFTScore = queryByText('Full Time Southampton 1 , Liverpool 1');
  const a11yHTScore = queryByText('Half Time Southampton 1 , Liverpool 1');

  expect(a11yHTScore).toBeInTheDocument();
  expect(halfTimeScore).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(fullTime).toBeInTheDocument();
});

test('renders head to head with half time, full time scores and AET of PostEvent AET and penalties', () => {
  const { getByText, container } = renderComponent(postEventPensAetData);
  const halfTimeScore = getByText('HT 1-1');
  const fullTime = getByText('FT 1-1');
  const aet = getByText('AET');
  const a11yAetPeriod = getByText('After extra time');
  const a11yPenScore = getByText('Southampton win 5 - 3 on penalties');
  const a11yFTScore = getByText('Full Time Southampton 1 , Liverpool 1');
  const a11yHTScore = getByText('Half Time Southampton 1 , Liverpool 1');

  const a11ySummaryRegex = /Southampton 1 , Liverpool 1 After extra time , Southampton win 5 - 3 on penalties/;
  const a11ySummary = getByText(a11ySummaryRegex);

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
  const data = {
    ...postEventPensAetAggData,
    seriesWinner: postEventPensAetAggData.winner,
    multiLeg: {
      leg: 2,
      relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
      aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr'
    }
  };
  const { getByText, container } = renderComponent(data);
  const halfTimeScore = getByText('HT 1-1');
  const fullTime = getByText('FT 1-1');
  const aet = getByText('AET');
  const agg = getByText('(Agg 2-2)');
  const a11yAetPeriod = getByText('After extra time');
  const a11yAggScore = getByText('Aggregate score Southampton 2 , Liverpool 2');
  const a11yPenScore = getByText('Southampton win 5 - 3 on penalties');
  const a11yFTScore = getByText('Full Time Southampton 1 , Liverpool 1');
  const a11yHTScore = getByText('Half Time Southampton 1 , Liverpool 1');

  const a11ySummaryRegex =
    /Southampton 1 , Liverpool 1 After extra time , Southampton 2 , Liverpool 2 on aggregate , Southampton win 5 - 3 on penalties/;

  const a11ySummary = getByText(a11ySummaryRegex);

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
  const data = {
    ...postEventPensAetAggData,
    winner: 'home',
    seriesWinner: 'away',
    multiLeg: {
      leg: 2,
      relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
      aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr'
    }
  };

  renderComponent(data);
  const penaltiesText = screen.getByTestId('penalties-text');

  expect(penaltiesText).toBeInTheDocument();
  expect(penaltiesText).toHaveTextContent(/Liverpool/);
});

test.each([
  { props: { winner: undefined }, text: 'winner is undefined' },
  { props: { winner: 'draw', seriesWinner: undefined }, text: 'winner is draw and seriesWinner is undefined' },
  {
    props: {
      multiLeg: {
        leg: 2,
        relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
        aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr'
      },
      seriesWinner: undefined
    },
    text: 'match is second leg in a multi-leg tie and seriesWinner is undefined'
  }
])('renders head to head without penalty scores for match with penalties when $text', ({ props }) => {
  const data = {
    ...postEventPensAetAggData,
    ...props
  };
  const { getByText } = renderComponent(data);
  const fullTime = getByText('FT 1-1');

  expect(fullTime).toBeInTheDocument();
  expect(screen.queryByTestId('penalties-text')).not.toBeInTheDocument();
});

test('renders the value of Attendance', () => {
  const { queryByText } = renderComponent({
    ...secondHalf90Data,
    attendance: {
      value: 73456
    }
  });

  const attendanceValue = queryByText('73,456');

  expect(attendanceValue).toBeInTheDocument();
});

test('renders the value of AttendanceInfo in the venue', () => {
  const { queryByText } = renderComponent({
    ...secondHalf90Data,
    attendance: {
      additionalInfo: 'Limited Audience'
    }
  });

  const venue = queryByText('Stadions Daugava (Limited Audience)');

  expect(venue).toBeInTheDocument();
});

test('renders the value of Attendance and Attendance Info', () => {
  const { queryByText } = renderComponent({
    ...secondHalf90Data,
    attendance: {
      value: 73456,
      additionalInfo: 'Limited Audience'
    }
  });

  const attendanceValue = queryByText('73,456');
  const venue = queryByText('Stadions Daugava (Limited Audience)');

  expect(attendanceValue).toBeInTheDocument();
  expect(venue).toBeInTheDocument();
});

test('does not render the value of Attendance and Attendance Info when they are not present in the data', () => {
  const { queryByText } = renderComponent({
    ...secondHalf90Data,
    attendance: {}
  });

  const attendanceValue = queryByText('73,456');
  const venue = queryByText('Stadions Daugava');

  expect(attendanceValue).not.toBeInTheDocument();
  expect(venue).toBeInTheDocument();
});

test('renders head to head with a goal summary', () => {
  const isConciseView = false;
  const shouldShowActions = true;

  const { queryByText } = renderComponent(rugbyTransformedMidEvent, isConciseView, shouldShowActions);

  const summary = queryByText("Ludlow (7'), Llewellyn (13'), Hathaway (32')");

  expect(summary).toBeInTheDocument();
  expect(summary).not.toHaveAttribute('aria-hidden');
});

test('renders head to head with an accessible goal summary when it exists and aria hides the visual summary', () => {
  const isConciseView = false;
  const shouldShowActions = true;

  const { queryByText } = renderComponent(rugbyTransformedMidEvent, isConciseView, shouldShowActions);

  const summary = queryByText("Barton (14')");
  const accessibleSummary = queryByText('Barton 14 minutes');

  expect(summary).toBeInTheDocument();
  expect(summary).toHaveAttribute('aria-hidden', 'true');
  expect(accessibleSummary).toBeInTheDocument();
  expect(accessibleSummary).not.toHaveAttribute('aria-hidden');
});
