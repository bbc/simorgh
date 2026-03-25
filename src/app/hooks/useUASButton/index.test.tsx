import { renderHook } from '#app/components/react-testing-library-with-providers';
import useUASFetchSaveStatus from '#app/hooks/useUASFetchSaveStatus';
import isLocal from '#app/lib/utilities/isLocal';
import useUASButton from './index';

import useToggle from '../useToggle';

jest.mock('#app/hooks/useUASFetchSaveStatus');
jest.mock('../useToggle');
jest.mock('#app/lib/utilities/isLocal');

const mockuseUASFetchSaveStatus = useUASFetchSaveStatus as jest.Mock;
const mockUseToggle = useToggle as jest.Mock;
const mockIsLocal = isLocal as jest.Mock;

describe('useUASButton', () => {
  const defaultProps = {
    isSignedIn: true,
    articleId: '123',
    service: 'hindi',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockuseUASFetchSaveStatus.mockReturnValue({
      isSaved: false,
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns showButton = false when feature toggle is off', () => {
    mockUseToggle.mockReturnValue({ enabled: false });
    mockIsLocal.mockReturnValue(false);

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(false);
  });

  test('returns showButton = false when user is not signed in', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);

    const { result } = renderHook(() =>
      useUASButton({ ...defaultProps, isSignedIn: false }),
    );

    expect(result.current.showButton).toBe(false);
  });

  test('returns showButton = true when feature enabled and signed in', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);

    mockuseUASFetchSaveStatus.mockReturnValue({
      isSaved: true,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(true);
  });

  test('passes articleId to useUASFetchSaveStatus when showButton is true', () => {
    mockUseToggle.mockReturnValue({ enabled: true });
    mockIsLocal.mockReturnValue(false);

    renderHook(() => useUASButton(defaultProps));

    expect(mockuseUASFetchSaveStatus).toHaveBeenCalledWith('123');
  });

  test('passes empty string when showButton is false', () => {
    mockUseToggle.mockReturnValue({ enabled: false });
    mockIsLocal.mockReturnValue(false);

    renderHook(() => useUASButton(defaultProps));

    expect(mockuseUASFetchSaveStatus).toHaveBeenCalledWith('');
  });

  test('respects local environment service filtering', () => {
    mockUseToggle.mockReturnValue({
      enabled: true,
      value: 'hindi|sport',
    });
    mockIsLocal.mockReturnValue(true);

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(true);
  });

  test('hides button if service not in toggle value in local', () => {
    mockUseToggle.mockReturnValue({
      enabled: true,
      value: 'mundo',
    });
    mockIsLocal.mockReturnValue(true);

    const { result } = renderHook(() => useUASButton(defaultProps));

    expect(result.current.showButton).toBe(false);
  });
});
