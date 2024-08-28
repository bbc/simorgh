import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import Banner from './index.amp';

describe('Amp Consent Banner Container', () => {
  it('should correctly render privacy banner - LTR layout', () => {
    const { container } = render(
      <Banner
        type="privacy"
        acceptAction="tap:cookieId.show, privacyId.hide"
        rejectAction="tap:cookieId.show, privacyId.hide"
        hideAction="tap:brandLink.focus, privacy.hide"
        promptId="promptId"
        hidden
      />,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render privacy banner - RTL layout', () => {
    const { container } = render(
      <Banner
        type="privacy"
        acceptAction="tap:cookieId.show, privacyId.hide"
        rejectAction="tap:cookieId.show, privacyId.hide"
        hideAction="tap:brandLink.focus, cookie.hide"
        promptId="promptId"
        hidden
      />,
      { service: 'arabic' },
    );
    expect(container).toMatchSnapshot();
  });
  it('should correctly render cookie banner - LTR layout', () => {
    const { container } = render(
      <Banner
        type="cookie"
        acceptAction="tap:parentId.accept"
        rejectAction="tap:parentId.reject"
        promptId="promptId"
        hidden
      />,
      { service: 'news' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should correctly render cookie banner - RTL layout', () => {
    const { container } = render(
      <Banner
        type="cookie"
        acceptAction="tap:parentId.accept"
        rejectAction="tap:parentId.reject"
        promptId="promptId"
        hidden
      />,
      { service: 'arabic' },
    );
    expect(container).toMatchSnapshot();
  });
});
