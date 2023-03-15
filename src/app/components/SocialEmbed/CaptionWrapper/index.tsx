import React, { PropsWithChildren, useContext } from 'react';
import styled from '@emotion/styled';
import { RequestContext } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { Theme } from '@emotion/react';
import { PageTypes } from '#app/models/types/global';
import { visuallyHiddenStyle } from '../utilities';

const Figure = styled.figure<{ isArticlePage: boolean }>`
  margin: 0;
  background-color: ${({
    isArticlePage,
    theme,
  }: {
    isArticlePage: boolean;
    theme: Theme;
  }) => (isArticlePage ? 'transparent' : theme.palette.BLACK)};
`;

const FigCaption = styled.figcaption<{ isArticlePage: boolean }>`
  ${({ theme }) => theme.fontVariants.sansRegular}
  ${({ theme }) => theme.fontSizes.brevier}
  
  ${({ isArticlePage, theme }: { isArticlePage: boolean; theme: Theme }) => `
    color: ${isArticlePage ? theme.palette.GREY_6 : theme.palette.WHITE};
    padding: ${
      isArticlePage
        ? `${theme.spacings.FULL}rem 0`
        : `${theme.spacings.FULL}rem`
    };
  `}

  > span {
    ${visuallyHiddenStyle}
  }
`;

type Props = {
  textPrefixVisuallyHidden: string;
  text: string;
  additionalText: string;
};

const CaptionWrapper = ({
  children,
  textPrefixVisuallyHidden,
  text,
  additionalText,
}: PropsWithChildren<Props>) => {
  const { pageType } = useContext(RequestContext) as { pageType: PageTypes };
  const isArticlePage = pageType === ARTICLE_PAGE;

  return (
    <Figure isArticlePage={isArticlePage}>
      {children}
      <FigCaption isArticlePage={isArticlePage}>
        {textPrefixVisuallyHidden && <span>{textPrefixVisuallyHidden}</span>}
        {`${text}${additionalText ? ` ${additionalText}` : ''}`}
      </FigCaption>
    </Figure>
  );
};

export default CaptionWrapper;
