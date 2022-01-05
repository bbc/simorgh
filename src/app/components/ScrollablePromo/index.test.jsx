import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import {
  threeLinks,
  oneLinkOnly,
  moreThanThreeLinks,
} from './helpers/fixtureData';
import ScrollablePromo from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';

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
          <ScrollablePromo {...rest} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

describe('ScrollablePromo', () => {
  it('should return null if no data is passed', () => {
    const { container } = render(<Component blocks={{}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render max 3 promo items', () => {
    const { getAllByRole } = render(<Component blocks={moreThanThreeLinks} />);
    expect(getAllByRole('listitem').length).toEqual(3);
  });

  it('should render single promo item', () => {
    const { container } = render(<Component blocks={oneLinkOnly} />);
    expect(container.childElementCount).toEqual(1);
  });

  it('should not render a list when there is only one promo', () => {
    const { queryByRole } = render(<Component blocks={oneLinkOnly} />);

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render unordered list if more than 1 item', () => {
    const { queryByRole, getAllByRole } = render(
      <Component blocks={threeLinks} />,
    );
    expect(queryByRole('list')).toBeInTheDocument();
    expect(getAllByRole('listitem').length).toEqual(3);
  });

  shouldMatchSnapshot(
    'it should match a11y snapshot for single card',
    <Component blocks={oneLinkOnly} />,
  );

  shouldMatchSnapshot(
    'it should match a11y snapshot for list',
    <Component blocks={threeLinks} />,
  );
});
