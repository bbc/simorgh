import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import {
  startTimeMachine,
  resetTimeMachine,
} from '../../.storybook/time-machine';
import WithTimeMachine from './withTimeMachine';

jest.mock('../../.storybook/time-machine', () => {
  const actual = jest.requireActual('../../.storybook/time-machine');

  return {
    __esModule: true,
    ...actual,
    startTimeMachine: jest.fn(actual.startTimeMachine),
    resetTimeMachine: jest.fn(actual.resetTimeMachine),
  };
});

const mockStartTimeMachine = jest.mocked(startTimeMachine);
const mockResetTimeMachine = jest.mocked(resetTimeMachine);

const Clock = () => <span>{new Date().getUTCFullYear()}</span>;

describe('WithTimeMachine', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    mockResetTimeMachine();
  });

  it('renders nothing on the server and leaves the system clock alone', () => {
    const output = renderToString(
      <WithTimeMachine dateString="1 January 2000 00:00:00 GMT">
        <Clock />
      </WithTimeMachine>,
    );
    expect(output).toBe('');
    expect(mockStartTimeMachine).not.toHaveBeenCalled();
  });

  it('starts the clock before rendering children and resets it on unmount', () => {
    const { unmount } = render(
      <WithTimeMachine dateString="1 January 2000 00:00:00 GMT">
        <Clock />
      </WithTimeMachine>,
    );
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(mockStartTimeMachine).toHaveBeenCalledTimes(1);

    unmount();
    expect(mockResetTimeMachine).toHaveBeenCalledTimes(1);
  });

  it('updates the clock on date changes without restarting for children changes', () => {
    const { rerender } = render(
      <WithTimeMachine dateString="1 January 2000 00:00:00 GMT">
        <Clock />
      </WithTimeMachine>,
    );

    rerender(
      <WithTimeMachine dateString="1 January 2000 00:00:00 GMT">
        <Clock />
        <span>Updated children</span>
      </WithTimeMachine>,
    );
    expect(screen.getByText('Updated children')).toBeInTheDocument();
    expect(mockStartTimeMachine).toHaveBeenCalledTimes(1);

    rerender(
      <WithTimeMachine dateString="1 January 2010 00:00:00 GMT">
        <Clock />
      </WithTimeMachine>,
    );
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(mockResetTimeMachine).toHaveBeenCalledTimes(1);
    expect(mockStartTimeMachine).toHaveBeenCalledTimes(2);
  });

  it('starts and cleans up the clock during StrictMode subscription replay', () => {
    const { unmount } = render(
      <StrictMode>
        <WithTimeMachine dateString="1 January 2000 00:00:00 GMT">
          <Clock />
        </WithTimeMachine>
      </StrictMode>,
    );
    expect(screen.getByText('2000')).toBeInTheDocument();
    unmount();
    expect(mockResetTimeMachine).toHaveBeenCalledTimes(
      mockStartTimeMachine.mock.calls.length,
    );
  });
});
