import React from 'react';
import { string, arrayOf, oneOf, shape } from 'prop-types';
import styled from 'styled-components';
import InlineLink from '@bbc/psammead-inline-link';
import Paragraph from '@bbc/psammead-paragraph';
import { C_POSTBOX, C_SHADOW } from '@bbc/psammead-styles/colours';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import {
  getCanon,
  getParagon,
  GEL_FF_REITH_SANS,
} from '@bbc/gel-foundations/typography';
import idSanitiser from '#lib/utilities/idSanitiser';
import Grid, { GelPageGrid } from '#app/components/Grid';

const StatusCode = styled.span`
  ${(props) => (props.script ? getParagon(props.script) : '')};
  color: ${C_POSTBOX};
  display: block;
  font-family: ${GEL_FF_REITH_SANS};
  font-weight: 600;
  padding: 2.5rem 0 0.5rem 0;
`;

const Heading = styled.h1`
  ${({ script }) => script && getCanon(script)};
  ${({ service }) => getSerifMedium(service)}
  color: ${C_SHADOW};
  margin-top: 0;
`;

const StyledGelPageGrid = styled(GelPageGrid)`
  padding-bottom: 4rem;
  flex-grow: 1;
`;

const CustomParagraph = styled(Paragraph)`
  padding-top: 0.2rem;
`;

const ErrorMain = ({
  statusCode,
  title,
  message,
  solutions,
  callToActionFirst,
  callToActionLinkText,
  callToActionLinkUrl,
  callToActionLast,
  dir,
  script,
  service,
}) => (
  <StyledGelPageGrid
    forwardedAs="main"
    role="main"
    dir={dir}
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
      dir={dir}
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
      <StatusCode script={script}>{statusCode}</StatusCode>
      <Heading id="content" script={script} service={service} tabIndex="-1">
        {title}
      </Heading>
      <CustomParagraph script={script} service={service}>
        {message}
      </CustomParagraph>
      <ul>
        {solutions.map((text) => (
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
        <InlineLink href={callToActionLinkUrl}>
          {callToActionLinkText}
        </InlineLink>
        {callToActionLast}
      </CustomParagraph>
    </Grid>
  </StyledGelPageGrid>
);

ErrorMain.propTypes = {
  statusCode: string.isRequired,
  title: string.isRequired,
  message: string.isRequired,
  solutions: arrayOf(string).isRequired,
  callToActionFirst: string,
  callToActionLinkText: string.isRequired,
  callToActionLinkUrl: string.isRequired,
  callToActionLast: string,
  dir: oneOf(['ltr', 'rtl']).isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
};

ErrorMain.defaultProps = {
  callToActionFirst: null,
  callToActionLast: null,
};

export default ErrorMain;
