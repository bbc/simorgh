import React, { useContext } from 'react';
import { oneOf } from 'prop-types';
import styled from 'styled-components';
import pathOr from 'ramda/src/pathOr';
import { MediaMessage } from '@bbc/psammead-media-player';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';

import { ServiceContext } from '../../../contexts/ServiceContext';
import { EPISODE_STATUS } from '.';

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
      [['media', 'contentExpired']],
      translations,
    );
  }
  return pathOr(
    'This content is not yet available',
    ['media', 'contentNotYetAvailable'],
    translations,
  );
};

const ErrorMessage = ({ episodeAvailability, skin }) => {
  const { service, translations } = useContext(ServiceContext);
  const Wrapper = skin === 'audio' ? AudioErrorWrapper : VideoErrorWrapper;

  return (
    <Wrapper>
      <MediaMessage
        service={service}
        message={getErrorMessage(episodeAvailability, translations)}
      />
    </Wrapper>
  );
};

ErrorMessage.propTypes = {
  episodeAvailability: oneOf(Object.values(EPISODE_STATUS)).isRequired,
  skin: oneOf('audio', 'video'),
};

ErrorMessage.defaultProps = {
  skin: 'video',
};

const withMediaError = PageComponent => props => {
  const {
    pageData: { episodeAvailability },
  } = props;

  console.log('props', props);

  return (
    <PageComponent
      {...props}
      mediaIsAvailable={
        episodeAvailability === EPISODE_STATUS.EPISODE_IS_AVAILABLE
      }
      MediaError={({ skin }) => (
        <ErrorMessage episodeAvailability={episodeAvailability} skin={skin} />
      )}
    />
  );
};

export default withMediaError;
