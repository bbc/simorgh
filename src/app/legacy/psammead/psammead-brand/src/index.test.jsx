import React, { useRef, useEffect } from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { render } from '@testing-library/react';
import { C_POSTBOX, C_WHITE } from '#psammead/psammead-styles/src/colours';
import ScriptLink from '#psammead/psammead-script-link/src';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import Brand from '.';
import SkipLink from './SkipLink';

const svg = {
  group: (
    <g fillRule="evenodd">
      <path d="M84.32" />
    </g>
  ),
  viewbox: {
    height: 24,
    width: 167.95,
  },
  ratio: 6.9979,
};

describe('Brand', () => {
  shouldMatchSnapshot(
    'should render correctly with link provided',
    <Brand
      product="Default Brand Name"
      serviceLocalisedName="Service"
      svgHeight={24}
      maxWidth={280}
      minWidth={180}
      svg={svg}
      url="https://www.bbc.co.uk/news"
      backgroundColour={C_POSTBOX}
      logoColour={C_WHITE}
    />,
  );

  shouldMatchSnapshot(
    'should render correctly with link not provided',
    <Brand
      product="Default Brand Name"
      serviceLocalisedName="Service"
      svg={svg}
      svgHeight={24}
      maxWidth={280}
      minWidth={180}
      backgroundColour={C_POSTBOX}
      logoColour={C_WHITE}
    />,
  );

  shouldMatchSnapshot(
    'should render correctly with no service Localised Name',
    <Brand
      product="BBC News"
      svg={svg}
      svgHeight={24}
      maxWidth={280}
      minWidth={180}
      backgroundColour={C_POSTBOX}
      logoColour={C_WHITE}
    />,
  );

  shouldMatchSnapshot(
    'should render correctly with transparent borders',
    <Brand
      product="BBC News"
      svg={svg}
      svgHeight={24}
      maxWidth={280}
      minWidth={180}
      borderTop
      borderBottom
      backgroundColour={C_POSTBOX}
      logoColour={C_WHITE}
    />,
  );

  describe('assertions - visually hidden text', () => {
    it('should have role of text when serviceLocalisedName is provided', () => {
      const { container } = render(
        <Brand
          product="Default Brand Name"
          serviceLocalisedName="Service"
          svgHeight={24}
          maxWidth={280}
          minWidth={180}
          svg={svg}
          url="https://www.bbc.co.uk/news"
          backgroundColour={C_POSTBOX}
          logoColour={C_WHITE}
        />,
      );

      expect(container.querySelector('span').getAttribute('role')).toEqual(
        'text',
      );
    });

    it('should not have role of text when serviceLocalisedName is not provided', () => {
      const { container } = render(
        <Brand
          product="Default Brand Name"
          svgHeight={24}
          maxWidth={280}
          minWidth={180}
          svg={svg}
          url="https://www.bbc.co.uk/news"
          backgroundColour={C_POSTBOX}
          logoColour={C_WHITE}
        />,
      );

      expect(container.querySelector('span').getAttribute('role')).toBeNull();
    });

    it('should add extra props passed to the component', () => {
      const { container } = render(
        <Brand
          product="Default Brand Name"
          svgHeight={24}
          maxWidth={280}
          minWidth={180}
          svg={svg}
          url="https://www.bbc.co.uk/news"
          backgroundColour={C_POSTBOX}
          logoColour={C_WHITE}
          data-brand="header"
        />,
      );

      expect(container.querySelector('div').getAttribute('data-brand')).toEqual(
        'header',
      );
    });

    it('should let the brand link be focussed with a ref', () => {
      const TestComponent = () => {
        const brandRef = useRef(null);

        useEffect(() => {
          brandRef.current?.querySelector('a')?.focus();
        }, []);

        return (
          <Brand
            product="Default Brand Name"
            svgHeight={24}
            maxWidth={280}
            minWidth={180}
            svg={svg}
            url="https://www.bbc.co.uk/news"
            backgroundColour={C_POSTBOX}
            logoColour={C_WHITE}
            data-brand="header"
            ref={brandRef}
          />
        );
      };
      const initialFocus = document.activeElement;
      const { container } = render(<TestComponent />);
      const brand = container.querySelector('a');

      expect(document.activeElement).toBe(brand);
      expect(document.activeElement).not.toBe(initialFocus);
    });

    it('should render brand link with id where linkId and url props are provided', () => {
      const { container } = render(
        <Brand
          product="BBC News"
          svg={svg}
          url="https://www.bbc.co.uk/news"
          svgHeight={24}
          maxWidth={280}
          minWidth={180}
          borderTop
          borderBottom
          backgroundColour={C_POSTBOX}
          logoColour={C_WHITE}
          linkId="brandLink"
        />,
      );

      const brandLink = container.querySelector('#brandLink');
      expect(brandLink).toBe(container.querySelector('a'));
    });

    it('should render script, frontpage and skip to content links', () => {
      const scriptLinkComponent = (
        <ScriptLink
          script={latin}
          service="serbian"
          href="https://www.bbc.com/serbian/lat"
        >
          Lat
        </ScriptLink>
      );

      const skipLink = (
        <SkipLink service="news" script={latin} href="#content">
          Skip to content
        </SkipLink>
      );

      const { container } = render(
        <Brand
          product="Default Brand Name"
          svgHeight={24}
          maxWidth={280}
          minWidth={180}
          svg={svg}
          url="https://www.bbc.co.uk/news"
          backgroundColour={C_POSTBOX}
          logoColour={C_WHITE}
          skipLink={skipLink}
          data-brand="header"
          scriptLink={scriptLinkComponent}
        />,
      );

      const links = container.querySelectorAll('a');
      expect(links).toHaveLength(3);

      const frontpageLink = links[0];
      expect(frontpageLink.getAttribute('href')).toEqual(
        'https://www.bbc.co.uk/news',
      );
      expect(frontpageLink.textContent).toEqual('Default Brand Name');

      const skipToContentLink = links[1];
      expect(skipToContentLink.getAttribute('href')).toEqual('#content');
      expect(skipToContentLink.textContent).toEqual('Skip to content');

      const scriptLink = links[2];
      expect(scriptLink.getAttribute('href')).toEqual(
        'https://www.bbc.com/serbian/lat',
      );
      expect(scriptLink.textContent).toEqual('Lat');
    });
  });
});
