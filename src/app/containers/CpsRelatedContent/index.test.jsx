import React from 'react';
import { render } from '@testing-library/react';
import path from 'ramda/src/path';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';

import CpsRelatedContent from '.';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

// eslint-disable-next-line react/prop-types
const renderRelatedContent = ({ content }) => {
  return render(
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={false}
        pageType="MAP"
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <CpsRelatedContent content={content} />
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

describe('CpsRelatedContent', () => {
  it('should render Story Promo components when given appropriate data', () => {
    const promos = path(
      ['relatedContent', 'groups', 0, 'promos'],
      pidginPageData,
    );
    expect(promos.length).toBe(3);

    const { asFragment } = renderRelatedContent({ content: promos });

    expect(document.querySelectorAll(`li[class^='StoryPromoLi']`).length).toBe(
      promos.length,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
