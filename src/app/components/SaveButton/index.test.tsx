import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../react-testing-library-with-providers';
import SaveButton from '.';

const noop = () => undefined;

describe('SaveButton', () => {
  it('renders the button with the accessible label as its name', () => {
    render(
      <SaveButton
        onClick={noop}
        visualLabel="Save for later"
        accessibleLabel="Save for later"
      />,
    );
    expect(
      screen.getByRole('button', { name: 'Save for later' }),
    ).toBeInTheDocument();
  });

  it('renders the visual label as aria-hidden visible text', () => {
    render(
      <SaveButton
        onClick={noop}
        visualLabel="Save for later"
        accessibleLabel="Save it"
      />,
    );
    const visibleText = screen.getByText('Save for later');
    expect(visibleText.closest('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('stays focusable (not natively disabled) while loading', () => {
    render(
      <SaveButton
        onClick={noop}
        visualLabel="Loading"
        accessibleLabel="Loading"
        isLoading
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    expect(button).not.toHaveAttribute('aria-busy');
  });

  it('stays focusable (not natively disabled) while updating', () => {
    render(
      <SaveButton
        onClick={noop}
        visualLabel="Saving"
        accessibleLabel="Saving"
        isUpdating
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    expect(button).not.toHaveAttribute('aria-busy');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(
      <SaveButton
        onClick={handleClick}
        visualLabel="Save for later"
        accessibleLabel="Save for later"
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick while loading', async () => {
    const handleClick = jest.fn();
    render(
      <SaveButton
        onClick={handleClick}
        visualLabel="Loading"
        accessibleLabel="Loading"
        isLoading
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick while updating', async () => {
    const handleClick = jest.fn();
    render(
      <SaveButton
        onClick={handleClick}
        visualLabel="Saving"
        accessibleLabel="Saving"
        isUpdating
      />,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows the saved visual label while exposing the next action to screen readers', () => {
    render(
      <SaveButton
        onClick={noop}
        visualLabel="Saved to My News"
        hoverVisualLabel="Remove"
        accessibleLabel="Remove from My News"
        isSaved
      />,
    );
    expect(screen.getByText('Saved to My News')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Remove from My News' }),
    ).toBeInTheDocument();
  });

  it('shows hoverVisualLabel on hover but keeps the accessible label unchanged', async () => {
    render(
      <SaveButton
        onClick={noop}
        visualLabel="Saved to My News"
        hoverVisualLabel="Remove"
        accessibleLabel="Remove from My News"
        isSaved
      />,
    );
    const button = screen.getByRole('button', { name: 'Remove from My News' });
    await userEvent.hover(button);
    expect(screen.getByText('Remove')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Remove from My News' }),
    ).toBeInTheDocument();
  });

  it('falls back to the visual label on hover when no hoverVisualLabel is provided', async () => {
    render(
      <SaveButton
        onClick={noop}
        visualLabel="Saved to My News"
        accessibleLabel="Remove from My News"
        isSaved
      />,
    );
    const button = screen.getByRole('button', { name: 'Remove from My News' });
    await userEvent.hover(button);
    expect(screen.getByText('Saved to My News')).toBeInTheDocument();
  });
});
