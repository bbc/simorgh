import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';

import SubmitButton from '.';

describe('SubmitButton', () => {
  it('should render a submit button with correct type', async () => {
    const { container } = await act(() => render(<SubmitButton />, { service: 'news' }));

    const button = container.querySelector('button[type=submit]');

    expect(button).toBeInTheDocument();
  });
});
