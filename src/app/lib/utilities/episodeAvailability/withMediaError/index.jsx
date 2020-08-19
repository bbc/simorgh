import React from 'react';
import { shape, oneOf } from 'prop-types';
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

withMediaError.propTypes = {
  pageData: shape({
    episodeAvailability: oneOf(Object.values(EPISODE_STATUS)).isRequired,
  }),
};

export default withMediaError;
