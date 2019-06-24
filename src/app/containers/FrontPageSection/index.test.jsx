import { render } from '@testing-library/react';
import newsConfig from '../../lib/config/services/news';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import FrontPageSection from '.';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

const React = jest.requireActual('react');

const group = {
  type: 'responsive-top-stories',
  title: 'Top Stories',
  items: [
    {
      headlines: {
        headline: 'Top Story 1 headline',
      },
      locators: {
        assetUri: 'https://www.bbc.co.uk',
      },
      summary: 'Summary text 1',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 1',
        copyrightHolder: 'Image provider 1',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000001',
    },
    {
      headlines: {
        headline: 'Top Story 2 headline',
      },
      locators: {
        assetUri: 'https://www.bbc.co.uk',
      },
      summary: 'Summary text 2',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 2',
        copyrightHolder: 'Image provider 2',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000002',
    },
  ],
  strapline: {
    name: 'Top Stories',
  },
};

const hasNoStrapline = {
  type: 'responsive-no-strapline',
  title: "We don't need no strapline!",
  items: [
    {
      headlines: {
        headline: "Nothing rendered because we didn't set a strapline",
      },
      locators: {
        assetUri: 'https://www.bbc.co.uk',
      },
      summary: 'Oops',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 1',
        copyrightHolder: 'Image provider 1',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000003',
    },
    {
      headlines: {
        headline: 'Top Story 2 headline',
      },
      locators: {
        assetUri: 'https://www.bbc.co.uk',
      },
      summary: 'Summary text 2',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 2',
        copyrightHolder: 'Image provider 2',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000004',
    },
  ],
};

const hasNoItems = {
  type: 'responsive-top-stories',
  title: 'Top Stories',
  items: [],
  strapline: {
    name: 'Top Stories',
  },
};

const hasOneItem = {
  type: 'responsive-top-stories',
  title: 'Top Stories',
  items: [
    {
      headlines: {
        headline: 'Top Story 1 headline',
      },
      locators: {
        assetUri: 'https://www.bbc.co.uk',
      },
      summary: 'Summary text 1',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 1',
        copyrightHolder: 'Image provider 1',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000001',
    },
  ],
  strapline: {
    name: 'Top Stories',
  },
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});
const { useContext } = jest.requireMock('react');

describe('FrontPageSection Container', () => {
  describe('snapshots', () => {
    beforeEach(() => {
      useContext.mockReturnValue(newsConfig);
    });

    afterEach(() => {
      useContext.mockReset();
    });

    shouldShallowMatchSnapshot(
      'should render correctly for canonical',
      <FrontPageSection group={group} sectionNumber={0} />,
    );

    shouldShallowMatchSnapshot(
      'should render without a bar',
      <FrontPageSection group={group} bar={false} sectionNumber={1} />,
    );

    shouldShallowMatchSnapshot(
      'should render with only one item',
      <FrontPageSection group={hasOneItem} sectionNumber={0} />,
    );
  });

  describe('assertions', () => {
    beforeEach(() => {
      useContext.mockImplementation(React.useContext);
    });

    afterEach(() => {
      useContext.mockReset();
    });

    it('should render 1 section, 1 h2, 1 ul, and an li and an h3 for EACH item', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <FrontPageSection group={group} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      expect(container.getElementsByTagName('section')).toHaveLength(1);
      expect(container.getElementsByTagName('h2')).toHaveLength(1);
      expect(container.getElementsByTagName('ul')).toHaveLength(1);

      expect(container.getElementsByTagName('li')).toHaveLength(2);
      expect(container.getElementsByTagName('h3')).toHaveLength(2);
    });

    it('section should have aria-labelledby attribute referring to the id of the label element', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <FrontPageSection group={group} sectionNumber={0} />
        </ServiceContextProvider>,
      );
      const section = container.getElementsByTagName('section')[0];
      const label = container.getElementsByTagName('h2')[0];

      expect(section.getAttribute('aria-labelledby')).toBeDefined();
      expect(label.id).toBeDefined();
      expect(section.getAttribute('aria-labelledby')).toEqual(label.id);
    });

    it('should add styling to visually hide section label when width of screen is less than 600px and sectionNumber === 0', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <FrontPageSection group={group} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      const sectionLabel = container.getElementsByTagName('section')[0]
        .firstChild;

      expect(sectionLabel).toHaveStyleRule('clip-path', 'inset(100%)', {
        media: '(max-width: 37.4375rem)',
      });
    });

    it('should not add styling to visually hide section label when width of screen is less than 600px and sectionNumber !== 0', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <FrontPageSection group={group} sectionNumber={2} />
        </ServiceContextProvider>,
      );

      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
      const sectionLabel = container.getElementsByTagName('section')[0]
        .firstChild;

      expect(sectionLabel).not.toHaveStyleRule('clip-path', 'inset(100%)', {
        media: '(max-width: 37.4375rem)',
      });
    });

    it('should render null when there are no items', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <FrontPageSection group={hasNoItems} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      // container is a <div> which would contain the rendered elements...
      // IF THERE WERE ANY!
      expect(container.children).toHaveLength(0);
    });

    it('should render null when there is no strapline', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <FrontPageSection group={hasNoStrapline} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      // container is a <div> which would contain the rendered elements...
      // IF THERE WERE ANY!
      expect(container.children).toHaveLength(0);
    });

    it('should not render the story promo inside a list when only one item exists', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <FrontPageSection group={hasOneItem} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      expect(container.getElementsByTagName('ul')).toHaveLength(0);
      expect(container.getElementsByTagName('li')).toHaveLength(0);
    });
  });
});
