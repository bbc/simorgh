import React from 'react';
import { render } from '@testing-library/react';
import withMediaError from '.';
import { EPISODE_STATUS } from '../episodeStatus';

jest.mock('../ErrorMessage', () => () => 'Mocked Error Message Component');

const FixtureComponent = ({ mediaIsAvailable, MediaError }) => (
  <>
    <span>{mediaIsAvailable ? 'Media Available' : 'Media Unavailable'}</span>
    <MediaError />
  </>
);

const EnhancedComponent = withMediaError(FixtureComponent);

const mediaAvailablePageData = {
  episodeAvailability: EPISODE_STATUS.EPISODE_IS_AVAILABLE,
};
const mediaUnavailablePageData = {
  episodeAvailability: EPISODE_STATUS.EPISODE_IS_EXPIRED,
};

describe(`episodeAvailability - withMediaError`, () => {
  it('should provide the correct enhancements when media is available', () => {
    const { getByText, queryByText } = render(
      <EnhancedComponent pageData={mediaAvailablePageData} />,
    );

    expect(getByText('Media Available')).toBeInTheDocument();
    expect(
      queryByText('Mocked Error Message Component'),
    ).not.toBeInTheDocument();
  });

  it('should provide the correct enhancements when media is not available', () => {
    const { getByText } = render(
      <EnhancedComponent pageData={mediaUnavailablePageData} />,
    );

    expect(getByText('Media Unavailable')).toBeInTheDocument();
    expect(getByText('Mocked Error Message Component')).toBeInTheDocument();
  });
});
