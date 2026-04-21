import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../react-testing-library-with-providers';
import ActionButton from '.';

const noop = () => undefined;

describe('ActionButton', () => {
  it('renders the button with correct text', () => {
    render(
      <ActionButton
        onClick={noop}
        label="Save for later"
        buttonText="Save for later"
      />,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Save for later')).toBeInTheDocument();
  });

  it('is disabled when isLoading is true', () => {
    render(
      <ActionButton
        onClick={noop}
        label="Save for later"
        buttonText="Saving"
        isLoading
      />,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <ActionButton
        onClick={noop}
        label="Save for later"
        buttonText="Save for later"
        disabled
      />,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(
      <ActionButton
        onClick={handleClick}
        label="Save for later"
        buttonText="Save for later"
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-label', () => {
    render(
      <ActionButton
        onClick={noop}
        label="Save for later"
        buttonText="Save for later"
      />,
    );
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Save for later',
    );
  });
});
