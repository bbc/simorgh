import React from 'react';
import styled from '@emotion/styled';
import InlineLink from '#psammead/psammead-inline-link/src';
import Paragraph from '#psammead/psammead-paragraph/src';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import {
  getCanon,
  getParagon,
  GEL_FF_REITH_SANS,
} from '#psammead/gel-foundations/src/typography';
import idSanitiser from '#lib/utilities/idSanitiser';
import Grid, { GelPageGrid } from '#components/Grid';

const StatusCode = styled.span`
  ${props => (props.script ? getParagon(props.script) : '')}
  color: ${props => props.theme.palette.POSTBOX};
  display: block;
  font-family: ${GEL_FF_REITH_SANS};
  font-weight: 600;
  padding: 2.5rem 0 0.5rem 0;
`;

const Heading = styled.h1`
  ${({ script }) => script && getCanon(script)}
  ${({ service }) => getSerifMedium(service)}
  color: ${props => props.theme.palette.SHADOW};
  margin-top: 0;
`;

const StyledGelPageGrid = styled(GelPageGrid)`
  padding-bottom: 4rem;
`;

const CustomParagraph = styled(Paragraph)`
  padding-top: 0.2rem;
`;

const ErrorMain = ({
  statusCode,
  title,
  message,
  solutions,
  callToActionFirst = null,
  callToActionLinkText,
  callToActionLinkUrl,
  callToActionLast = null,
  script,
  service,
}) => (
  <StyledGelPageGrid
    as="main"
    role="main"
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 20,
    }}
    enableGelGutters
  >
    <Grid
      item
      startOffset={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 2,
        group5: 5,
      }}
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 6,
        group5: 12,
      }}
      margins={{ group0: true, group1: true, group2: true, group3: true }}
    >
      <StatusCode script={script} data-e2e="status-code">
        {statusCode}
      </StatusCode>
      <Heading id="content" script={script} service={service} tabIndex="-1">
        {title}
      </Heading>
      <CustomParagraph script={script} service={service}>
        {message}
      </CustomParagraph>
      <ul>
        {solutions.map(text => (
          <CustomParagraph
            script={script}
            service={service}
            as="li"
            key={idSanitiser(text)}
          >
            {text}
          </CustomParagraph>
        ))}
      </ul>
      <CustomParagraph script={script} service={service}>
        {callToActionFirst}
        <InlineLink
          href={callToActionLinkUrl}
          className="focusIndicatorReducedWidth"
        >
          {callToActionLinkText}
        </InlineLink>
        {callToActionLast}
      </CustomParagraph>
    </Grid>
  </StyledGelPageGrid>
);

export default ErrorMain;
