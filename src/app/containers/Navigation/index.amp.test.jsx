import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import Navigation from './index.amp';

const scrollableTestId = 'scrollable-list';
const dropdownTestId = 'dropdown';

const scrollableListItems = (
  <ul data-testid={scrollableTestId}>
    <li>List Items</li>
  </ul>
);

const dropdownListItems = <div data-testid={dropdownTestId}>Dropdown</div>;

describe('Snapshots', () => {
  shouldMatchSnapshot(
    'should correctly render AMP navigation',
    <Navigation
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      skipLinkText="skip link"
      menuAnnouncedText="menu"
      script={latin}
      service="news"
      dir="ltr"
      isAmp
      dropdownId="dropdown"
    />,
  );
});

// we need to write an end to end test to make sure AMP state toggling works.
