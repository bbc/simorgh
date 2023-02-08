import React from 'react';

import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import mundoFixture from '#data/mundo/topics/c1en6xwmpkvt.json';
import { render } from '../../../components/react-testing-library-with-providers';

import Curation, { VISUAL_STYLE, VISUAL_PROMINENCE } from '.';

jest.mock('../../../components/ThemeProvider');

const components = {
  [VISUAL_STYLE.NONE]: {
    [VISUAL_PROMINENCE.NORMAL]: {
      promos: fixture.data.summaries,
      testId: 'curation-grid-normal',
    },
    [VISUAL_PROMINENCE.HIGH]: {
      promos: mundoFixture.data.curations[0].summaries,
      testId: 'hierarchical-grid',
    },
  },
};

describe('Topic Curations', () => {
  it('should render the correct component', () => {
    Object.entries(components).forEach(([curationType, prominences]) => {
      Object.entries(prominences).forEach(
        ([prominence, { promos, testId }]) => {
          const { getByTestId } = render(
            <Curation
              visualStyle={curationType}
              visualProminence={prominence}
              promos={promos}
            />,
          );
          expect(getByTestId(testId)).toBeInTheDocument();
        },
      );
    });
  });

  it('should render the standard grid if a style/prominence is not recognised', () => {
    const { getByTestId } = render(
      <Curation
        visualStyle="something-unsupported"
        visualProminence="what-is-this"
        promos={fixture.data.summaries}
      />,
    );
    expect(getByTestId('curation-grid-normal')).toBeInTheDocument();
  });
});
