import { render } from '../../../../components/react-testing-library-with-providers';
import StartTime from './index';

const testUnixTimestamp = 1566914061212;

describe('StartTime', () => {
  it('should render LTR correctly', () => {
    const { container } = render(<StartTime timestamp={testUnixTimestamp} />, {
      dir: 'ltr',
      locale: 'en-gb',
      service: 'news',
    });
    expect(container.querySelector('time')).toBeInTheDocument();
  });

  it('should render RTL correctly', () => {
    const { container } = render(<StartTime timestamp={testUnixTimestamp} />, {
      dir: 'rtl',
      locale: 'fa',
      service: 'persian',
    });
    expect(container.querySelector('time')).toBeInTheDocument();
  });
});
