import React, { useEffect, useRef } from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { render } from '@testing-library/react';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
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
  shouldMatchSnapshot(
    'should correctly render for ltr service',
    <ConsentBanner {...baseProps} />,
  );

  shouldMatchSnapshot(
    'should correctly render for rtl service',
    <ConsentBanner {...rtlProps} />,
  );

  describe('with hidden attribute on wrapper', () => {
    const props = {
      hidden: true,
      ...baseProps,
    };

    shouldMatchSnapshot(
      'should correctly render',
      <ConsentBanner {...props} />,
    );
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
  shouldMatchSnapshot(
    'should correctly render',
    <ConsentBannerText dir="ltr" script={latin} service="news">
      We have made some important changes to our Privacy and Cookies Policy and
      we want you to know what this means for you and your data.
    </ConsentBannerText>,
  );
});
