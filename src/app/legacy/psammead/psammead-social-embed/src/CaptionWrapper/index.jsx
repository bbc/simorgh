import React, { useContext } from 'react';
import { node, string } from 'prop-types';
import styled from '@emotion/styled';
import {
  C_WHITE,
  C_GREY_6,
  C_BLACK,
} from '#psammead/psammead-styles/src/colours';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_BREVIER } from '#psammead/gel-foundations/src/typography';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { RequestContext } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { visuallyHiddenStyle } from '../utilities';

const Figure = styled.figure`
  margin: 0;
  background-color: ${({ isArticlePage }) =>
    isArticlePage ? 'transparent' : C_BLACK};
`;

const FigCaption = styled.figcaption`
  ${({ service }) => getSansRegular(service)}
  ${GEL_BREVIER}
  
  ${({ isArticlePage }) => `
    color: ${isArticlePage ? C_GREY_6 : C_WHITE};
    padding: ${isArticlePage ? `${GEL_SPACING} 0` : GEL_SPACING};
  `}

  > span {
    ${visuallyHiddenStyle}
  }
`;

const CaptionWrapper = ({
  children,
  service,
  textPrefixVisuallyHidden,
  text,
  additionalText,
}) => {
  const { pageType } = useContext(RequestContext);
  const isArticlePage = pageType === ARTICLE_PAGE;

  return (
    <Figure isArticlePage={isArticlePage}>
      {children}
      <FigCaption isArticlePage={isArticlePage} service={service}>
        {textPrefixVisuallyHidden && <span>{textPrefixVisuallyHidden}</span>}
        {`${text}${additionalText ? ` ${additionalText}` : ''}`}
      </FigCaption>
    </Figure>
  );
};

CaptionWrapper.defaultProps = {
  textPrefixVisuallyHidden: null,
  additionalText: null,
};

CaptionWrapper.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  textPrefixVisuallyHidden: string,
  text: string.isRequired,
  additionalText: string,
};

export default CaptionWrapper;
