import {
  act,
  fireEvent,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import useTrappedFocus from '.';

const TestComponent = () => {
  const { containerRef, firstElementRef, lastElementRef } = useTrappedFocus<
    HTMLDivElement,
    HTMLButtonElement,
    HTMLButtonElement
  >();

  return (
    <div ref={containerRef} data-testid="container">
      <button ref={firstElementRef} type="button" data-testid="first-btn">
        First
      </button>
      <button type="button" data-testid="middle-btn">
        Middle
      </button>
      <button ref={lastElementRef} type="button" data-testid="last-btn">
        Last
      </button>
    </div>
  );
};

describe('useTrappedFocus', () => {
  it('focuses the first element on mount', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('first-btn')).toHaveFocus();
  });

  it('wraps focus to the last element when Shift+Tab is pressed on the first element', () => {
    render(<TestComponent />);
    // first-btn is focused on mount
    act(() => {
      fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    });
    expect(screen.getByTestId('last-btn')).toHaveFocus();
  });

  it('wraps focus to the first element when Tab is pressed on the last element', () => {
    render(<TestComponent />);
    act(() => {
      screen.getByTestId('last-btn').focus();
    });
    act(() => {
      fireEvent.keyDown(document, { key: 'Tab' });
    });
    expect(screen.getByTestId('first-btn')).toHaveFocus();
  });

  it('does not redirect focus when Tab is pressed on a non-boundary element', () => {
    render(<TestComponent />);
    act(() => {
      screen.getByTestId('middle-btn').focus();
    });
    act(() => {
      fireEvent.keyDown(document, { key: 'Tab' });
    });
    expect(screen.getByTestId('middle-btn')).toHaveFocus();
  });

  it('restores focus to the previously focused element on unmount', () => {
    const previousButton = document.createElement('button');
    document.body.appendChild(previousButton);
    previousButton.focus();

    const { unmount } = render(<TestComponent />);
    expect(screen.getByTestId('first-btn')).toHaveFocus();

    unmount();

    expect(document.activeElement).toBe(previousButton);
    document.body.removeChild(previousButton);
  });
});
