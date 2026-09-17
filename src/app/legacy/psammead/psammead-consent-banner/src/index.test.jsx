import { useEffect, useRef } from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../../../components/react-testing-library-with-providers';
import { ConsentBanner, ConsentBannerText } from '.';

const baseProps = {
  accept: <button type="button">Accept</button>,
  dir: 'ltr',
  id: 'banner-id',
  reject: <a href="https://foobar.com">Reject</a>,
  service: 'news',
  text: <p>Hello</p>,
  title: "We've updated our Privacy and Cookies Policy",
};

const rtlProps = {
  accept: <button type="button">قبول</button>,
  dir: 'rtl',
  id: 'banner-id',
  reject: <a href="https://foobar.com">رفض</a>,
  service: 'arabic',
  text: <p>مرحبا</p>,
  title: 'عنوان',
};

describe('ConsentBanner', () => {
  it('should correctly render for ltr service', () => {
    render(<ConsentBanner {...baseProps} />);
    expect(
      screen.getByText("We've updated our Privacy and Cookies Policy"),
    ).toBeInTheDocument();
  });

  it('should correctly render for rtl service', () => {
    render(<ConsentBanner {...rtlProps} />, { service: rtlProps.service });
    expect(screen.getByText('عنوان')).toBeInTheDocument();
    expect(
      screen.getByText('عنوان').closest('[dir="rtl"]'),
    ).toBeInTheDocument();
  });

  describe('with hidden attribute on wrapper', () => {
    const props = { hidden: true, ...baseProps };

    it('should correctly render', () => {
      render(<ConsentBanner {...props} />);
      expect(
        screen.getByText("We've updated our Privacy and Cookies Policy"),
      ).toBeInTheDocument();
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
    render(
      <ConsentBannerText dir="ltr">
        We have made some important changes to our Privacy and Cookies Policy
        and we want you to know what this means for you and your data.
      </ConsentBannerText>,
    );
    expect(
      screen.getByText(
        /We have made some important changes to our Privacy and Cookies Policy/,
      ),
    ).toBeInTheDocument();
  });
});
