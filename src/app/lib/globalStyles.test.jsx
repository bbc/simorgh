import React from 'react';
import { render } from 'react-testing-library';
import { ServiceContextProvider } from '../contexts/ServiceContext';
import GlobalStyles from './globalStyles';

describe('globalStyles', () => {
  it('should call createGlobalStyle with args matching snapshot', () => {
    render(
      <ServiceContextProvider service="news">
        <GlobalStyles />
      </ServiceContextProvider>,
    );

    const rules = document.styleSheets[0].cssRules;
    const styles = rules.reduce(
      (cssRules, cssRule) => cssRules + cssRule.cssText,
      '',
    );
    console.log('fontellow', styles);
    expect(styles).toMatchSnapshot();
    expect(true).toBe(true);
  });
});
