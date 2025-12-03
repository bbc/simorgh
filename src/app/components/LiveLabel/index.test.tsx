import React from 'react';
import { render } from '../react-testing-library-with-providers';
import LiveLabel from '.';

describe('LiveLabel', () => {
  it('should render correctly with localised live text', () => {
    const { container } = render(<LiveLabel />, {
      service: 'pidgin',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with English live text', () => {
    const { container } = render(<LiveLabel />, {
      service: 'russian',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with English live text and children', () => {
    const { container } = render(<LiveLabel> this is a headline </LiveLabel>, {
      service: 'news',
    });
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with custom offscreen text', () => {
    const { container } = render(<LiveLabel offScreenText="Watch Live" />);
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for RTL service', () => {
    const { container } = render(<LiveLabel />, {
      service: 'arabic',
    });
    expect(container).toMatchSnapshot();
  });

  describe('Screenreader Text', () => {
    it.each`
      service      | offScreenText               | children                                | expectedAriaHiddenText | expectedScreenReaderText
      ${'pidgin'}  | ${undefined}                | ${undefined}                            | ${undefined}           | ${'As E Dey Happen'}
      ${'pidgin'}  | ${'Pidgin Offscreen Text'}  | ${undefined}                            | ${'As E Dey Happen'}   | ${' Pidgin Offscreen Text'}
      ${'pidgin'}  | ${undefined}                | ${(<p>Pidgin Live Promo Headline</p>)}  | ${undefined}           | ${'As E Dey Happen, Pidgin Live Promo Headline'}
      ${'pidgin'}  | ${'Pidgin Offscreen Text'}  | ${(<p>Pidgin Live Promo Headline</p>)}  | ${'As E Dey Happen'}   | ${' Pidgin Offscreen Text, Pidgin Live Promo Headline'}
      ${'russian'} | ${undefined}                | ${undefined}                            | ${'LIVE'}              | ${' Live'}
      ${'russian'} | ${'Russian Offscreen Text'} | ${undefined}                            | ${'LIVE'}              | ${' Russian Offscreen Text'}
      ${'russian'} | ${undefined}                | ${(<p>Russian Live Promo Headline</p>)} | ${'LIVE'}              | ${' Live, Russian Live Promo Headline'}
      ${'russian'} | ${'Russian Offscreen Text'} | ${(<p>Russian Live Promo Headline</p>)} | ${'LIVE'}              | ${' Russian Offscreen Text, Russian Live Promo Headline'}
    `(
      'should be |$expectedScreenReaderText| for $service service when offScreenText = $offScreenText and children = $children',
      ({
        service,
        offScreenText,
        children,
        expectedAriaHiddenText,
        expectedScreenReaderText,
      }) => {
        const { getByRole } = render(
          <LiveLabel offScreenText={offScreenText}>{children}</LiveLabel>,
          {
            service,
          },
        );

        const liveLabelElement = getByRole('text');

        const ariaHiddenTextElement =
          liveLabelElement.querySelector(`[aria-hidden="true"]`);

        if (ariaHiddenTextElement) {
          liveLabelElement.removeChild(ariaHiddenTextElement);

          expect(ariaHiddenTextElement.textContent).toBe(
            expectedAriaHiddenText,
          );
        }

        expect(liveLabelElement.textContent).toBe(expectedScreenReaderText);
      },
    );
  });
});
