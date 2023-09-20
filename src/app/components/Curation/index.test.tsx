import React from 'react';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import fixture from '../../../../data/pidgin/topics/c95y35941vrt.json';
import mundoFixture from '../../../../data/mundo/topics/c1en6xwmpkvt.json';
import kyrgyzHomePage from '../../../../data/kyrgyz/homePage/index.json';
import { data as kyrgyzMostRead } from '../../../../data/kyrgyz/mostRead/index.json';
import { render } from '../react-testing-library-with-providers';
import Curation from '.';
import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
  VisualStyle,
  VisualProminence,
  Summary,
} from '../../models/types/curationData';
import { MostReadData } from '../MostRead/types';

jest.mock('../ThemeProvider');

const { NONE, BANNER, RANKED, COLLECTION } = VISUAL_STYLE;
const { NORMAL, HIGH, LOW, MAXIMUM, MINIMUM } = VISUAL_PROMINENCE;

const messageBannerCuration = kyrgyzHomePage.data.curations.find(
  ({ visualStyle, visualProminence, summaries }) =>
    visualStyle === BANNER &&
    visualProminence === NORMAL &&
    summaries &&
    summaries.length > 0,
);

const components = {
  'curation-grid-normal': {
    visualStyle: NONE,
    visualProminence: NORMAL,
    promos: fixture.data.curations[0].summaries,
  },
  'hierarchical-grid': {
    visualStyle: NONE,
    visualProminence: HIGH,
    promos: mundoFixture.data.curations[0].summaries,
  },
  'message-banner-': {
    visualStyle: BANNER,
    visualProminence: NORMAL,
    promos: messageBannerCuration?.summaries,
  },
  'most-read': {
    visualStyle: RANKED,
    visualProminence: NORMAL,
    mostRead: kyrgyzMostRead,
  },
};

interface TestProps {
  visualStyle: VisualStyle;
  visualProminence: VisualProminence;
  promos?: Summary[];
  mostRead?: MostReadData;
}

describe('Curation', () => {
  suppressPropWarnings(['children', 'string', 'MediaIcon']);
  suppressPropWarnings(['children', 'PromoTimestamp', 'undefined']);
  suppressPropWarnings(['timestamp', 'TimestampContainer', 'undefined']);

  it.each(Object.entries(components))(
    `should render a %s component`,
    (
      testId: string, // testId is the key in the components object above
      { visualStyle, visualProminence, promos, mostRead }: TestProps,
    ) => {
      const { getByTestId } = render(
        <Curation
          visualStyle={visualStyle}
          visualProminence={visualProminence}
          promos={promos || []}
          mostRead={mostRead}
        />,
        {
          toggles: {
            mostRead: { enabled: true },
          },
        },
      );

      expect(getByTestId(testId)).toBeInTheDocument();
    },
  );

  it.each([
    { visualStyle: BANNER, visualProminence: LOW },
    { visualStyle: BANNER, visualProminence: MINIMUM },
    { visualStyle: BANNER, visualProminence: MAXIMUM },
  ])(
    'does not render a component when visualStyle and visualProminence is unsupported: %o',
    ({ visualStyle, visualProminence }) => {
      const { container } = render(
        <Curation
          visualStyle={visualStyle}
          visualProminence={visualProminence}
        />,
      );

      expect(container).toBeEmptyDOMElement();
    },
  );

  it.each([
    { visualStyle: COLLECTION, visualProminence: NORMAL },
    { visualStyle: COLLECTION, visualProminence: HIGH },
    { visualStyle: NONE, visualProminence: NORMAL },
    { visualStyle: NONE, visualProminence: HIGH },
  ])(
    'does not render a subheading if there are no promos: %o',
    ({ visualProminence, visualStyle }) => {
      const title = 'Do not render';

      const { queryByText } = render(
        <Curation
          visualStyle={visualStyle}
          visualProminence={visualProminence}
          title={title}
          promos={[]}
        />,
      );

      expect(queryByText(title)).toBeNull();
    },
  );

  describe('Message Banner', () => {
    it('should not be displayed if there are no promos', () => {
      render(
        <Curation visualStyle={BANNER} visualProminence={NORMAL} promos={[]} />,
      );

      expect(
        document.querySelector('[data-testid="message-banner-"]'),
      ).not.toBeInTheDocument();
    });
  });
});
