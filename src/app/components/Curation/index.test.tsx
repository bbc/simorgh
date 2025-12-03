import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import fixture from '../../../../data/pidgin/topics/c95y35941vrt.json';
import mundoFixture from '../../../../data/mundo/topics/c1en6xwmpkvt.json';
import kyrgyzFixture from '../../../../data/kyrgyz/topics/cvpv9djp9qqt.json';
import kyrgyzHomePage from '../../../../data/kyrgyz/homePage/index.json';
import { data as kyrgyzMostRead } from '../../../../data/kyrgyz/mostRead/index.json';
import afriqueHomePage from '../../../../data/afrique/homePage/index.json';
import portugueseHomePage from '../../../../data/portuguese/homePage/index.json';
import dariHomePage from '../../../../data/dari/homePage/index.json';
import { render } from '../react-testing-library-with-providers';
import Curation from '.';
import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
  INTENT,
  VisualStyle,
  VisualProminence,
  Summary,
} from '../../models/types/curationData';
import { MostReadData } from '../MostRead/types';
import { RadioScheduleData } from '../../models/types/radioSchedule';
import { MediaCollection, PortraitClipMediaBlock } from '../MediaLoader/types';

jest.mock('../ThemeProvider');

const { NONE, BANNER, RANKED, COLLECTION, LINKS, INSITU } = VISUAL_STYLE;
const { NORMAL, HIGH, LOW, MAXIMUM, MINIMUM } = VISUAL_PROMINENCE;
const { MEDIA_PLAYER } = INTENT;

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

const usefulLinksCuration = kyrgyzFixture.data.curations.find(
  ({ visualStyle, visualProminence, summaries }) =>
    visualStyle === LINKS &&
    visualProminence === LOW &&
    summaries &&
    summaries.length > 0,
);

const socialLinksCuration = kyrgyzFixture.data.curations.find(
  ({ visualStyle, visualProminence, summaries }) =>
    visualStyle === LINKS &&
    visualProminence === NORMAL &&
    summaries &&
    summaries.length > 0,
);

const portraitVideoCuration = portugueseHomePage.data.curations.find(
  ({ visualStyle, visualProminence, portraitVideo }) =>
    visualStyle === INSITU && visualProminence === NORMAL && portraitVideo,
);

const mediaCollectionCuration = dariHomePage.data.curations.find(
  ({ intent, mediaCollection }) => intent === MEDIA_PLAYER && mediaCollection,
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
  'message-banner-1': {
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
  'billboard-1': {
    visualStyle: BANNER,
    visualProminence: MAXIMUM,
    summaries: billboardCuration?.summaries,
  },
  'useful-links-1': {
    visualStyle: LINKS,
    visualProminence: LOW,
    summaries: usefulLinksCuration?.summaries,
  },
  'social-links-1': {
    visualStyle: LINKS,
    visualProminence: NORMAL,
    summaries: socialLinksCuration?.summaries,
  },
  'portrait-video-carousel': {
    visualStyle: INSITU,
    visualProminence: NORMAL,
    portraitVideo: portraitVideoCuration?.portraitVideo,
  },
  'media-collection-1': {
    mediaCollection: mediaCollectionCuration?.mediaCollection,
  },
};

interface TestProps {
  visualStyle: VisualStyle;
  visualProminence: VisualProminence;
  summaries?: Summary[];
  portraitVideo?: {
    blocks: PortraitClipMediaBlock[];
  };
  mostRead?: MostReadData;
  radioSchedule?: RadioScheduleData[];
  mediaCollection?: MediaCollection[];
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
        portraitVideo,
        mostRead,
        radioSchedule,
        mediaCollection,
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
          portraitVideo={portraitVideo}
          mediaCollection={mediaCollection}
        />,
        {
          toggles: {
            mostRead: { enabled: true },
            homePageRadioSchedule: { enabled: true },
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
          title={summary?.title}
        />,
      );

      expect(document.querySelectorAll('section h2').length).toBe(1);
    });

    it('should have h3 summary titles when page has multiple curations and a curation title', () => {
      const { summaries } = mundoFixture.data.curations[1];

      render(
        <Curation
          title="2nd Curation"
          visualProminence={NORMAL}
          visualStyle={NONE}
          position={1}
          summaries={summaries}
          curationLength={2}
        />,
      );
      expect(document.querySelectorAll('h3').length).toBe(4);
    });

    it('should have h3 summary titles when page has multiple curations and no curation title and is the first curation - simple curation', () => {
      const { summaries } = mundoFixture.data.curations[0];

      render(
        <Curation
          visualProminence={NORMAL}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={2}
        />,
      );
      expect(document.querySelectorAll('h3').length).toBe(8);
    });

    it('should have h3 summary titles when page has multiple curations and no curation title and is the first curation - hierarchical curation', () => {
      const { summaries } = mundoFixture.data.curations[0];

      render(
        <Curation
          visualProminence={HIGH}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={2}
        />,
      );
      expect(document.querySelectorAll('h3').length).toBe(8);
    });

    it('should have h2 summary titles when page has one curation - simple curation', () => {
      const { summaries } = fixture.data.curations[0];

      render(
        <Curation
          visualProminence={NORMAL}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={1}
        />,
      );
      expect(document.querySelectorAll('h2').length).toBe(24);
      expect(document.querySelectorAll('h3').length).toBe(0);
    });

    it('should have h2 summary titles when page has one curation - hierarchical curation', () => {
      const { summaries } = fixture.data.curations[0];

      render(
        <Curation
          visualProminence={HIGH}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={1}
        />,
      );
      expect(document.querySelectorAll('h2').length).toBe(12);
      expect(document.querySelectorAll('h3').length).toBe(0);
    });

    it('should have visually hidden title text as h2 if it is the first curation of multiple and has a title - simple curation', () => {
      const { summaries } = mundoFixture.data.curations[0];

      render(
        <Curation
          title="First Curation"
          visualProminence={NORMAL}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={6}
          renderVisuallyHiddenH2Title
        />,
      );
      expect(document.querySelectorAll('h2').length).toBe(1); // the visually hidden h2 heading
      expect(document.querySelectorAll('h3').length).toBe(8); // the visible h3 promos
      const subheading = document.querySelector('h2.Subheading');
      expect(subheading).not.toBeInTheDocument(); // no subheading for first curation on a home page
    });

    it('should have visually hidden title text as h2 if it is the first curation of multiple and has a title - hierarchial curation', () => {
      const { summaries } = mundoFixture.data.curations[0];

      render(
        <Curation
          title="First Curation"
          visualProminence={HIGH}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={6}
          renderVisuallyHiddenH2Title
        />,
      );
      expect(document.querySelectorAll('h2').length).toBe(1); // the visually hidden h2 heading
      expect(document.querySelectorAll('h3').length).toBe(8); // the visible h3 promos
      const subheading = document.querySelector('h2.Subheading');
      expect(subheading).not.toBeInTheDocument(); // no subheading for first curation on a home page
    });
    it('should have a subheading as h2 if it is the first curation of multiple and has a title - simple curation', () => {
      const { summaries, title } = mundoFixture.data.curations[0];
      render(
        <Curation
          title={title}
          visualProminence={NORMAL}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={6}
          renderVisuallyHiddenH2Title={false}
        />,
      );

      expect(document.querySelectorAll('h2').length).toBe(1); // the subheading h2
      const subheading = document.querySelector('h2');
      expect(subheading).toBeInTheDocument();
      // Check that the <h2> does NOT have a classname containing 'visuallyHiddenText'
      const classList = Array.from(subheading?.classList || []);
      const hasVisuallyHiddenClass = classList.some(className =>
        className.includes('visuallyHiddenText'),
      );
      expect(hasVisuallyHiddenClass).toBe(false); // Ensure it's not visually hidden
      expect(subheading?.textContent).toBe(title);
    });

    it('should have a subheading as h2 if it is the first curation of multiple and has a title - hierarchical curation', () => {
      const { summaries, title } = mundoFixture.data.curations[0];

      render(
        <Curation
          title={title}
          visualProminence={HIGH}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={6}
          renderVisuallyHiddenH2Title={false}
        />,
      );

      expect(document.querySelectorAll('h2').length).toBe(1); // the subheading h2
      const subheading = document.querySelector('h2');
      expect(subheading).toBeInTheDocument();
      // Check that the <h2> does NOT have a classname containing 'visuallyHiddenText'
      const classList = Array.from(subheading?.classList || []);
      const hasVisuallyHiddenClass = classList.some(className =>
        className.includes('visuallyHiddenText'),
      );
      expect(hasVisuallyHiddenClass).toBe(false); // Ensure it's not visually hidden
      expect(subheading?.textContent).toBe(title);
    });

    it('should not render visually hidden title as h2 if it is the first curation of multiple and does not have a title - simple curation', () => {
      const { summaries } = mundoFixture.data.curations[0];

      render(
        <Curation
          visualProminence={NORMAL}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={6}
          renderVisuallyHiddenH2Title={false}
        />,
      );

      expect(document.querySelectorAll('h2').length).toBe(0);

      const subheading = document.querySelector('h2');

      expect(subheading).not.toBeInTheDocument();
    });

    it('should not render visually hidden title as h2 if it is the first curation of multiple and does not have a title - hierarchical curation', () => {
      const { summaries } = mundoFixture.data.curations[0];

      render(
        <Curation
          visualProminence={HIGH}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={6}
          renderVisuallyHiddenH2Title={false}
        />,
      );

      expect(document.querySelectorAll('h2').length).toBe(0);

      const subheading = document.querySelector('h2');

      expect(subheading).not.toBeInTheDocument();
    });

    it('should not have a subheading or visually hidden text as h2 if it is a topic page with only one curation', () => {
      const { summaries, title } = mundoFixture.data.curations[0];

      render(
        <Curation
          title={title}
          visualProminence={NORMAL}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={1} // Only one curation
          renderVisuallyHiddenH2Title={false}
        />,
      );

      expect(document.querySelectorAll('h2').length).toBe(summaries.length);
      const firstHeading = document.querySelector('h2');
      expect(firstHeading).toBeInTheDocument();
      expect(firstHeading?.textContent).not.toBe(title);
    });

    it('should render the curation title as a link if the title has a link in the data on a topic page', () => {
      const { title, link, summaries } = mundoFixture.data.curations[0];

      render(
        <Curation
          title={title}
          link={link}
          visualProminence={NORMAL}
          visualStyle={NONE}
          position={0}
          summaries={summaries}
          curationLength={6}
          renderVisuallyHiddenH2Title={false}
        />,
      );

      const titleLink = document.querySelector(`a[href="${link}"]`);
      expect(titleLink).toBeInTheDocument();
      expect(titleLink?.textContent).toBe(title);
    });
  });
});
