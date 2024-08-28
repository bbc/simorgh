import React from 'react';
import path from 'ramda/src/path';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';
import { render } from '#components/react-testing-library-with-providers';
import RelatedContentPromoList from './index';

const promoItems = path(
  ['relatedContent', 'groups', 0, 'promos'],
  pidginPageData.data.article,
);

describe('RelatedContentPromoList', () => {
  it('it renders a list of Story Promos for STY pages', () => {
    const { container } = render(
      <RelatedContentPromoList promoItems={promoItems} dir="ltr" />,
      {
        service: 'pidgin',
        variant: 'default',
        toggles: {
          eventTracking: { enabled: true },
        },
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('it renders a list of Story Promos for MAP pages', () => {
    const { container } = render(
      <RelatedContentPromoList
        promoItems={promoItems}
        dir="ltr"
        isMediaContent
      />,
      {
        service: 'pidgin',
        variant: 'default',
        toggles: {
          eventTracking: { enabled: true },
        },
      },
    );
    expect(container).toMatchSnapshot();
  });
});
