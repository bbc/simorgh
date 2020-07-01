import { render } from '@testing-library/react';
import * as SectionLabel from '@bbc/psammead-section-label';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { service as newsConfig } from '#lib/config/services/news';
import IndexPageSection from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

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
        path: '/cpsprodpb/0A06/production/image1.jpg',
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
        path: '/cpsprodpb/0A06/production/image2.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 2',
        copyrightHolder: 'Image provider 2',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000002',
    },
    {
      headlines: {
        headline: 'Top Story 3 headline',
      },
      locators: {
        assetUri: 'https://www.bbc.co.uk',
      },
      summary: 'Summary text 3',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image3.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 3',
        copyrightHolder: 'Image provider 3',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000003',
    },
    {
      headlines: {
        headline: 'Top Story 4 headline',
      },
      locators: {
        assetUri: 'https://www.bbc.co.uk',
      },
      summary: 'Summary text 4',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image4.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 4',
        copyrightHolder: 'Image provider 4',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000004',
    },
    {
      headlines: {
        headline: 'Top Story 5 headline',
      },
      locators: {
        assetUri: 'https://www.bbc.co.uk',
      },
      summary: 'Summary text 5',
      timestamp: 1557738768,
      indexImage: {
        path: '/cpsprodpb/0A06/production/image5.jpg',
        height: 1152,
        width: 2048,
        altText: 'Image Alt text 5',
        copyrightHolder: 'Image provider 5',
      },
      id: 'urn:bbc:ares::asset:igbo/testasset-00000005',
    },
  ],
  strapline: {
    name: 'Top Stories',
  },
};

const groupWithLink = {
  type: 'responsive-top-stories-with-links',
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
        path: '/cpsprodpb/0A06/production/image1.jpg',
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
        path: '/cpsprodpb/0A06/production/image2.jpg',
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
    type: 'LINK',
    links: {
      highweb: 'https://www.bbc.com/pidgin/sport',
      desktop: 'https://www.bbc.com/pidgin/sport',
      mobile: 'https://www.bbc.com/pidgin/sport',
      enhancedmobile: 'https://www.bbc.com/pidgin/sport',
    },
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

const usefulLinks = {
  type: 'useful-links',
  title: 'Useful links',
  items: [
    {
      name: 'Ethiopia: Ndị uweojii agba gbuola ndị mmadụ',
      uri: 'https://www.bbc.com/igbo/egwuregwu-49946491',
      contentType: 'Guide',
      assetTypeCode: 'PRO',
      timestamp: 1569321103000,
      type: 'link',
    },
    {
      name: 'Onye isi ala ndị New Zealand dị ime',
      uri: 'https://www.bbc.com/igbo/egwuregwu-49946491',
      contentType: 'Guide',
      assetTypeCode: 'PRO',
      timestamp: 1569321103000,
      type: 'link',
    },
  ],
  strapline: {
    name: 'Useful links',
  },
  semanticGroupName: 'Useful links',
};

const hasOnlyRadioBulletins = {
  type: 'radio-live-streams',
  title: 'Radio Bulletins',
  items: [
    {
      name: 'Igbo TVRadio bulletin',
      summary:
        'This is an Igbo Radio bulletin promo, using a CPS promo for a Radio Bulletin',
      uri: 'https://www.bbc.com/igbo/media-42986440',
      contentType: 'RadioBulletin',
      assetTypeCode: 'PRO',
      timestamp: 1573483162000,
      type: 'link',
      id: 'urn:bbc:ares::asset:igbo/testasset-00000000',
    },
    {
      name: 'Igbo Radio bulletin',
      summary:
        'This is an Igbo Radio bulletin promo, using a CPS promo for a Radio Bulletin with the LIVE button checked',
      uri: 'https://www.bbc.com/igbo/media-42986440',
      contentType: 'RadioBulletin',
      assetTypeCode: 'PRO',
      timestamp: 1573483578000,
      isLive: true,
      type: 'link',
      id: 'urn:bbc:ares::asset:igbo/testasset-00000001',
    },
  ],
  semanticGroupName: 'Radio bulletins only',
  strapline: {
    name: 'Radio bulletins only',
  },
};

const startsWithRadioBulletins = {
  type: 'radio-live-streams',
  title: 'Radio Bulletins',
  items: [
    {
      name: 'Igbo TVRadio bulletin',
      summary:
        'This is an Igbo Radio bulletin promo, using a CPS promo for a Radio Bulletin',
      uri: 'https://www.bbc.com/igbo/media-42986440',
      contentType: 'RadioBulletin',
      assetTypeCode: 'PRO',
      timestamp: 1573483162000,
      type: 'link',
      id: 'urn:bbc:ares::asset:igbo/testasset-00000000',
    },
    {
      name: 'Igbo Radio bulletin',
      summary:
        'This is an Igbo Radio bulletin promo, using a CPS promo for a Radio Bulletin with the LIVE button checked',
      uri: 'https://www.bbc.com/igbo/media-42986440',
      contentType: 'RadioBulletin',
      assetTypeCode: 'PRO',
      timestamp: 1573483578000,
      isLive: true,
      type: 'link',
      id: 'urn:bbc:ares::asset:igbo/testasset-00000001',
    },
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
      id: 'urn:bbc:ares::asset:igbo/testasset-00000002',
    },
    {
      name: 'Igbo Radio bulletin',
      summary:
        'This is an Igbo Radio bulletin promo, using a CPS promo for a Radio Bulletin 2 with the LIVE button checked',
      uri: 'https://www.bbc.com/igbo/media-42986440',
      contentType: 'RadioBulletin',
      assetTypeCode: 'PRO',
      timestamp: 1573483578000,
      isLive: true,
      type: 'link',
      id: 'urn:bbc:ares::asset:igbo/testasset-00000003',
    },
  ],
  semanticGroupName: 'Starts with Radio bulletins',
  strapline: {
    name: 'Starts with Radio bulletins',
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

describe('IndexPageSection Container', () => {
  describe('snapshots', () => {
    beforeEach(() => {
      useContext.mockReturnValue(newsConfig.default);
    });

    afterEach(() => {
      useContext.mockReset();
    });

    shouldMatchSnapshot(
      'should render correctly for canonical',
      <IndexPageSection group={group} sectionNumber={0} />,
    );

    shouldMatchSnapshot(
      'should render correctly with a linking strapline',
      <IndexPageSection group={groupWithLink} sectionNumber={2} />,
    );

    shouldMatchSnapshot(
      'should render without a bar',
      <IndexPageSection group={group} bar={false} sectionNumber={1} />,
    );

    shouldMatchSnapshot(
      'should render with only one item',
      <IndexPageSection group={hasOneItem} sectionNumber={0} />,
    );
  });

  describe('Section Label visuallyHidden prop', () => {
    afterEach(() => {
      SectionLabel.default.mockClear();
    });

    beforeEach(() => {
      jest.spyOn(SectionLabel, 'default');
      useContext.mockReturnValue(newsConfig.default);
    });

    it('should be called with true when sectionNumber === 0', () => {
      render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection group={hasOneItem} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      expect(SectionLabel.default.mock.calls[0][0].visuallyHidden).toEqual(
        true,
      );
    });

    it('should be called with false when sectionNumber !== 0', () => {
      render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection group={hasOneItem} sectionNumber={1} />
        </ServiceContextProvider>,
      );

      expect(SectionLabel.default.mock.calls[0][0].visuallyHidden).toEqual(
        false,
      );
    });
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
          <IndexPageSection group={group} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      expect(container.getElementsByTagName('section')).toHaveLength(1);
      expect(container.getElementsByTagName('h2')).toHaveLength(1);
      expect(container.getElementsByTagName('ul')).toHaveLength(1);

      expect(container.getElementsByTagName('li')).toHaveLength(5);
      expect(container.getElementsByTagName('h3')).toHaveLength(5);
    });

    it('should render with a link when is a linking group', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection group={groupWithLink} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      expect(
        container.querySelectorAll('a[class^=SectionLabelLink'),
      ).toHaveLength(1);
    });

    it('section should have aria-labelledby attribute referring to the id of the label element', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection group={group} sectionNumber={0} />
        </ServiceContextProvider>,
      );
      const section = container.getElementsByTagName('section')[0];
      const label = container.querySelector('span[class^=Title]');

      expect(section.getAttribute('aria-labelledby')).toBeDefined();
      expect(label.id).toBeDefined();
      expect(section.getAttribute('aria-labelledby')).toEqual(label.id);
    });

    it('should render null when there are no items', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection group={hasNoItems} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      // container is a <div> which would contain the rendered elements...
      // IF THERE WERE ANY!
      expect(container.children).toHaveLength(0);
    });

    it('should render null when there is no strapline', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection group={hasNoStrapline} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      // container is a <div> which would contain the rendered elements...
      // IF THERE WERE ANY!
      expect(container.children).toHaveLength(0);
    });

    it('should not render the story promo inside a list when only one item exists', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection group={hasOneItem} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      expect(container.getElementsByTagName('ul')).toHaveLength(0);
      expect(container.getElementsByTagName('li')).toHaveLength(0);
    });

    it('should not lazyload the story promo image if it is a top story', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection group={group} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      const images = container.getElementsByTagName('img');
      const image = images[0];

      // When lazy loading an image, it get placed inside <noscript> and wont be accessible on the DOM
      // Even though we have 2 items we only expect 1 image to be accessible on the DOM
      // The first image being a top story won't be lazyloaded and will be the only image accessible on the DOM
      expect(images).toHaveLength(1);
      expect(image.getAttribute('src')).toEqual(
        'https://ichef.bbci.co.uk/news/660/cpsprodpb/0A06/production/image1.jpg',
      );
    });

    it('should render useful links when the semantic group name is "Useful links"', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection group={usefulLinks} sectionNumber={1} />
        </ServiceContextProvider>,
      );

      expect(container.getElementsByTagName('ul')).toHaveLength(1);
      expect(container.getElementsByTagName('li')).toHaveLength(2);
    });

    it('should render null when there are only radio bulletins', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection group={hasOnlyRadioBulletins} sectionNumber={0} />
        </ServiceContextProvider>,
      );

      expect(container.children).toHaveLength(0);
    });

    it('should render everything after the first non-radio bulletin', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <IndexPageSection
            group={startsWithRadioBulletins}
            sectionNumber={1}
          />
          ,
        </ServiceContextProvider>,
      );

      expect(container.getElementsByTagName('ul')).toHaveLength(1);
      expect(container.getElementsByTagName('li')).toHaveLength(2);
    });
  });
});
