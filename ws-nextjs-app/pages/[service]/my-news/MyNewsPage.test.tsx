import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import MyNewsPage from './MyNewsPage';

describe('MyNewsPage', () => {
  it('should render the My News text', async () => {
    await act(async () => {
      render(<MyNewsPage />);
    });

    expect(screen.getByText('My News')).toBeInTheDocument();
  });
});
