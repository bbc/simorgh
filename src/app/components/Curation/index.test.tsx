import React from 'react';

import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import mundoFixture from '#data/mundo/topics/c1en6xwmpkvt.json';
import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import { render } from '../react-testing-library-with-providers';
import Curation from '.';

jest.mock('../ThemeProvider');

const { NONE } = VISUAL_STYLE;
const { NORMAL, HIGH } = VISUAL_PROMINENCE;

const components = {
  'curation-grid-normal': {
    visualStyle: NONE,
    visualProminence: NORMAL,
    promos: fixture.data.curations[0].summaries,
  },
  'hierarchical-grid': {
    visualStyle: NONE,
    visualProminence: HIGH,
    promos: mundoFixture.data.curations[0].summaries,
  },
};

describe('Topic Curations', () => {
  it.each(Object.entries(components))(
    `should render a $testId component`,
    // testId is the key in the components object above
    (testId, { visualStyle, visualProminence, promos }) => {
      const { getByTestId } = render(
        <Curation
          visualStyle={visualStyle}
          visualProminence={visualProminence}
          promos={promos}
        />,
      );
      expect(getByTestId(testId)).toBeInTheDocument();
    },
  );
});
