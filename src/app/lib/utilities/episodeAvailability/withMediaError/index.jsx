import React from 'react';
import { element, shape, oneOf } from 'prop-types';
import { EPISODE_STATUS } from '..';
import ErrorMessage from '../ErrorMessage';

const withMediaError = PageComponent => {
  const MediaErrorComponent = props => {
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

  MediaErrorComponent.propTypes = {
    pageData: shape({
      episodeAvailability: oneOf(Object.values(EPISODE_STATUS)).isRequired,
    }),
  };

  MediaErrorComponent.defaultProps = {
    pageData: null,
  };

  return MediaErrorComponent;
};

withMediaError.propTypes = {
  PageComponent: element,
};
export default withMediaError;
