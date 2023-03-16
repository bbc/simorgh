import { render } from '../../../components/react-testing-library-with-providers';
import arabic from '../../../components/ThemeProvider/fontScripts/arabic';
import { renderRadioSchedule } from './testHelpers/helper';

describe('RadioSchedule', () => {
  it('should render ltr radio schedules correctly', () => {
    const { container } = render(renderRadioSchedule({}));
    expect(container).toMatchSnapshot();
  });

  it('should render rtl radio schedules correctly', () => {
    const { container } = render(
      renderRadioSchedule({
        service: 'arabic',
        script: arabic,
        dir: 'rtl',
        locale: 'ar',
        selectedService: 'arabic',
      }),
    );
    expect(container).toMatchSnapshot();
  });

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
