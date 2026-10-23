import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import { BumpLoader } from './requireJs';

// Jest hoists module factories above imports, so this reference must be
// initialized by the factory before the tests use it.
// eslint-disable-next-line no-var
var mockLogger: { error: jest.Mock };

const REQUIRE_JS_SRC =
  'https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js';

jest.mock('../../lib/logger.node', () => {
  mockLogger = { error: jest.fn() };
  return jest.fn(() => mockLogger);
});

describe('BumpLoader', () => {
  beforeEach(() => {
    delete window.requirejs;
    mockLogger.error.mockClear();
  });

  it('logs RequireJS loading errors', async () => {
    await act(async () => {
      render(
        <>
          <BumpLoader nonce="test-nonce" />
          <BumpLoader nonce="test-nonce" />
        </>,
      );
    });

    const requireScript = document.querySelector(
      `script[src="${REQUIRE_JS_SRC}"]`,
    );
    expect(requireScript).toHaveAttribute('nonce', 'test-nonce');

    await act(async () => {
      requireScript?.dispatchEvent(new Event('error'));
    });

    expect(mockLogger.error).toHaveBeenCalledWith(
      MEDIA_PLAYER_STATUS,
      expect.any(Event),
    );
    expect(mockLogger.error).toHaveBeenCalledTimes(1);
  });
});
