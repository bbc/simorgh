import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { TopRow, LeadingRow, RegularRow } from '.';

// eslint-disable-next-line react/prop-types
const Promo = ({ text }) => <div>{text}</div>;

describe('FrontPageStoryRows Container', () =>
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'TopRow',
      <TopRow stories={[{ story: <Promo text="top story" />, id: 0 }]} />,
    );
    shouldMatchSnapshot(
      'LeadingRow',
      <LeadingRow
        stories={[
          { story: <Promo text="leading" />, id: 0 },
          { story: <Promo text="regular" />, id: 1 },
        ]}
      />,
    );
    shouldMatchSnapshot(
      'RegularRow',
      <RegularRow
        stories={[
          { story: <Promo text="left" />, id: 0 },
          { story: <Promo text="left middle" />, id: 1 },
          { story: <Promo text="right middle" />, id: 2 },
          { story: <Promo text="right" />, id: 3 },
        ]}
      />,
    );
  }));
