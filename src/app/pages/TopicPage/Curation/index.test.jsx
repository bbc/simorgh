import React from 'react';

import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import mundoFixture from '#data/mundo/topics/c1en6xwmpkvt.json';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';

import Curation, { VISUAL_STYLE, VISUAL_PROMINANCE } from '.';

jest.mock('../../../components/ThemeProvider');

const components = {
  [VISUAL_STYLE.NONE]: {
    [VISUAL_PROMINANCE.NORMAL]: {
      promos: fixture.data.summaries,
      testId: 'curation-grid-normal',
    },
    [VISUAL_PROMINANCE.HIGH]: {
      promos: mundoFixture.data.curations[0].summaries,
      testId: 'hierarchical-grid',
    },
  },
};

describe('Topic Curations', () => {
  it('should render the correct component', () => {
    suppressPropWarnings(['position', 'undefined']);
    suppressPropWarnings(['curationLength', 'undefined']);
    suppressPropWarnings(['type', 'article']);
    suppressPropWarnings(['children', 'string']);

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
    suppressPropWarnings(['visualStyle', 'something-unsupported']);
    suppressPropWarnings(['visualProminance', 'what-is-this']);

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
