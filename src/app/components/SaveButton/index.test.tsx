import { ReactElement } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlusIcon, TickIcon, Close } from '#app/components/icons';
import Spinner from '#app/components/Spinner';
import { render } from '../react-testing-library-with-providers';
import SaveButton, { SAVE_BUTTON_VARIANTS } from '.';

const noop = () => undefined;

const getIconPathData = (container: HTMLElement) =>
  container.querySelector('svg path')?.getAttribute('d');

const renderIconPathData = (icon: ReactElement) => {
  const { container } = render(icon);
  return getIconPathData(container);
};

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

  it('defaults to the save variant styling when no variant is provided', () => {
    render(
      <SaveButton
        onClick={noop}
        visualLabel="Save for later"
        accessibleLabel="Save for later"
      />,
    );
    const button = screen.getByRole('button');
    expect(button.className).not.toContain('followVariant');
  });

  describe('follow variant', () => {
    it('applies the follow variant styling', () => {
      render(
        <SaveButton
          onClick={noop}
          variant={SAVE_BUTTON_VARIANTS.FOLLOW}
          visualLabel="Follow"
          accessibleLabel="Follow"
        />,
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('followVariant');
      expect(button.className).not.toContain('savedState');
    });

    it('applies the saved state styling when following', () => {
      render(
        <SaveButton
          onClick={noop}
          variant={SAVE_BUTTON_VARIANTS.FOLLOW}
          visualLabel="Following"
          hoverVisualLabel="Unfollow"
          accessibleLabel="Unfollow this topic"
          isSaved
        />,
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('followVariant');
      expect(button.className).toContain('savedState');
    });

    it('calls onClick when clicked', async () => {
      const handleClick = jest.fn();
      render(
        <SaveButton
          onClick={handleClick}
          variant={SAVE_BUTTON_VARIANTS.FOLLOW}
          visualLabel="Follow"
          accessibleLabel="Follow"
        />,
      );
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows the resting visual label while exposing the unfollow action to screen readers', () => {
      render(
        <SaveButton
          onClick={noop}
          variant={SAVE_BUTTON_VARIANTS.FOLLOW}
          visualLabel="Following"
          hoverVisualLabel="Unfollow"
          accessibleLabel="Unfollow this topic"
          isSaved
        />,
      );
      expect(screen.getByText('Following')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Unfollow this topic' }),
      ).toBeInTheDocument();
    });

    it('shows the plus icon when not following', () => {
      const { container } = render(
        <SaveButton
          onClick={noop}
          variant={SAVE_BUTTON_VARIANTS.FOLLOW}
          visualLabel="Follow"
          accessibleLabel="Follow"
        />,
      );
      expect(getIconPathData(container)).toBe(renderIconPathData(<PlusIcon />));
    });

    it('shows the tick icon when following and not hovered or focused', () => {
      const { container } = render(
        <SaveButton
          onClick={noop}
          variant={SAVE_BUTTON_VARIANTS.FOLLOW}
          visualLabel="Following"
          hoverVisualLabel="Unfollow"
          accessibleLabel="Unfollow this topic"
          isSaved
        />,
      );
      expect(getIconPathData(container)).toBe(renderIconPathData(<TickIcon />));
    });

    it('shows the close icon and hover label on hover, without changing the accessible name', async () => {
      const { container } = render(
        <SaveButton
          onClick={noop}
          variant={SAVE_BUTTON_VARIANTS.FOLLOW}
          visualLabel="Following"
          hoverVisualLabel="Unfollow"
          accessibleLabel="Unfollow this topic"
          isSaved
        />,
      );
      await userEvent.hover(screen.getByRole('button'));
      expect(screen.getByText('Unfollow')).toBeInTheDocument();
      expect(getIconPathData(container)).toBe(
        renderIconPathData(<Close width="20" height="20" />),
      );
      expect(
        screen.getByRole('button', { name: 'Unfollow this topic' }),
      ).toBeInTheDocument();
    });

    it('shows the close icon and hover label on keyboard focus, without changing the accessible name', async () => {
      const { container } = render(
        <SaveButton
          onClick={noop}
          variant={SAVE_BUTTON_VARIANTS.FOLLOW}
          visualLabel="Following"
          hoverVisualLabel="Unfollow"
          accessibleLabel="Unfollow this topic"
          isSaved
        />,
      );
      await userEvent.tab();
      expect(screen.getByRole('button')).toHaveFocus();
      expect(screen.getByText('Unfollow')).toBeInTheDocument();
      expect(getIconPathData(container)).toBe(
        renderIconPathData(<Close width="20" height="20" />),
      );
      expect(
        screen.getByRole('button', { name: 'Unfollow this topic' }),
      ).toBeInTheDocument();
    });

    it('shows the spinner while loading', () => {
      const { container } = render(
        <SaveButton
          onClick={noop}
          variant={SAVE_BUTTON_VARIANTS.FOLLOW}
          visualLabel="Loading"
          accessibleLabel="Loading"
          isLoading
        />,
      );
      expect(getIconPathData(container)).toBe(renderIconPathData(<Spinner />));
    });

    it('shows the spinner while updating', () => {
      const { container } = render(
        <SaveButton
          onClick={noop}
          variant={SAVE_BUTTON_VARIANTS.FOLLOW}
          visualLabel="Following"
          accessibleLabel="Following"
          isUpdating
        />,
      );
      expect(getIconPathData(container)).toBe(renderIconPathData(<Spinner />));
    });
  });
});
