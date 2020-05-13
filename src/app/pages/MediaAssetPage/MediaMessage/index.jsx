import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from 'styled-components';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';

import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

import { MediaMessage } from '@bbc/psammead-media-player';
import { ServiceContext } from '#contexts/ServiceContext';
import { GridItemConstrainedLarge } from '#lib/styledGrid';
import nodeLogger from '#lib/logger.node';
import { NO_TRANSLATION_FOUND } from '#lib/logger.const';

const logger = nodeLogger(__filename);

const landscapeRatio = '56.25%'; // (9/16)*100 = 16:9
const StyledMessageContainer = styled.div`
  padding-top: ${landscapeRatio};
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled(GridItemConstrainedLarge)`
  margin-top: ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING};
    margin-top: ${GEL_SPACING_QUAD};
  }
`;

export default () => {
  const { translations, service } = useContext(ServiceContext);
  const translatedText = path(['media', 'contentExpired'], translations);
  const message = 'This content is no longer available';
  const contentNotAvailableMessage = translatedText || message;
  const isNotTranslated =
    service !== 'news' && contentNotAvailableMessage === message;

  if (isNotTranslated) {
    logger.info(
      JSON.stringify(
        {
          event: NO_TRANSLATION_FOUND,
          message: `No ${service} translation found for "${message}"`,
        },
        null,
        2,
      ),
    );
  }

  return (
    <Wrapper>
      <StyledMessageContainer>
        <MediaMessage service={service} message={contentNotAvailableMessage} />
      </StyledMessageContainer>
    </Wrapper>
  );
};
