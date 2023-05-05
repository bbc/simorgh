import { css, Theme } from '@emotion/react';

const styles = {
  body: ({ mq, fontSizes, fontVariants }: Theme) =>
    oneColumnWrapper({
      [mq.GROUP_0_MAX_WIDTH]: {},
    }),
};

const OneColumnWrapper = styled.div`
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? getRankMinWidth(props).group0WithOneColumn
        : getRankMinWidth(props).group0};
  }
  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? getRankMinWidth(props).group1WithOneColumn
        : getRankMinWidth(props).group1};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? getRankMinWidth(props).group2WithOneColumn
        : getRankMinWidth(props).group2};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? getRankMinWidth(props).group3WithOneColumn
        : getRankMinWidth(props).group3};
  }
`;

const TwoColumnWrapper = styled(OneColumnWrapper)`
  /* 2 columns of items at viewport 1007px and above */
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    min-width: ${props =>
      columnIncludesDoubleDigits(props, false)
        ? getRankMinWidth(props).group3WithTwoColumns
        : getRankMinWidth(props).group3};
  }
  /* different number order for when css grid is supported  */
  @supports (${grid}) {
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      min-width: ${props =>
        columnIncludesDoubleDigits(props, true)
          ? getRankMinWidth(props).group3WithTwoColumns
          : getRankMinWidth(props).group3};
    }
  }
`;

const MultiColumnWrapper = styled(TwoColumnWrapper)`
  /* 5 columns of items at viewport 1280px and above */
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    min-width: ${props =>
      listHasDoubleDigits(props.numberOfItems)
        ? isFiveOrTen(props)
        : getRankMinWidth(props).group5};
  }
`;

const StyledSpan = styled.span`
  ${({ service }) => getSerifLight(service)}
  ${({ script, size }) =>
    script && size === 'small' ? getTrafalgar(script) : getFoolscap(script)}
  position: relative;
  color: ${props => props.theme.palette.POSTBOX};
  margin: 0; /* Reset */
  padding: 0;
  /* reduce the letter spacing of Japanese numerals */
  ${({ service }) =>
    service === 'japanese' && `letter-spacing: -${GEL_SPACING_HLF}`}
`;
