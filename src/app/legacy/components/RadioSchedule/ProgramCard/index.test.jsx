import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { render } from '#components/react-testing-library-with-providers';
import { renderProgramCard, uniqueStates } from '../testHelpers/helper';

describe('ProgramCard', () => {
  suppressPropWarnings(['program', 'ProgramCard']);
  suppressPropWarnings(['id', 'ProgramCard', 'undefined']);

  uniqueStates.forEach(state => {
    it(`should render correctly for ${state}`, () => {
      const { container } = render(
        renderProgramCard({ state, nextLabel: 'NEXT', liveLabel: 'LIVE' }),
      );
      expect(container).toMatchSnapshot();
    });
  });

  it(`should render correctly in RTL`, () => {
    const { container } = render(
      renderProgramCard({
        state: uniqueStates[1],
        duration: 'PT30M',
        durationLabel: 'المدة الزمنية',
        service: 'arabic',
      }),
    );
    expect(container).toMatchSnapshot();
  });

  it(`should render correctly without summary`, () => {
    const { container } = render(
      renderProgramCard({
        state: uniqueStates[0],
        displaySummary: false,
      }),
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with passed component', () => {
    const { container } = render(
      renderProgramCard({
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
