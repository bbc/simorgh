import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContext } from '../../contexts/ServiceContext';
import GlobalStyles from '.';

const serviceStub = {
  fonts: [
    '@font-face {font-family: "ReithSerif"; src: url("https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Md.woff2") format("woff2"),url("https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Md.woff") format("woff"); font-weight: 500; font-display: optional;}',
  ],
};

const createGlobalStyles = service => {
  render(
    <ServiceContext.Provider value={service}>
      <GlobalStyles />
    </ServiceContext.Provider>,
  );
};

const getGlobalStyles = () => {
  const rules = document.styleSheets[0].cssRules;
  const styles = rules.reduce(
    (cssRules, cssRule) => cssRules + cssRule.cssText,
    '',
  );
  return styles;
};

describe('globalStyles', () => {
  it('should inject normalize and fontfaces to global styles', () => {
    createGlobalStyles(serviceStub);
    const styles = getGlobalStyles();
    expect(styles).toMatchSnapshot();
  });

  it('should handle missing fonts in service config', () => {
    createGlobalStyles({});
    const styles = getGlobalStyles();
    expect(styles).toMatchSnapshot();
  });

  it('should handle globalstyles with fonts props', () => {
    // eslint-disable-next-line no-unused-expressions
    <GlobalStyles fonts={['font-family: "Sans-Serif"']} />;
    const styles = getGlobalStyles();
    expect(styles).toMatchSnapshot();
  });
});
