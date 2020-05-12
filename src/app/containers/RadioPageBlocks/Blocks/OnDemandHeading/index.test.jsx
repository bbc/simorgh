import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render, getByText, getByRole } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import OnDemandHeading from '.';

describe('AudioPlayer blocks OnDemandHeading', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider service="news">
      <OnDemandHeading
        brandTitle="Dunia Pagi Ini"
        releaseDateTimeStamp={1587945600000}
        uuid="uuid"
        idAttr="content"
      />
    </ServiceContextProvider>,
  );

  it('should have semantic h1 with child span with role attribute = text so that screen readers read the BrandTitle and Datestamp in one go', () => {
    render(
      <ServiceContextProvider service="news">
        <OnDemandHeading
          brandTitle="Dunia Pagi Ini"
          releaseDateTimeStamp={1587945600000}
          uuid="uuid"
          idAttr="content"
        />
      </ServiceContextProvider>,
    );

    const outerH1 = document.querySelector('h1');
    const spanWithAriaRoleText = getByRole(outerH1, 'text');
    const brandTitle = getByText(spanWithAriaRoleText, 'Dunia Pagi Ini');

    expect(outerH1).toContainElement(spanWithAriaRoleText);
    expect(spanWithAriaRoleText).toContainElement(brandTitle);
  });

  it('should have visually hidden comma so screenreaders pause when reading', () => {});
});
