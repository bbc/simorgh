import React from 'react';
import { EPISODE_STATUS } from '..';
import ErrorMessage from '../ErrorMessage';

const withMediaError = PageComponent => props => {
  const {
    pageData: { episodeAvailability },
  } = props;

  const mediaIsAvailable =
    episodeAvailability === EPISODE_STATUS.EPISODE_IS_AVAILABLE;

  return (
    <PageComponent
      {...props}
      mediaIsAvailable={mediaIsAvailable}
      MediaError={({ skin }) => (
        <ErrorMessage episodeAvailability={episodeAvailability} skin={skin} />
      )}
    />
  );
};

export default withMediaError;
