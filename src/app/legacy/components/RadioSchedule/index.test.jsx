import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import arabic from '../../../components/ThemeProvider/fontScripts/arabic';
import { renderRadioSchedule } from './testHelpers/helper';

describe('RadioSchedule', () => {
  shouldMatchSnapshot(
    'should render ltr radio schedules correctly',
    renderRadioSchedule({}),
  );

  shouldMatchSnapshot(
    'should render rtl radio schedules correctly',
    renderRadioSchedule({
      service: 'arabic',
      script: arabic,
      dir: 'rtl',
      locale: 'ar',
      selectedService: 'arabic',
    }),
  );

  it('should render with passed component', () => {
    const { container } = render(
      renderRadioSchedule({
        linkComponent: 'aside',
        linkComponentAttr: 'to',
      }),
    );
    expect(
      container.getElementsByTagName('aside')[0].getAttribute('to'),
    ).toEqual('/news/articles/cn7k01xp8kxo');
  });
});
