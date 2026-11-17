import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';

import SubmitButton from '.';

jest.mock('#app/hooks/useExperimentVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useExperimentVariation'),
  default: jest.fn(),
}));

describe('SubmitButton', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('should render a submit button with correct type', async () => {
    const { container } = await act(() => {
      return render(<SubmitButton />, { service: 'news' });
    });

    const button = container.querySelector('button[type=submit]');

    expect(button).toBeInTheDocument();
  });
});
