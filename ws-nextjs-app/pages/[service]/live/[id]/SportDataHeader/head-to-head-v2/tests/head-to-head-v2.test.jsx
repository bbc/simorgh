import {
  render,
  screen,
  act,
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

// TO DO - consolodate this (original) and the below function (copilot)
const renderComponent = (data, isConciseView, shouldShowActions, props) => {
  return render(
    <HeadToHead
      data={data}
      isConciseView={isConciseView}
      shouldShowActions={shouldShowActions}
      renderEventSummaryHeading
      {...props}
    />,
  );
};

const renderHeadToHead = async data => {
  let renderResult;

  await act(async () => {
    renderResult = render(<HeadToHead data={data} />);
  });

  return renderResult;
};

// skipped - we do not support concise view in MVP
describe.each([true, false])('head to head concise view %s', isConciseView => {
  test.skip('renders the component of PreEvent status with data', () => {
    const { queryByText, getAllByText, queryAllByText } = renderComponent(
      preEventMockData,
      isConciseView,
    );
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
    const data = {
      ...postEventAgg90Data,
      multiLeg: {
        leg: 2,
        relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
        aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
      },
    };
    const { queryByText } = renderComponent(data, isConciseView);
    const aggScore = queryByText('(Agg 1-2)');
    const a11yAggScore = queryByText(
      'Aggregate score Southampton 1 , Liverpool 2',
    );

    expect(aggScore).toBeInTheDocument();
    expect(a11yAggScore).toBeInTheDocument();
  });

  test.skip('does not render the aggregate score if it is the Leg 1 of a game in Concise View', () => {
    const data = {
      ...postEventAgg90Data,
      multiLeg: {
        leg: 1,
        relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
        aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
      },
    };
    const { queryByText } = renderComponent(data, isConciseView);
    const aggScore = queryByText('(Agg 1-2)');
    const a11yAggScore = queryByText(
      'Aggregate score Southampton 1 , Liverpool 2',
    );

    expect(aggScore).not.toBeInTheDocument();
    expect(a11yAggScore).not.toBeInTheDocument();
  });

  test.skip('renders the head to head of MidEvent status', () => {
    const { queryByText, getAllByText } = renderComponent(
      firstHalfData,
      isConciseView,
    );
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
    const { queryByText } = renderComponent(
      firstHalfAddedTimeData,
      isConciseView,
    );
    const period = queryByText('45 minutes plus 2 , in progress');
    const matchProgress = queryByText("45'+2");

    expect(period).toBeInTheDocument();
    expect(matchProgress).toBeInTheDocument();
  });

  test.skip('renders the head to head of PostEvent with added time', () => {
    const { queryByText, getByText } = renderComponent(
      postEventAETData,
      isConciseView,
    );
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

  test.skip('renders the head to head with FT scores and AET of PostEvent including penalties', () => {
    const { queryByText, container } = renderComponent(
      postEventPensAetData,
      isConciseView,
    );
    const period = queryByText('AET');
    const a11yAetPeriod = queryByText('After extra time');
    const a11yPenScore = queryByText('Southampton win 5 - 3 on penalties');
    const a11ySummaryRegex =
      /Southampton 1 , Liverpool 1 After extra time , Southampton win 5 - 3 on penalties/;
    const a11ySummary = queryByText(a11ySummaryRegex);

    expect(container).toHaveTextContent('Southampton win 5-3 on pens');
    expect(period).toBeInTheDocument();
    expect(a11ySummary).toBeInTheDocument();
    expect(a11yAetPeriod).toBeInTheDocument();
    expect(a11yPenScore).toBeInTheDocument();
  });

  test.skip('renders a concise event summary', () => {
    const { getByText } = renderComponent(preEventMockData, isConciseView, {
      renderEventSummaryHeading: true,
    });
    const conciseEventSummary = getByText(
      'Fulham versus Liverpool kick off 12:30',
    );

    expect(conciseEventSummary).toBeInTheDocument();
  });
});

// skipped - we do not support OJ path in MVP
test.skip('does not wrap the card with a link when not given an onward journey path', () => {
  const { queryByRole } = renderComponent(firstHalfData, true);
  const onwardJourneyLink = queryByRole('link');

  expect(onwardJourneyLink).not.toBeInTheDocument();
});

// skipped - we do not support OJ path in MVP
test.skip('wraps the card with a link when given an onward journey path', async () => {
  const { getByRole, queryAllByText } = renderComponent(preEventMockData, true);
  const onwardJourneyLink = getByRole('link');
  const homeTeamName = queryAllByText('Fulham');
  const awayTeamName = queryAllByText('Liverpool');

  expect(onwardJourneyLink.getAttribute('href')).toBe(
    '/sport/football/live/cvp5j5ndx5nt',
  );
  expect(homeTeamName).toHaveLength(3);
  expect(awayTeamName).toHaveLength(3);
});

test('renders head to head component of PreEvent status with No teams', async () => {
  await act(async () => {
    render(<HeadToHead data={preEventNoTeamsMockData} />);
  });

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

test('renders head to head component of PreEvent status', async () => {
  await act(async () => {
    render(<HeadToHead data={preEventMockData} />);
  });

  const date = screen.queryByText('Sat 6 Aug 2022');
  const tournamentLabel = screen.queryByText('Premier League');

  expect(date).toBeInTheDocument();
  expect(tournamentLabel).toBeInTheDocument();
});

test('renders the head to head of MidEvent status', async () => {
  const tournamentDescriptionLabel = 'UEFA Europa Conference League';

  await renderHeadToHead({
    ...firstHalfData,
    tournamentDescriptionLabel,
  });
  const tournamentText = screen.queryByText(tournamentDescriptionLabel);
  const time = screen.queryByText(firstHalfData.date);
  const venue = screen.queryByText('Stadions Daugava');

  expect(tournamentText).toBeInTheDocument();
  expect(time).not.toBeInTheDocument();
  expect(venue).toBeInTheDocument();
});

test('renders head to head with half time, full time scores for a MidEvent in Extra Time', async () => {
  await renderHeadToHead(etFirstHalfData);
  const halfTimeScore = screen.getByText('HT 1-1');
  const fullTime = screen.getByText('FT 2-2');
  const extraTime = screen.getByText("98' ET");
  const minsInProgress = screen.getByText(
    '98 minutes extra time , in progress',
  );
  const a11yFTScore = screen.getByText('Full Time Liepāja 2 , Gjilani 2');
  const a11yHTScore = screen.getByText('Half Time Liepāja 1 , Gjilani 1');

  const a11ySummaryRegex = /Liepāja 2 , Gjilani 2 Extra time in progress/;
  const a11ySummary = screen.getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTime).toBeInTheDocument();
  expect(extraTime).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(minsInProgress).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with half time, full time and penalties scores for a MidEvent in Pens aet', async () => {
  await renderHeadToHead(inPensAetData);
  const halfTimeScore = screen.getByText('HT 1-1');
  const fullTime = screen.getByText('FT 2-2');
  const pens = screen.getByText('Penalties 1-1');
  const a11yFTScore = screen.getByText('Full Time Liepāja 2 , Gjilani 2');
  const a11yHTScore = screen.getByText('Half Time Liepāja 1 , Gjilani 1');

  const a11ySummaryRegex =
    /Liepāja 2 , Gjilani 2 after extra time penalties in progress/;
  const a11ySummary = screen.getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTime).toBeInTheDocument();
  expect(pens).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with half time, full time and penalties scores for a MidEvent aet before pens', async () => {
  await renderHeadToHead(beforePensAetData);
  const halfTimeScore = screen.getByText('HT 1-1');
  const fullTime = screen.getByText('FT 2-2');
  const pens = screen.getByText('Penalties');
  const excludedPensScore = screen.queryByText('Penalties 1-0');
  const a11yPenPeriod = screen.getByText('Penalties');
  const a11yFTScore = screen.getByText('Full Time Liepāja 2 , Gjilani 2');
  const a11yHTScore = screen.getByText('Half Time Liepāja 1 , Gjilani 1');

  const a11ySummaryRegex =
    /Liepāja 2 , Gjilani 2 after extra time going to penalties/;
  const a11ySummary = screen.getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTime).toBeInTheDocument();
  expect(pens).toBeInTheDocument();
  expect(excludedPensScore).not.toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yPenPeriod).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with half time, full time and penalties scores for a MidEvent after 90 mins in pens', async () => {
  await renderHeadToHead(inPens90Data);
  const halfTimeScore = screen.getByText('HT 2-3');
  const pens = screen.getByText('Penalties 2-3');
  const a11yPenPeriod = screen.getByText('Penalties Liepāja 2 , Gjilani 3');
  const a11yHTScore = screen.getByText('Half Time Liepāja 2 , Gjilani 3');

  const a11ySummaryRegex =
    /Liepāja 3 , Gjilani 3 after full time penalties in progress/;
  const a11ySummary = screen.getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(pens).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yPenPeriod).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head and shows actions data when showScorers prop is true', async () => {
  await act(async () => {
    render(<HeadToHead data={inPensAetData} isConciseView shouldShowActions />);
  });
  const player = screen.getByText('A. Karašausks');
  const firstGoalByMinutes = screen.getByText(/13'/);
  const secondGoalByMinutes = screen.getByText(/85'/);

  expect(player).toBeInTheDocument();
  expect(firstGoalByMinutes).toBeInTheDocument();
  expect(secondGoalByMinutes).toBeInTheDocument();
});

test('renders head to head but does not show actions data when showScorers prop is false', async () => {
  await act(async () => {
    render(
      <HeadToHead
        data={inPensAetData}
        isConciseView
        shouldShowActions={false}
      />,
    );
  });
  const player = screen.queryByText('A. Karašausks');
  const goalsByMinutes = screen.queryByText(`13', 85'`);

  expect(player).not.toBeInTheDocument();
  expect(goalsByMinutes).not.toBeInTheDocument();
});

test('renders head to head with aet and penalties scores for a MidEvent after aet', async () => {
  await renderHeadToHead(inPens90Data);
  const halfTimeScore = screen.queryByText('HT 2-3');
  const pens = screen.queryByText('Penalties 2-3');
  const a11yPenPeriod = screen.queryByText('Penalties Liepāja 2 , Gjilani 3');
  const a11yHTScore = screen.queryByText('Half Time Liepāja 2 , Gjilani 3');

  const a11ySummaryRegex =
    /Liepāja 3 , Gjilani 3 after full time penalties in progress/;
  const a11ySummary = screen.queryByText(a11ySummaryRegex);

  expect(pens).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yPenPeriod).toBeInTheDocument();
  expect(halfTimeScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head after aet and displays penalties before pens start in MidEvent', async () => {
  await renderHeadToHead(beforePensAetData);
  const halfTimeScore = screen.queryByText('HT 1-1');
  const fullTime = screen.queryByText('FT 2-2');
  const pens = screen.queryByText('Penalties');
  const excludedPensScore = screen.queryByText('Penalties 1-0');
  const a11yPenPeriod = screen.queryByText('Penalties');
  const a11yFTScore = screen.queryByText('Full Time Liepāja 2 , Gjilani 2');
  const a11yHTScore = screen.queryByText('Half Time Liepāja 1 , Gjilani 1');

  const a11ySummaryRegex =
    /Liepāja 2 , Gjilani 2 after extra time going to penalties/;
  const a11ySummary = screen.queryByText(a11ySummaryRegex);

  expect(pens).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yPenPeriod).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTime).toBeInTheDocument();
  expect(excludedPensScore).not.toBeInTheDocument();
});

test('renders head to head if an event is cancelled with match status letter data', async () => {
  await renderHeadToHead(cancelledMockData);

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

test('renders head to head if an event is postponed with match status letter data', async () => {
  await renderHeadToHead(postponedMockData);

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

test('renders head to head if an event is suspended with score data', async () => {
  await renderHeadToHead(suspendedMockData);

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

test('renders the head to head of PostEvent with added time and accessibility text', async () => {
  await renderHeadToHead(postEventAETData);

  const a11yHTScore = screen.queryByText(
    'Half Time Southampton 0 , Liverpool 0',
  );
  const a11yFTScore = screen.queryByText(
    'Full Time Southampton 1 , Liverpool 1',
  );

  const a11ySummaryRegex = /Southampton 1 , Liverpool 2 After extra time/;
  const a11ySummary = screen.queryByText(a11ySummaryRegex);

  expect(a11ySummary).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
});

test('renders head to head with half time and full time scores of PostEvent after extra time', async () => {
  await renderHeadToHead(postEventAETData);

  const halfTimeScore = screen.getByText('HT 0-0');
  const fullTimeScore = screen.getByText('FT 1-1');
  const period = screen.getByText('AET');
  const a11yAETPeriod = screen.getByText('After extra time');
  const a11yFTScore = screen.getByText('Full Time Southampton 1 , Liverpool 1');
  const a11yHTScore = screen.getByText('Half Time Southampton 0 , Liverpool 0');

  const a11ySummaryRegex = /Southampton 1 , Liverpool 2 After extra time/;
  const a11ySummary = screen.getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTimeScore).toBeInTheDocument();
  expect(period).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yAETPeriod).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with the full time scores of PostEvent aet', async () => {
  await renderHeadToHead(postEventAETData);

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

  const a11ySummaryRegex = /Southampton 1 , Liverpool 2 After extra time/;
  const a11ySummary = screen.queryByText(a11ySummaryRegex);

  expect(homeScore).toBeInTheDocument();
  expect(awayScore).toBeInTheDocument();
  expect(period).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yAETPeriod).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
});

test('does not render the aggregate score if it is the Leg 1 of a game', async () => {
  const data = {
    ...postEventAgg90Data,
    multiLeg: {
      leg: 1,
      relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
      aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
    },
  };
  await renderHeadToHead(data);

  const aggScore = screen.queryByText('(Agg 1-2)');
  const a11yAggScore = screen.queryByText(
    'Aggregate score Southampton 1 , Liverpool 2',
  );

  expect(aggScore).not.toBeInTheDocument();
  expect(a11yAggScore).not.toBeInTheDocument();
});

test('renders head to head with half time, full time and aggregate scores of PostEvent FT and a win on agg', async () => {
  const data = {
    ...postEventAgg90Data,
    multiLeg: {
      leg: 2,
      relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
      aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
    },
  };
  await renderHeadToHead(data);

  const halfTimeScore = screen.getByText('HT 1-1');
  const aggScore = screen.getByText('(Agg 1-2)');
  const period = screen.getByText('FT');
  const a11yAggScore = screen.getByText(
    'Aggregate score Southampton 1 , Liverpool 2',
  );
  const a11yFTPeriod = screen.getByText('Full time');
  const a11yHTScore = screen.getByText('Half Time Southampton 1 , Liverpool 1');

  const a11ySummaryRegex =
    /Southampton 1 , Liverpool 2 at Full time , Liverpool win 2 - 1 on aggregate/;
  const a11ySummary = screen.getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(aggScore).toBeInTheDocument();
  expect(period).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yAggScore).toBeInTheDocument();
  expect(a11yFTPeriod).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with half time, full time, aggregate scores and AET period of PostEvent AET and a win on agg', async () => {
  const data = {
    ...finishedAetAggData,
    multiLeg: {
      leg: 2,
      relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
      aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
    },
  };
  await renderHeadToHead(data);

  const halfTimeScore = screen.getByText('HT 2-1');
  const fullTimeScore = screen.getByText('FT 2-2');
  const aggScore = screen.getByText('(Agg 5-3)');
  const period = screen.getByText('AET');
  const a11yAggScore = screen.getByText(
    'Aggregate score Southampton 5 , Liverpool 3',
  );
  const a11yAetPeriod = screen.getByText('After extra time');
  const a11yFTScore = screen.getByText('Full Time Southampton 2 , Liverpool 2');
  const a11yHTScore = screen.getByText('Half Time Southampton 2 , Liverpool 1');

  const a11ySummaryRegex =
    /Southampton 4 , Liverpool 2 After extra time , Southampton win 5 - 3 on aggregate/;
  const a11ySummary = screen.getByText(a11ySummaryRegex);

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

test('renders head to head with half time score, full time status and penalties scores of PostEvent after 90 straight to penalties', async () => {
  let renderResult;

  await act(async () => {
    renderResult = render(<HeadToHead data={postEventPens90Data} />);
  });

  const halfTimeScore = screen.getByText('HT 1-1');
  const fullTimeScore = screen.queryByText('FT 1-1');
  const period = screen.getByText('FT');
  const a11yFTPeriod = screen.getByText('Full time');
  const a11yPenScore = screen.getByText('Liverpool win 5 - 3 on penalties');
  const a11yHTScore = screen.getByText('Half Time Southampton 1 , Liverpool 1');

  const a11ySummaryRegex =
    /Southampton 1 , Liverpool 1 at Full time , Liverpool win 5 - 3 on penalties/;
  const a11ySummary = screen.getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTimeScore).not.toBeInTheDocument();
  expect(period).toBeInTheDocument();
  expect(renderResult.container).toHaveTextContent(/Liverpool win 5-3 on pens/);
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yFTPeriod).toBeInTheDocument();
  expect(a11yPenScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with FT scores and AET of PostEvent including penalties', async () => {
  await renderHeadToHead(postEventPensAetData);

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

test('renders head to head with half time, full time scores and AET of PostEvent AET and penalties', async () => {
  let renderResult;

  await act(async () => {
    renderResult = render(<HeadToHead data={postEventPensAetData} />);
  });

  const halfTimeScore = screen.getByText('HT 1-1');
  const fullTime = screen.getByText('FT 1-1');
  const aet = screen.getByText('AET');
  const a11yAetPeriod = screen.getByText('After extra time');
  const a11yPenScore = screen.getByText('Southampton win 5 - 3 on penalties');
  const a11yFTScore = screen.getByText('Full Time Southampton 1 , Liverpool 1');
  const a11yHTScore = screen.getByText('Half Time Southampton 1 , Liverpool 1');

  const a11ySummaryRegex =
    /Southampton 1 , Liverpool 1 After extra time , Southampton win 5 - 3 on penalties/;
  const a11ySummary = screen.getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTime).toBeInTheDocument();
  expect(renderResult.container).toHaveTextContent(
    'Southampton win 5-3 on pens',
  );
  expect(aet).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yAetPeriod).toBeInTheDocument();
  expect(a11yPenScore).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with half time, full time scores and AET of PostEvent with agg AET and penalties', async () => {
  const data = {
    ...postEventPensAetAggData,
    seriesWinner: postEventPensAetAggData.winner,
    multiLeg: {
      leg: 2,
      relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
      aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
    },
  };
  let renderResult;

  await act(async () => {
    renderResult = render(<HeadToHead data={data} />);
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
  const a11yFTScore = screen.getByText('Full Time Southampton 1 , Liverpool 1');
  const a11yHTScore = screen.getByText('Half Time Southampton 1 , Liverpool 1');

  const a11ySummaryRegex =
    /Southampton 1 , Liverpool 1 After extra time , Southampton 2 , Liverpool 2 on aggregate , Southampton win 5 - 3 on penalties/;

  const a11ySummary = screen.getByText(a11ySummaryRegex);

  expect(halfTimeScore).toBeInTheDocument();
  expect(fullTime).toBeInTheDocument();
  expect(renderResult.container).toHaveTextContent(
    'Southampton win 5-3 on pens',
  );
  expect(aet).toBeInTheDocument();
  expect(agg).toBeInTheDocument();
  expect(a11ySummary).toBeInTheDocument();
  expect(a11yAetPeriod).toBeInTheDocument();
  expect(a11yAggScore).toBeInTheDocument();
  expect(a11yPenScore).toBeInTheDocument();
  expect(a11yFTScore).toBeInTheDocument();
  expect(a11yHTScore).toBeInTheDocument();
});

test('renders head to head with penalty scores using seriesWinner if present', async () => {
  const data = {
    ...postEventPensAetAggData,
    winner: 'home',
    seriesWinner: 'away',
    multiLeg: {
      leg: 2,
      relatedMatchId: 's-8pprp8nrcr6o7y6yvkfjten84',
      aggregateWinnerId: 's-9q0arba2kbnywth8bkxlhgmdr',
    },
  };

  await renderHeadToHead(data);
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
])(
  'renders head to head without penalty scores for match with penalties when $text',
  async ({ props }) => {
    const data = {
      ...postEventPensAetAggData,
      ...props,
    };
    await renderHeadToHead(data);
    const fullTime = screen.getByText('FT 1-1');

    expect(fullTime).toBeInTheDocument();
    expect(screen.queryByTestId('penalties-text')).not.toBeInTheDocument();
  },
);

// please update the below tests to be like the ones above to use render screen asyn await etc

test('renders the value of Attendance', async () => {
  await renderHeadToHead({
    ...secondHalf90Data,
    attendance: {
      value: 73456,
    },
  });

  const attendanceValue = screen.queryByText('73,456');

  expect(attendanceValue).toBeInTheDocument();
});

test('renders the value of AttendanceInfo in the venue', async () => {
  await renderHeadToHead({
    ...secondHalf90Data,
    attendance: {
      additionalInfo: 'Limited Audience',
    },
  });

  const venue = screen.queryByText('Stadions Daugava (Limited Audience)');

  expect(venue).toBeInTheDocument();
});

test('renders the value of Attendance and Attendance Info', async () => {
  await renderHeadToHead({
    ...secondHalf90Data,
    attendance: {
      value: 73456,
      additionalInfo: 'Limited Audience',
    },
  });

  const attendanceValue = screen.queryByText('73,456');
  const venue = screen.queryByText('Stadions Daugava (Limited Audience)');

  expect(attendanceValue).toBeInTheDocument();
  expect(venue).toBeInTheDocument();
});

test('does not render the value of Attendance and Attendance Info when they are not present in the data', async () => {
  await renderHeadToHead({
    ...secondHalf90Data,
    attendance: {},
  });

  const attendanceValue = screen.queryByText('73,456');
  const venue = screen.queryByText('Stadions Daugava');

  expect(attendanceValue).not.toBeInTheDocument();
  expect(venue).toBeInTheDocument();
});

// Not MVP - Rugby fixture data required
// test('renders head to head with a goal summary', () => {
//   const isConciseView = false;
//   const shouldShowActions = true;

//   const { queryByText } = renderComponent(
//     rugbyTransformedMidEvent,
//     isConciseView,
//     shouldShowActions,
//   );

//   const summary = queryByText("Ludlow (7'), Llewellyn (13'), Hathaway (32')");

//   expect(summary).toBeInTheDocument();
//   expect(summary).not.toHaveAttribute('aria-hidden');
// });

// test('renders head to head with an accessible goal summary when it exists and aria hides the visual summary', () => {
//   const isConciseView = false;
//   const shouldShowActions = true;

//   const { queryByText } = renderComponent(
//     rugbyTransformedMidEvent,
//     isConciseView,
//     shouldShowActions,
//   );

//   const summary = queryByText("Barton (14')");
//   const accessibleSummary = queryByText('Barton 14 minutes');

//   expect(summary).toBeInTheDocument();
//   expect(summary).toHaveAttribute('aria-hidden', 'true');
//   expect(accessibleSummary).toBeInTheDocument();
//   expect(accessibleSummary).not.toHaveAttribute('aria-hidden');
// });
