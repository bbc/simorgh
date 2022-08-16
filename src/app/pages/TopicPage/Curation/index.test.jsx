import { render } from '@testing-library/react';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import fixture from '#data/pidgin/topics/c95y35941vrt.json';

import Curation, { VISUAL_STYLE, VISUAL_PROMINANCE } from '.';

const components = {
  [VISUAL_STYLE.NONE]: {
    [VISUAL_PROMINANCE.NORMAL]: {
      promos: fixture.data.summaries,
      testId: 'curation-grid-normal',
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
      <CurationWithContext
        visualStyle="something-unsupported"
        visualProminance="what-is-this"
        promos={fixture.data.summaries}
      />,
    );
    expect(getByTestId('curation-grid-normal')).toBeInTheDocument();
  });
});
