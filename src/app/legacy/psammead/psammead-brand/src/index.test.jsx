import React, { useRef, useEffect } from 'react';
import {
  suppressPropWarnings,
  setWindowValue,
  resetWindowValue,
} from '#psammead/psammead-test-helpers/src';

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

  describe('Preview Indicator', () => {
    const windowLocation = window.location;

    afterEach(() => {
      resetWindowValue('location', windowLocation);
    });

    it('should only be displayed when the hostname includes preview and req-svc-chain contains MOZART', () => {
      setWindowValue('location', {
        hostname: 'http://localhost-preview.test.bbc.com',
      });

      const { getByText } = render(<Brand />, {
        requestServiceChain: 'MOZART,SIMORGH',
      });

      expect(getByText('⚠️ Mozart')).toBeInTheDocument();
    });

    it.each([
      'http://localhost:7080/pidgin',
      'https://www.test.bbc.com',
      'https://www.bbc.com/pidgin',
    ])(
      'should not be displayed when hostname is %s because hostname does not include preview',
      hostname => {
        setWindowValue('location', {
          hostname,
        });

        const { queryByText } = render(<Brand />, {
          requestServiceChain: 'MOZART,SIMORGH',
        });

        expect(queryByText('⚠️ Mozart')).not.toBeInTheDocument();
      },
    );

    it('should not be displayed when hostname is preview but req-svc-chain does not contain MOZART', () => {
      setWindowValue('location', {
        hostname: 'http://localhost-preview.test.bbc.com',
      });

      const { queryByText } = render(<Brand />, {
        requestServiceChain: 'SIMORGH',
      });

      expect(queryByText('⚠️ Mozart')).not.toBeInTheDocument();
    });
  });
});
