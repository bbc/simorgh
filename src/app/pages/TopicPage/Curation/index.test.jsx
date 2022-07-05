import React from 'react';
import { render } from '@testing-library/react';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import fixture from '#data/pidgin/topics/c95y35941vrt.json';

import Curation, { CURATION_TYPE, VISUAL_PROMINANCE } from '.';

const components = {
  [CURATION_TYPE.GRID]: {
    [VISUAL_PROMINANCE.STANDARD]: {
      promos: fixture.data.summaries,
      testId: 'curation-grid-standard',
    },
  },
};

const CurationWithContext = props => (
  <ToggleContextProvider>
    <RequestContextProvider>
      <ServiceContextProvider service="pidgin" lang="pcm">
        <Curation {...props} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

describe('Topic Curations', () => {
  it('should render the correct component', () => {
    Object.entries(components).forEach(([curationType, prominances]) => {
      Object.entries(prominances).forEach(
        ([prominance, { promos, testId }]) => {
          const { getByTestId } = render(
            <CurationWithContext
              type={curationType}
              prominance={prominance}
              promos={promos}
            />,
          );
          expect(getByTestId(testId)).toBeInTheDocument();
        },
      );
    });
  });
});
