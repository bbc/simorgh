import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import { renderProgramCard, uniqueStates } from '../testHelpers/helper';

describe('ProgramCard', () => {
  uniqueStates.forEach(state => {
    shouldMatchSnapshot(
      `should render correctly for ${state}`,
      renderProgramCard({
        state,
        service: 'news',
        script: latin,
      }),
    );
  });

  shouldMatchSnapshot(
    `should render correctly in RTL`,
    renderProgramCard({
      state: uniqueStates[1],
      script: arabic,
      duration: 'PT30M',
      durationLabel: 'المدة الزمنية',
      service: 'arabic',
    }),
  );

  shouldMatchSnapshot(
    `should render correctly without summary`,
    renderProgramCard({
      script: latin,
      service: 'news',
      state: uniqueStates[0],
      displaySummary: false,
    }),
  );

  it('should render with passed component', () => {
    const { container } = render(
      renderProgramCard({
        script: latin,
        service: 'news',
        state: uniqueStates[0],
        linkComponent: 'aside',
        linkComponentAttr: 'to',
      }),
    );
    expect(
      container.getElementsByTagName('aside')[0].getAttribute('to'),
    ).toEqual('/news/articles/cn7k01xp8kxo');
  });
});
