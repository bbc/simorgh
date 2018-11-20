import React from 'react';
import styled, { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { getStyleTag } from './styles'; // eslint-disable-line no-unused-vars

// mock up and render a simple styled application
const sheet = new ServerStyleSheet();
const StyledHeading = styled.h1`
  color: teal;
`;
const styleWithAttr = inlineAttribute => `<style ${inlineAttribute} data-reactroot="">
/* sc-component-id: StyledHeading-av5ml9-0 */
.StyledHeading-av5ml9-0 {} .gDvQnu{color:teal;}</style>`;
renderToString(sheet.collectStyles(<StyledHeading>Hello world</StyledHeading>));

describe('getStyleTag', () => {
  describe('canonical version', () => {
    it('should respond with data-styled-component attribute', async () => {
      const inlineCss = renderToString(getStyleTag(sheet));
      expect(inlineCss).toBe(styleWithAttr('data-styled-components="gDvQnu"'));
    });
  });

  describe('AMP version', () => {
    const isAmp = true;
    it('should respond with amp-custom attribute', async () => {
      const inlineCss = renderToString(getStyleTag(sheet, isAmp));
      expect(inlineCss).toBe(styleWithAttr('amp-custom=""'));
    });
  });
});
