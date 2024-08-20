import React, { useRef, useEffect } from 'react';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { POSTBOX, WHITE } from '../../../../components/ThemeProvider/palette';
import { render } from '../../../../components/react-testing-library-with-providers';
import Brand from '.';

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
  suppressPropWarnings(['linkId', 'StyledBrand', 'null']);
  suppressPropWarnings(['linkId', 'LocalisedBrandName', 'null']);

  it('should render correctly with link provided', () => {
    const { container } = render(
      <Brand
        product="Default Brand Name"
        serviceLocalisedName="Service"
        svgHeight={24}
        maxWidth={280}
        minWidth={180}
        svg={svg}
        url="https://www.bbc.co.uk/news"
        backgroundColour={POSTBOX}
        logoColour={WHITE}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with link not provided', () => {
    const { container } = render(
      <Brand
        product="Default Brand Name"
        serviceLocalisedName="Service"
        svg={svg}
        svgHeight={24}
        maxWidth={280}
        minWidth={180}
        backgroundColour={POSTBOX}
        logoColour={WHITE}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with no service Localised Name', () => {
    const { container } = render(
      <Brand
        product="BBC News"
        svg={svg}
        svgHeight={24}
        maxWidth={280}
        minWidth={180}
        backgroundColour={POSTBOX}
        logoColour={WHITE}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with transparent borders', () => {
    const { container } = render(
      <Brand
        product="BBC News"
        svg={svg}
        svgHeight={24}
        maxWidth={280}
        minWidth={180}
        borderTop
        borderBottom
        backgroundColour={POSTBOX}
        logoColour={WHITE}
      />,
    );
    expect(container).toMatchSnapshot();
  });

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
          backgroundColour={POSTBOX}
          logoColour={WHITE}
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
          backgroundColour={POSTBOX}
          logoColour={WHITE}
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
          backgroundColour={POSTBOX}
          logoColour={WHITE}
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
            backgroundColour={POSTBOX}
            logoColour={WHITE}
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
          backgroundColour={POSTBOX}
          logoColour={WHITE}
          linkId="brandLink"
        />,
      );

      const brandLink = container.querySelector('#brandLink');
      expect(brandLink).toBe(container.querySelector('a'));
    });
  });
});
