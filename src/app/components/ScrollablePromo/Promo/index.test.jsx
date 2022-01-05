import React from 'react';
import { render } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PromoSingleBlock } from '../helpers/fixtureData';
import Promo from '.';

/* eslint-disable react/prop-types */
const Component = ({ service = 'pidgin', variant, ...rest }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <RequestContextProvider
        isAmp={false}
        service={service}
        pathname="/"
        pageType={ARTICLE_PAGE}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: false },
          }}
        >
          <Promo {...rest} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

describe('ScrollablePromo', () => {
  it('should render a link', () => {
    const { queryByRole } = render(<Component block={PromoSingleBlock} />);
    expect(queryByRole('link')).toBeInTheDocument();
  });
});
