import React from 'react';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import fixture from '../../../../data/pidgin/topics/c95y35941vrt.json';
import mundoFixture from '../../../../data/mundo/topics/c1en6xwmpkvt.json';
import kyrgyzHomePage from '../../../../data/kyrgyz/homePage/index.json';
import { data as kyrgyzMostRead } from '../../../../data/kyrgyz/mostRead/index.json';
import afriqueHomePage from '../../../../data/afrique/homePage/index.json';
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
import { RadioScheduleData } from '../../models/types/radioSchedule';

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

const billboardCuration = kyrgyzHomePage.data.curations.find(
  ({ visualStyle, visualProminence, summaries }) =>
    visualStyle === BANNER &&
    visualProminence === MAXIMUM &&
    summaries &&
    summaries.length > 0,
);

const components = {
  'curation-grid-normal': {
    visualStyle: NONE,
    visualProminence: NORMAL,
    summaries: fixture.data.curations[0].summaries,
  },
  'hierarchical-grid': {
    visualStyle: NONE,
    visualProminence: HIGH,
    summaries: mundoFixture.data.curations[0].summaries,
  },
  'message-banner-': {
    visualStyle: BANNER,
    visualProminence: NORMAL,
    summaries: messageBannerCuration?.summaries,
  },
  'most-read': {
    visualStyle: RANKED,
    visualProminence: NORMAL,
    mostRead: kyrgyzMostRead,
  },
  'radio-schedule': {
    visualStyle: NONE,
    visualProminence: NORMAL,
    radioSchedule: afriqueHomePage.data.curations[4].radioSchedule,
  },
  'billboard-': {
    visualStyle: BANNER,
    visualProminence: MAXIMUM,
    summaries: billboardCuration?.summaries,
  },
};

interface TestProps {
  visualStyle: VisualStyle;
  visualProminence: VisualProminence;
  summaries?: Summary[];
  mostRead?: MostReadData;
  radioSchedule?: RadioScheduleData[];
}

describe('Curation', () => {
  suppressPropWarnings(['children', 'string', 'MediaIcon']);
  suppressPropWarnings(['children', 'PromoTimestamp', 'undefined']);
  suppressPropWarnings(['timestamp', 'TimestampContainer', 'undefined']);

  it.each(Object.entries(components))(
    `should render a %s component`,
    // @ts-expect-error test props types are incompatible now with the updated kyrgyz home page fixture containing billboards
    (
      testId: string, // testId is the key in the components object above
      {
        visualStyle,
        visualProminence,
        summaries,
        mostRead,
        radioSchedule,
      }: TestProps,
    ) => {
      const { getByTestId } = render(
        <Curation
          position={0}
          visualStyle={visualStyle}
          visualProminence={visualProminence}
          summaries={summaries || []}
          mostRead={mostRead}
          radioSchedule={radioSchedule}
        />,
        {
          toggles: {
            mostRead: { enabled: true },
            radioSchedule: { enabled: true },
          },
          service: 'afrique',
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
          position={0}
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
          position={0}
          visualStyle={visualStyle}
          visualProminence={visualProminence}
          title={title}
          summaries={[]}
        />,
      );

      expect(queryByText(title)).toBeNull();
    },
  );

  describe('Message Banner', () => {
    it('should not be displayed if there are no promos', () => {
      render(
        <Curation
          position={0}
          visualStyle={BANNER}
          visualProminence={NORMAL}
          summaries={[]}
        />,
      );

      expect(
        document.querySelector('[data-testid="message-banner-"]'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Billboard', () => {
    it('should not be displayed if there are no promos', () => {
      render(
        <Curation
          position={0}
          visualStyle={BANNER}
          visualProminence={MAXIMUM}
          summaries={[]}
        />,
      );

      expect(
        document.querySelector('[data-testid="billboard-"]'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Headings', () => {
    it('should render correctly when there are multiple curations and the curation only has 1 summary', () => {
      const [curationWithSummary] = kyrgyzHomePage.data.curations.filter(
        ({ summaries }) => summaries && summaries.length > 0,
      );

      const summary = curationWithSummary.summaries?.pop();

      render(
        <Curation
          visualProminence={NORMAL}
          visualStyle={NONE}
          // @ts-expect-error summary will not be undefined
          summaries={[summary]}
          curationLength={2}
        />,
      );

      expect(document.querySelectorAll('section h2').length).toBe(1);
    });
  });
});
