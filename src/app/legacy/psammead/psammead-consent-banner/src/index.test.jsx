import React, { useEffect, useRef } from 'react';
import { render } from '#components/react-testing-library-with-providers';
import arabic from '#components/ThemeProvider/fontScripts/arabic';
import latin from '#components/ThemeProvider/fontScripts/latin';
import { ConsentBanner, ConsentBannerText } from '.';

const baseProps = {
  accept: <button type="button">Accept</button>,
  dir: 'ltr',
  id: 'banner-id',
  reject: <a href="https://foobar.com">Reject</a>,
  script: latin,
  service: 'news',
  text: <p>Hello</p>,
  title: "We've updated our Privacy and Cookies Policy",
};

const rtlProps = {
  accept: <button type="button">قبول</button>,
  dir: 'rtl',
  id: 'banner-id',
  reject: <a href="https://foobar.com">رفض</a>,
  script: arabic,
  service: 'arabic',
  text: <p>مرحبا</p>,
  title: 'عنوان',
};

describe('ConsentBanner', () => {
  it('should correctly render for ltr service', () => {
    const { container } = render(<ConsentBanner {...baseProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should correctly render for rtl service', () => {
    const { container } = render(<ConsentBanner {...rtlProps} />);
    expect(container).toMatchSnapshot();
  });

  describe('with hidden attribute on wrapper', () => {
    const props = {
      hidden: true,
      ...baseProps,
    };

    it('should correctly render', () => {
      const { container } = render(<ConsentBanner {...props} />);
      expect(container).toMatchSnapshot();
    });
  });
});

it('heading should be focusable', () => {
  const { getByText } = render(<ConsentBanner {...baseProps} />);
  const heading = getByText("We've updated our Privacy and Cookies Policy");
  heading.focus();
  expect(document.activeElement).toBe(heading);
});

it('heading should be externally focusable', () => {
  const TestContainer = () => {
    const ref = useRef(null);

    useEffect(() => {
      ref.current.focus();
    });

    return <ConsentBanner {...baseProps} headingRef={ref} />;
  };

  const { getByText } = render(<TestContainer />);

  const heading = getByText("We've updated our Privacy and Cookies Policy");
  expect(document.activeElement).toBe(heading);
});

describe('ConsentBannerText', () => {
  it('should correctly render', () => {
    const { container } = render(
      <ConsentBannerText dir="ltr" script={latin} service="news">
        We have made some important changes to our Privacy and Cookies Policy
        and we want you to know what this means for you and your data.
      </ConsentBannerText>,
    );
    expect(container).toMatchSnapshot();
  });
});
