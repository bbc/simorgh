import { use } from 'react';

import styled from '@emotion/styled';

import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContext } from '#contexts/RequestContext';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { GREY_6 } from '../../../../../components/ThemeProvider/palette';
import { visuallyHiddenStyle } from '../../../../../lib/styles.const';

const Container = styled.div`
  margin: 0;
  background-color: 'transparent';
`;

const WarningText = styled.small`
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  ${({ theme: { fontSizes } }) => fontSizes.brevier};
  display: block;

  ${({ isLive }) => `
    color: ${GREY_6};
    padding: ${`${GEL_SPACING} 0`};
    ${isLive ? 'padding-bottom: 0;' : ''}
  `}

  > span {
    ${visuallyHiddenStyle}
  }
`;

const CaptionWrapper = ({
  children,
  text,
  additionalText = null,
  describedById = null,
}) => {
  const { pageType } = use(RequestContext);
  const isLive = pageType === LIVE_PAGE;

  return (
    <Container>
      {children}
      <WarningText
        {...(describedById && { id: describedById })}
        isLive={isLive}
      >
        {`${text}${additionalText ? ` ${additionalText}` : ''}`}
      </WarningText>
    </Container>
  );
};

export default CaptionWrapper;
