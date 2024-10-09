import React, { useContext } from 'react';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';

import Message from '#app/components/MediaLoader/Message';
import { EPISODE_STATUS } from '..';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const AudioErrorWrapper = styled.div`
  position: relative;
  min-height: 165px;
  margin-bottom: ${GEL_SPACING_QUAD};
`;

const landscapeRatio = '56.25%'; // (9/16)*100 = 16:9
const VideoErrorWrapper = styled.div`
  margin: ${GEL_SPACING_QUIN} 0 ${GEL_SPACING_TRPL};
  padding-top: ${landscapeRatio};
  position: relative;
  overflow: hidden;

  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    margin: ${GEL_SPACING_DBL} -${GEL_SPACING_DBL} 0;
  }
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    margin: ${GEL_SPACING} -${GEL_SPACING} 0;
  }
`;

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
  const { service, translations } = useContext(ServiceContext);
  const Wrapper = skin === 'audio' ? AudioErrorWrapper : VideoErrorWrapper;

  return (
    <Wrapper>
      <Message
        service={service}
        message={getErrorMessage(episodeAvailability, translations)}
      />
    </Wrapper>
  );
};

export default ErrorMessage;
