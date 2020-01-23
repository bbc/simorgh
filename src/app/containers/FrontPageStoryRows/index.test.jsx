import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { TopRow, LeadingRow, RegularRow } from '.';

// eslint-disable-next-line react/prop-types
const Promo = ({ text }) => <div>{text}</div>;

describe('FrontPageStoryRows Container', () =>
  describe('snapshots', () => {
    shouldMatchSnapshot('TopRow', <TopRow story={<Promo text="top" />} />);
    shouldMatchSnapshot(
      'LeadingRow',
      <LeadingRow
        leadingStory={<Promo text="leading" />}
        regularStory={<Promo text="regular" />}
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
