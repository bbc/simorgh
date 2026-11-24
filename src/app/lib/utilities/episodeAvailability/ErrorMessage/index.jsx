import { use } from 'react';
import pathOr from 'ramda/src/pathOr';

import Message from '#app/components/MediaLoader/Message';
import { EPISODE_STATUS } from '../episodeStatus';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import styles from './index.module.scss';

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

  return (
    <div
      className={
        skin === 'audio' ? styles.audioErrorWrapper : styles.videoErrorWrapper
      }
    >
      <Message
        service={service}
        message={getErrorMessage(episodeAvailability, translations)}
      />
    </div>
  );
};

export default ErrorMessage;
