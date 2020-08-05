import React from 'react';
import { render } from '@testing-library/react';
import ContextWrap from '../utilities/testHelper';
import ComscoreAnalytics from '..';

describe('Snapshots', () => {
  it('should render comscore script when on amp and toggle is enabled', () => {
    const toggleState = {
      comscoreAnalytics: {
        enabled: true,
      },
    };
    const { container } = render(
      <ContextWrap
        platform="amp"
        pageType="article"
        origin="bbc.com"
        toggleState={toggleState}
      >
        <ComscoreAnalytics />
      </ContextWrap>,
    );

    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });
});
