import React from 'react';
import { EPISODE_STATUS } from '../episodeStatus';
import ErrorMessage from '../ErrorMessage';

const getErrorComponent = episodeAvailability => errorProps => (
  <ErrorMessage {...errorProps} episodeAvailability={episodeAvailability} />
);

const withMediaError = PageComponent => {
  const MediaErrorComponent = props => {
    const { pageData: { episodeAvailability } = null } = props;
    const mediaIsAvailable =
      episodeAvailability === EPISODE_STATUS.EPISODE_IS_AVAILABLE;

    return (
      <PageComponent
        {...props}
        mediaIsAvailable={mediaIsAvailable}
        MediaError={
          mediaIsAvailable ? () => null : getErrorComponent(episodeAvailability)
        }
      />
    );
  };

  return MediaErrorComponent;
};

export default withMediaError;
