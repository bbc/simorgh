import React from 'react';
import styled, { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { getStyleTag } from '.';
import packageLock from '../../../package-lock.json';

// mock up and render a simple styled application
const sheet = new ServerStyleSheet();
const StyledHeading = styled.h1`
  color: teal;
`;
const StyledDivUsingQuotes = styled.div`
  background-image: url('https://placehold.it/640x360');
`;
const expectedOutput = inlineAttribute => `<style ${inlineAttribute} data-reactroot="">
/* sc-component-id: StyledHeading-sc-1jg6qvn-0 */
.ihxuKn{color:teal;}
/* sc-component-id: StyledDivUsingQuotes-sc-1jg6qvn-1 */
.kUqnEs{background-image:url('https://placehold.it/640x360');}</style>`;

renderToString(
  sheet.collectStyles(
    <StyledDivUsingQuotes>
      <StyledHeading>Hello world</StyledHeading>
    </StyledDivUsingQuotes>,
  ),
);

describe('getStyleTag', () => {
  describe('canonical version', () => {
    it('should respond with styled-components style tag with correct attributes', async () => {
      const inlineCss = renderToString(getStyleTag(sheet));
      expect(inlineCss).toBe(
        expectedOutput(
          `data-styled="ihxuKn kUqnEs" data-styled-version="${packageLock.dependencies['styled-components'].version}"`,
        ),
      );
    });
  });

  describe('AMP version', () => {
    const isAmp = true;
    it('should respond with amp-custom attribute and should not URL-encode quotes', async () => {
      const inlineCss = renderToString(getStyleTag(sheet, isAmp));
      expect(inlineCss).toBe(expectedOutput('amp-custom=""'));
    });
  });
});
