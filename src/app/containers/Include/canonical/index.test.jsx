import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CanonicalIncludeContainer from '.';

const fakeMarkup = `<div>Visual Journalism Markup</div><script type="text/javascript" src="localhost/vj.js"></script>`;

describe('CanonicalIncludeContainer', () => {
  beforeEach(() => {
    window.require = { config: jest.fn() };
  });

  afterEach(() => {
    window.require = null;
  });

  it('should not render any HTML when html prop is null', async () => {
    const { container } = render(
      <CanonicalIncludeContainer type="idt2" html={null} />,
    );
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  it('should not render any HTML for an unsupported include type', async () => {
    const { container } = render(
      <CanonicalIncludeContainer html={fakeMarkup} type="idt20" />,
    );
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  const runningIncludeTest = includeType => {
    it(`should add require to the page for ${includeType}`, async () => {
      render(
        <CanonicalIncludeContainer html={fakeMarkup} type={includeType} />,
      );

      await waitFor(() => {
        const scripts = Array.from(document.querySelectorAll('head script'));

        expect(scripts).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              src: `https://news.files.bbci.co.uk/include/vjassets/js/vendor/require-2.1.20b.min.js`,
            }),
            expect.objectContaining({
              text: expect.stringContaining('require.config'),
            }),
          ]),
        );

        expect(scripts).toHaveLength(2);

        expect(window.require.config).toHaveBeenCalledTimes(1);
      });
    });
  };
  runningIncludeTest('vj');
  runningIncludeTest('idt1');

  it(`should add require once for page with multiple vj and idt1 includes`, async () => {
    render(
      <>
        <CanonicalIncludeContainer html={fakeMarkup} type="idt1" />
        <CanonicalIncludeContainer html={fakeMarkup} type="vj" />
        <CanonicalIncludeContainer html={fakeMarkup} type="idt1" />
        <CanonicalIncludeContainer html={fakeMarkup} type="vj" />
      </>,
    );

    await waitFor(() => {
      const scripts = Array.from(document.querySelectorAll('head script'));

      expect(scripts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            src: `https://news.files.bbci.co.uk/include/vjassets/js/vendor/require-2.1.20b.min.js`,
          }),
          expect.objectContaining({
            text: expect.stringContaining('require.config'),
          }),
        ]),
      );

      expect(scripts).toHaveLength(2);

      expect(window.require.config).toHaveBeenCalledTimes(1);
    });
  });

  it(`should not add require to the page for idt2`, async () => {
    render(<CanonicalIncludeContainer html={fakeMarkup} type="idt2" />);

    await waitFor(() => {
      expect(Array.from(document.querySelectorAll('head script'))).toHaveLength(
        0,
      );
      expect(window.require.config).toHaveBeenCalledTimes(0);
    });
  });
});
