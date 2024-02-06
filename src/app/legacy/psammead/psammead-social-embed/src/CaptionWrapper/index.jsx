import React, { useContext } from 'react';
import { node, string } from 'prop-types';
import styled from '@emotion/styled';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_BREVIER } from '#psammead/gel-foundations/src/typography';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { RequestContext } from '#contexts/RequestContext';
import { ARTICLE_PAGE, LIVE_PAGE } from '#app/routes/utils/pageTypes';
import { visuallyHiddenStyle } from '../../../../../lib/styles.const';
import { GREY_6, WHITE } from '../../../../../components/ThemeProvider/palette';

const Container = styled.div`
  margin: 0;
  background-color: ${({ isTransparentPage }) =>
    props =>
      isTransparentPage ? 'transparent' : props.theme.palette.BLACK};
`;

const WarningText = styled.small`
  ${({ service }) => getSansRegular(service)}
  ${GEL_BREVIER}
  display: block;

  ${({ isTransparentPage, isLive }) => `
    color: ${isTransparentPage ? GREY_6 : WHITE};
    padding: ${isTransparentPage ? `${GEL_SPACING} 0` : GEL_SPACING};
    ${isLive ? 'padding-bottom: 0;' : ''}
  `}

  > span {
    ${visuallyHiddenStyle}
  }
`;

const CaptionWrapper = ({
  children,
  service,
  text,
  additionalText,
  descById,
}) => {
  const { pageType } = useContext(RequestContext);
  const isLive = pageType === LIVE_PAGE;
  const isTransparentPage = pageType === ARTICLE_PAGE || isLive;

  return (
    <Container isTransparentPage={isTransparentPage}>
      {children}
      <WarningText
        {...(descById && { id: descById })}
        isTransparentPage={isTransparentPage}
        isLive={isLive}
        service={service}
      >
        {`${text}${additionalText ? ` ${additionalText}` : ''}`}
      </WarningText>
    </Container>
  );
};

CaptionWrapper.defaultProps = {
  additionalText: null,
  descById: null,
};

CaptionWrapper.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  text: string.isRequired,
  additionalText: string,
  descById: string,
};

export default CaptionWrapper;
