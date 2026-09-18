import InlineLink from '.';
import { render, screen } from '../react-testing-library-with-providers';
import styles from './index.module.scss';

const setCurrentLocation = (location: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore  */
  delete window.location;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore  */
  window.location = new URL(location);
};

describe('InlineLink', () => {
  it('should render the inline link in an anchor element with correct href attribute', () => {
    render(
      <InlineLink to="/mundo/articles/ce42wzqr2mko" text="Hello World!" />,
    );

    const anchorEl = screen.getByText('Hello World!');

    expect(anchorEl.nodeName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', '/mundo/articles/ce42wzqr2mko');
    expect(anchorEl).toHaveClass(styles.self);
  });

  it.each`
    to                                | currentLocation
    ${'/'}                            | ${'https://localhost'}
    ${'/'}                            | ${'https://bbc.com'}
    ${'/mundo/articles/ce42wzqr2mko'} | ${'https://bbc.com'}
    ${'mundo/articles/ce42wzqr2mko'}  | ${'https://bbc.com'}
    ${'/russian'}                     | ${'https://bbc.com'}
    ${'/ukrainian/features-62913090'} | ${'https://www.bbc.com'}
    ${'/korean/features-62910648'}    | ${'https://bbc.com'}
    ${'/news'}                        | ${'https://www.bbc.co.uk'}
    ${'/news/live/uk-62902778'}       | ${'https://bbc.co.uk'}
    ${'/russian'}                     | ${'https://www.bbcrussian.com'}
    ${'/russan'}                      | ${'https://bbcrussian.com'}
  `(
    'should render the internal inline link without an aria-label when navigating to "$to" from "$currentLocation"',
    ({ to, currentLocation }) => {
      setCurrentLocation(currentLocation);

      render(<InlineLink to={to} text="Hello World!" />);

      expect(screen.getByText('Hello World!')).not.toHaveAttribute(
        'aria-label',
      );
    },
  );

  it.each`
    service           | variant      | expected
    ${'afaanoromoo'}  | ${'default'} | ${'Google alaan'}
    ${'afrique'}      | ${'default'} | ${'Google, externe'}
    ${'amharic'}      | ${'default'} | ${'Google, ውጫዊ'}
    ${'arabic'}       | ${'default'} | ${'Google، خارجي '}
    ${'archive'}      | ${'default'} | ${'Google, external'}
    ${'azeri'}        | ${'default'} | ${'Google, BBC-dən kənar'}
    ${'bengali'}      | ${'default'} | ${'Google, বাইরের'}
    ${'burmese'}      | ${'default'} | ${'Google, ပြင်ပစာမျက်နှာ'}
    ${'cymrufyw'}     | ${'default'} | ${'Google, dolen allanol'}
    ${'gahuza'}       | ${'default'} | ${'Google, bivuye ahandi'}
    ${'gujarati'}     | ${'default'} | ${'Google, બહારની'}
    ${'hausa'}        | ${'default'} | ${'Google, waje'}
    ${'hindi'}        | ${'default'} | ${'Google, बाहरी'}
    ${'igbo'}         | ${'default'} | ${'Google, na mpụta'}
    ${'indonesia'}    | ${'default'} | ${'Google, eksternal'}
    ${'japanese'}     | ${'default'} | ${'Google は外部ページです'}
    ${'korean'}       | ${'default'} | ${'Google, 외부 사이트'}
    ${'kyrgyz'}       | ${'default'} | ${'Google, баракчалар'}
    ${'marathi'}      | ${'default'} | ${'Google, बाहेर'}
    ${'mundo'}        | ${'default'} | ${'Google, externo'}
    ${'naidheachdan'} | ${'default'} | ${'Google, taobh a-muigh'}
    ${'nepali'}       | ${'default'} | ${'Google, बाह्य'}
    ${'news'}         | ${'default'} | ${'Google, external'}
    ${'pashto'}       | ${'default'} | ${'Google، بهرنی'}
    ${'persian'}      | ${'default'} | ${'Google، خارجی'}
    ${'pidgin'}       | ${'default'} | ${'Google, outside'}
    ${'portuguese'}   | ${'default'} | ${'Google, externo'}
    ${'punjabi'}      | ${'default'} | ${'Google, ਬਾਹਰੀ'}
    ${'russian'}      | ${'default'} | ${'Google, внешняя'}
    ${'scotland'}     | ${'default'} | ${'Google, external'}
    ${'sport'}        | ${'default'} | ${'Google, external'}
    ${'sinhala'}      | ${'default'} | ${'Google, බාහිර'}
    ${'somali'}       | ${'default'} | ${'Google, kale'}
    ${'swahili'}      | ${'default'} | ${'Google, ya nje'}
    ${'tamil'}        | ${'default'} | ${'Google, வெளி'}
    ${'telugu'}       | ${'default'} | ${'Google, ఇతర'}
    ${'thai'}         | ${'default'} | ${'Google, จากภายนอก'}
    ${'tigrinya'}     | ${'default'} | ${'Google, ደጋዊ'}
    ${'serbian'}      | ${'cyr'}     | ${'Google, спољна'}
    ${'serbian'}      | ${'lat'}     | ${'Google, spoljna'}
    ${'turkce'}       | ${'default'} | ${'Google, dış'}
    ${'ukchina'}      | ${'simp'}    | ${'Google, 外部'}
    ${'ukchina'}      | ${'trad'}    | ${'Google, 外部'}
    ${'ukrainian'}    | ${'default'} | ${'Google, зовнішнє'}
    ${'urdu'}         | ${'default'} | ${'Google، بیرو'}
    ${'uzbek'}        | ${'cyr'}     | ${'Google, ташқи'}
    ${'uzbek'}        | ${'lat'}     | ${'Google, tashqi'}
    ${'vietnamese'}   | ${'default'} | ${'Google, bên ngoài'}
    ${'yoruba'}       | ${'default'} | ${'Google, ìta'}
    ${'zhongwen'}     | ${'simp'}    | ${'Google, 外部'}
    ${'zhongwen'}     | ${'trad'}    | ${'Google, 外部'}
  `(
    'should render the external inline link with a localised "external" message in the aria-label for the $service service',
    ({ service, variant, expected }) => {
      render(<InlineLink to="https://google.com" text="Google" />, {
        service,
        variant,
      });

      expect(screen.getByText('Google')).toHaveAttribute(
        'aria-label',
        expected,
      );
    },
  );

  it.each`
    size          | expected
    ${'atlas'}    | ${'var(--font-size-atlas-group-a, inherit)'}
    ${'elephant'} | ${'var(--font-size-elephant-group-a, inherit)'}
    ${'imperial'} | ${'var(--font-size-imperial-group-a, inherit)'}
    ${'royal'}    | ${'var(--font-size-royal-group-a, inherit)'}
    ${'foolscap'} | ${'var(--font-size-foolscap-group-a, inherit)'}
    ${'canon'}    | ${'var(--font-size-canon-group-a, inherit)'}
  `('should apply provided font size ', ({ size, expected }) => {
    render(
      <InlineLink
        to="/mundo/articles/ce42wzqr2mko"
        text="Hello World!"
        size={size}
      />,
    );

    const inlineLink = screen.getByText('Hello World!');

    expect(
      inlineLink.style.getPropertyValue('--gel-typography-font-size-group-a'),
    ).toBe(expected);
  });

  it('should pass font variant custom properties to the rendered link', () => {
    render(
      <InlineLink
        to="/mundo/articles/ce42wzqr2mko"
        text="Hello World!"
        fontVariant="sansBold"
      />,
    );

    const inlineLink = screen.getByText('Hello World!');

    expect(
      inlineLink.style.getPropertyValue('--gel-typography-font-family'),
    ).toBeTruthy();
    expect(
      inlineLink.style.getPropertyValue('--gel-typography-font-style'),
    ).toBeTruthy();
    expect(
      inlineLink.style.getPropertyValue('--gel-typography-font-weight'),
    ).toBeTruthy();
  });
});
