import React from 'react';

import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { render } from '../../../components/react-testing-library-with-providers';

import Curation, { VISUAL_STYLE, VISUAL_PROMINANCE } from '.';

jest.mock('../../../components/ThemeProvider');

const components = {
  [VISUAL_STYLE.NONE]: {
    [VISUAL_PROMINANCE.NORMAL]: {
      promos: fixture.data.summaries,
      testId: 'curation-grid-normal',
    },
  },
};

describe('Topic Curations', () => {
  it('should render the correct component', () => {
    Object.entries(components).forEach(([curationType, prominances]) => {
      Object.entries(prominances).forEach(
        ([prominance, { promos, testId }]) => {
          const { getByTestId } = render(
            <Curation
              visualStyle={curationType}
              visualProminance={prominance}
              promos={promos}
            />,
          );
          expect(getByTestId(testId)).toBeInTheDocument();
        },
      );
    });
  });

  it('should render the standard grid if a style/prominance is not recognised', () => {
    const { getByTestId } = render(
      <Curation
        visualStyle="something-unsupported"
        visualProminance="what-is-this"
        promos={fixture.data.summaries}
      />,
    );
    expect(getByTestId('curation-grid-normal')).toBeInTheDocument();
  });
});
