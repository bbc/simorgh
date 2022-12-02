import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../../components/ThemeProvider';
import getNumberPromoFixtures from './testHelpers';
import { TopRow, LeadingRow, RegularRow } from '.';

jest.mock('../../../components/ThemeProvider');

const ImageRow = props => <RegularRow displayImages {...props} />;
const NoImageRow = props => <RegularRow {...props} />;

const getRow = (Type, service, dir, number) => (
  <ThemeProvider service={service} variant="default">
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        pathname="/pathname"
        pageType={FRONT_PAGE}
        isAmp={false}
        service={service}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: true },
          }}
        >
          <Type dir={dir} stories={getNumberPromoFixtures(dir, number)} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  </ThemeProvider>
);

describe('FrontPageStoryRows Container - snapshots', () => {
  shouldMatchSnapshot('TopRow', getRow(TopRow, 'news', 'ltr', 1));
  shouldMatchSnapshot('LeadingRow', getRow(LeadingRow, 'news', 'ltr', 2));
  shouldMatchSnapshot(
    'RegularRow with images',
    getRow(ImageRow, 'news', 'ltr', 4),
  );
  shouldMatchSnapshot(
    'RegularRow without images',
    getRow(NoImageRow, 'news', 'ltr', 4),
  );
  shouldMatchSnapshot('TopRow - rtl', getRow(TopRow, 'arabic', 'rtl', 1));
  shouldMatchSnapshot(
    'LeadingRow - rtl',
    getRow(LeadingRow, 'arabic', 'rtl', 2),
  );
  shouldMatchSnapshot(
    'RegularRow with images - rtl',
    getRow(ImageRow, 'arabic', 'rtl', 4),
  );
  shouldMatchSnapshot(
    'RegularRow without images - rtl',
    getRow(NoImageRow, 'arabic', 'rtl', 4),
  );
});
