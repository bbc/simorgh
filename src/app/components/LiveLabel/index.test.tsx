import { render, screen } from '../react-testing-library-with-providers';
import LiveLabel from '.';

describe('LiveLabel', () => {
  it('should render correctly with localised live text', () => {
    render(<LiveLabel />, {
      service: 'pidgin',
    });

    expect(screen.getByRole('text')).toHaveTextContent('As E Dey Happen');
  });

  it('should render correctly with English live text', () => {
    render(<LiveLabel />, {
      service: 'russian',
    });

    const liveLabel = screen.getByRole('text');

    expect(liveLabel.querySelector('[aria-hidden="true"]')).toHaveTextContent(
      'LIVE',
    );
    expect(liveLabel).toHaveTextContent('Live');
  });

  it('should render correctly with English live text and children', () => {
    render(<LiveLabel> this is a headline </LiveLabel>, {
      service: 'news',
    });

    expect(screen.getByRole('text')).toHaveTextContent('this is a headline');
  });

  it('should render correctly with custom offscreen text', () => {
    render(<LiveLabel offScreenText="Watch Live" />);

    expect(screen.getByRole('text')).toHaveTextContent('Watch Live');
  });

  it('should correctly render for RTL service', () => {
    render(<LiveLabel />, {
      service: 'arabic',
    });

    const liveLabel = screen.getByRole('text');

    expect(liveLabel).toHaveTextContent('مباشر');
    expect(liveLabel.querySelector('[dir="rtl"]')).toBeInTheDocument();
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
