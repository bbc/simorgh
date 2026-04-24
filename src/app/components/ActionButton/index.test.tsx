import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../react-testing-library-with-providers';
import ActionButton from '.';

const noop = () => undefined;

describe('ActionButton', () => {
  it('renders the button with correct text', () => {
    render(<ActionButton onClick={noop} buttonText="Save for later" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Save for later')).toBeInTheDocument();
  });

  it('is disabled when isLoading is true', () => {
    render(<ActionButton onClick={noop} buttonText="Saving" isLoading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <ActionButton onClick={noop} buttonText="Save for later" disabled />,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<ActionButton onClick={handleClick} buttonText="Save for later" />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows buttonText when not saved and not loading', () => {
    render(<ActionButton onClick={noop} buttonText="Save for later" />);
    expect(screen.getByText('Save for later')).toBeInTheDocument();
  });

  it('shows saving text when isLoading is true', () => {
    render(<ActionButton onClick={noop} buttonText="Saving" isLoading />);
    expect(screen.getByText('Saving')).toBeInTheDocument();
  });

  it('shows saved text when isSaved is true', () => {
    render(
      <ActionButton onClick={noop} buttonText="Saved to My News" isSaved />,
    );
    expect(screen.getByText('Saved to My News')).toBeInTheDocument();
  });

  it('shows removeText when hovered and saved', async () => {
    render(
      <ActionButton
        onClick={noop}
        buttonText="Saved to My News"
        isSaved
        removeText="Remove"
      />,
    );
    await userEvent.hover(screen.getByRole('button'));
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });
});
