import {
  act,
  fireEvent,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import { useRef } from 'react';
import useDismissOnOutsideInteraction from '.';

const DEFAULT_GRACE_PERIOD_MS = 1000;

const TestComponent = ({
  onDismiss,
  enableOutsideClick,
  outsideClickGracePeriodMs,
}: {
  onDismiss: () => void;
  enableOutsideClick?: boolean;
  outsideClickGracePeriodMs?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useDismissOnOutsideInteraction({
    containerRef,
    onDismiss,
    enableOutsideClick,
    outsideClickGracePeriodMs,
  });

  return (
    <div>
      <div ref={containerRef} data-testid="container">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
};

describe('useDismissOnOutsideInteraction', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls onDismiss when Escape is pressed', () => {
    const onDismiss = jest.fn();
    render(<TestComponent onDismiss={onDismiss} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not call onDismiss for other keys', () => {
    const onDismiss = jest.fn();
    render(<TestComponent onDismiss={onDismiss} />);

    fireEvent.keyDown(document, { key: 'Enter' });

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('does not call onDismiss for an outside click within the grace period', () => {
    const onDismiss = jest.fn();
    render(
      <TestComponent
        onDismiss={onDismiss}
        outsideClickGracePeriodMs={DEFAULT_GRACE_PERIOD_MS}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(DEFAULT_GRACE_PERIOD_MS - 1);
    });
    fireEvent.click(screen.getByTestId('outside'));

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('calls onDismiss when clicking outside the container after the grace period', () => {
    const onDismiss = jest.fn();
    render(
      <TestComponent
        onDismiss={onDismiss}
        outsideClickGracePeriodMs={DEFAULT_GRACE_PERIOD_MS}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(DEFAULT_GRACE_PERIOD_MS);
    });
    fireEvent.click(screen.getByTestId('outside'));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not call onDismiss when clicking inside the container after the grace period', () => {
    const onDismiss = jest.fn();
    render(
      <TestComponent
        onDismiss={onDismiss}
        outsideClickGracePeriodMs={DEFAULT_GRACE_PERIOD_MS}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(DEFAULT_GRACE_PERIOD_MS);
    });
    fireEvent.click(screen.getByTestId('container'));

    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('does not attach an outside click listener when enableOutsideClick is false', () => {
    const onDismiss = jest.fn();
    render(
      <TestComponent
        onDismiss={onDismiss}
        enableOutsideClick={false}
        outsideClickGracePeriodMs={DEFAULT_GRACE_PERIOD_MS}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(DEFAULT_GRACE_PERIOD_MS);
    });
    fireEvent.click(screen.getByTestId('outside'));

    expect(onDismiss).not.toHaveBeenCalled();
  });
});
