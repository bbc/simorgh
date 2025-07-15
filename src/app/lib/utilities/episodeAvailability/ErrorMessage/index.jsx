import React, { use } from 'react';
import pathOr from 'ramda/src/pathOr';

import Message from '#app/components/MediaLoader/Message';
import { EPISODE_STATUS } from '../episodeStatus';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const getErrorMessage = (status, translations) => {
  if (status === EPISODE_STATUS.EPISODE_IS_EXPIRED) {
    return pathOr(
      'This content is no longer available',
      ['media', 'contentExpired'],
      translations,
    );
  }
  return pathOr(
    'This content is not yet available',
    ['media', 'contentNotYetAvailable'],
    translations,
  );
};

const ErrorMessage = ({ episodeAvailability, skin = 'video' }) => {
  const { service, translations } = use(ServiceContext);
  
  const audioWrapperClasses = "relative min-h-[165px] mb-quadruple";
  const videoWrapperClasses = "mt-quintuple mb-triple pt-[56.25%] relative overflow-hidden group-3-max:mt-double group-2-max:m-double group-2-max:-mx-double group-2-max:mt-double group-1-max:m-full group-1-max:-mx-full group-1-max:mt-full";
  
  const wrapperClasses = skin === 'audio' ? audioWrapperClasses : videoWrapperClasses;

  return (
    <div className={wrapperClasses}>
      <Message
        service={service}
        message={getErrorMessage(episodeAvailability, translations)}
      />
    </div>
  );
};

export default ErrorMessage;
