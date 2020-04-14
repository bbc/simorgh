import filterMostRead from './filterMostRead';
import pidginData from '#data/pidgin/mostRead';
import { setStaleLastRecordTimeStamp } from '../utilities/testHelpers';

const expectedPidginData = [
  {
    id: '577a20af-06af-b846-a216-5b2b067c5236',
    title: 'Public Holidays wey go happun for 2019',
    href: '/pidgin/tori-46729879',
    timestamp: 1558434642016,
  },
  {
    id: '94b678eb-48b4-0b4d-a2bd-224f5abf7bb3',
    title: 'Liberia banks don run out of money',
    href: '/pidgin/tori-50304653',
    timestamp: 1572977517339,
  },
  {
    id: '23122a2a-002c-ea48-acc4-1c86e51daf0f',
    title: "Why Oscars disqualify Genevieve Nnaji 'Lionheart' film",
    href: '/pidgin/tori-50298882',
    timestamp: 1572984342554,
  },
  {
    id: 'c2c89535-a38b-3f46-bdbf-05e10ce5e9ae',
    title:
      'Ghana opposition NDC list 51 family and friends inside Akufo-Addo govment',
    href: '/pidgin/tori-50315150',
    timestamp: 1573031271997,
  },
  {
    id: '3261c706-fe76-b44e-b1e1-d06abb6ab6ea',
    title: 'How Balogun market fire kill Policeman for Lagos',
    href: '/pidgin/tori-50315157',
    timestamp: 1573043600531,
  },
  {
    id: '405a8b7b-5d83-3544-b4c7-a6625f1f74f0',
    title: 'Labour, FG finally agree minimum wage salary adjustment',
    href: '/pidgin/tori-50093818',
    timestamp: 1571396267618,
  },
  {
    id: '89968845-7d48-c444-9b49-f92030353dc2',
    title: "Naira Marley na 'Bad Influence'?",
    href: '/pidgin/tori-50187218',
    timestamp: 1572029018472,
  },
  {
    id: '8e2aa954-a5e4-144d-8598-f359c25026af',
    title: 'Tins you suppose know about Naira Marley',
    href: '/pidgin/tori-48347911',
    timestamp: 1558603656695,
  },
  {
    id: '1acd5d84-9161-654a-8764-2381942a97cc',
    title: 'Golden Eaglets crash out of Fifa U17 World Cup',
    href: '/pidgin/sport-50312710',
    timestamp: 1573015206577,
  },
  {
    id: '3570f183-4652-104f-94d1-393867ab20d9',
    title: 'Tiger nut drink fit wake up your sex drive - Nutritionist',
    href: '/pidgin/tori-42945173',
    timestamp: 1558435704688,
  },
];

describe('filterMostRead', () => {
  [
    {
      description: 'should return expected filtered data',
      data: pidginData,
      numberOfItems: 10,
      expectedReturn: expectedPidginData,
    },
    {
      description: 'should return null when last record time stamp is stale',
      data: setStaleLastRecordTimeStamp(pidginData),
      expectedReturn: null,
    },
    {
      description: 'should return null when no data is passed',
      data: undefined,
      expectedReturn: null,
    },
    {
      description: 'should return empty array when records does not exist',
      data: { lastRecordTimeStamp: '2100-11-06T16:37:00Z' },
      expectedReturn: [],
    },
  ].forEach(({ description, data, numberOfItems, expectedReturn }) => {
    it(description, () => {
      expect(filterMostRead({ data, numberOfItems })).toEqual(expectedReturn);
    });
  });
});
