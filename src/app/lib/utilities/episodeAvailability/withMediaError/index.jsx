import React from 'react';
import { EPISODE_STATUS } from '..';
import ErrorMessage from '../ErrorMessage';

const withMediaError = PageComponent => props => {
  const {
    pageData: { episodeAvailability },
  } = props;

  const mediaIsAvailable =
    episodeAvailability === EPISODE_STATUS.EPISODE_IS_AVAILABLE;

  const ErrorComponent = errorProps => (
    <ErrorMessage {...errorProps} episodeAvailability={episodeAvailability} />
  );

  return (
    <PageComponent
      {...props}
      mediaIsAvailable={mediaIsAvailable}
      MediaError={mediaIsAvailable ? () => null : ErrorComponent}
    />
  );
};

export default withMediaError;
