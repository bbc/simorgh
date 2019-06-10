import React from 'react';
import styled, { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { getStyleTag } from './styles'; // eslint-disable-line no-unused-vars
import packageLock from '../../package-lock.json';

// mock up and render a simple styled application
const sheet = new ServerStyleSheet();
const StyledHeading = styled.h1`
  color: teal;
`;
const StyledDivUsingQuotes = styled.div`
  background-image: url('https://placehold.it/640x360');
`;
const expectedOutput = inlineAttribute => `<style ${inlineAttribute} data-reactroot="">
/* sc-component-id: StyledHeading-av5ml9-0 */
.gDvQnu{color:teal;}
/* sc-component-id: StyledDivUsingQuotes-av5ml9-1 */
.bKGMUB{background-image:url('https://placehold.it/640x360');}</style>`;

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
          `data-styled="gDvQnu bKGMUB" data-styled-version="${packageLock.dependencies['styled-components'].version}"`,
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
