import { Helmet } from 'react-helmet';
import { renderToStaticMarkup } from 'react-dom/server';
import { fireEvent, getByRole } from '@testing-library/react';
import {
  AllTheProviders,
  render,
} from '#app/components/react-testing-library-with-providers';
import LiteMediaLoader from '.';
import loaderScript from './loaderScript';

// The Lite site is server rendered, so parse the markup as a browser would:
// unlike client-side React, the HTML parser keeps <template> children inert.
const renderAsServerHtml = (ui: React.ReactElement) => {
  const page = document.createElement('div');
  page.innerHTML = renderToStaticMarkup(
    <AllTheProviders isLite>{ui}</AllTheProviders>,
  );
  document.body.appendChild(page);

  return page;
};

describe('LiteMediaLoader', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    // eslint-disable-next-line no-underscore-dangle
    delete (window as Window & { __liteMediaLoader?: boolean })
      .__liteMediaLoader;
  });

  it('renders a load button with the media held in an inert template', () => {
    const container = renderAsServerHtml(
      <LiteMediaLoader type="video">
        <iframe title="Video" src="https://example.com/video" />
      </LiteMediaLoader>,
    );

    expect(
      getByRole(container, 'button', { name: /Load Video/ }),
    ).toBeInTheDocument();
    expect(container.querySelector('button svg')).toBeInTheDocument();
    expect(container.querySelector('iframe')).not.toBeInTheDocument();
    expect(
      container.querySelector('template')?.content.querySelector('iframe'),
    ).not.toBeNull();
  });

  it('outputs the loader script once, however many loaders are on the page', () => {
    render(
      <>
        <LiteMediaLoader type="image">
          <span>one</span>
        </LiteMediaLoader>
        <LiteMediaLoader type="embed">
          <span>two</span>
        </LiteMediaLoader>
      </>,
      { isLite: true },
    );

    const { scriptTags } = Helmet.peek();

    expect(scriptTags).toHaveLength(1);
    expect(scriptTags[0].innerHTML).toBe(loaderScript);
  });

  it('swaps the button for the media when clicked', () => {
    const container = renderAsServerHtml(
      <LiteMediaLoader type="image">
        <img alt="Loaded" src="https://example.com/image.jpg" />
      </LiteMediaLoader>,
    );

    expect(container.querySelector('img')).not.toBeInTheDocument();

    // eslint-disable-next-line no-new-func
    new Function(loaderScript)();
    fireEvent.click(getByRole(container, 'button', { name: /Load Image/ }));

    expect(container.querySelector('button')).not.toBeInTheDocument();
    expect(container.querySelector('template')).not.toBeInTheDocument();
    expect(getByRole(container, 'img', { name: 'Loaded' })).toBeInTheDocument();
  });
});
