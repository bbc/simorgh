import { use } from 'react';

import { waitFor } from '@testing-library/react';

import { renderHook } from '#app/components/react-testing-library-with-providers';
import { AccountContext } from '#app/contexts/AccountContext';
import uasApiRequest from '#app/lib/uasApi';
import { buildGlobalId, FAVOURITES_CONFIG } from '#app/lib/uasApi/uasUtility';
import useUASFetchSaveStatus from './index';

jest.mock('#app/lib/uasApi');
jest.mock('#app/lib/uasApi/uasUtility');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

let mockQueryFn: () => Promise<boolean>;
let mockEnabled: boolean | undefined;
let mockUseQueryReturn = {
  data: false,
  isLoading: false,
  error: null as Error | null,
};

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: (config: { queryFn: () => Promise<boolean>; enabled: boolean }) => {
    mockQueryFn = config.queryFn;
    mockEnabled = config.enabled;
    return mockUseQueryReturn;
  },
}));

const mockUasApiRequest = uasApiRequest as jest.Mock;
const mockBuildGlobalId = buildGlobalId as jest.Mock;

describe('useUASFetchSaveStatus', () => {
  const defaultArticleId = '123';

  beforeEach(() => {
    mockUseQueryReturn = { data: false, isLoading: false, error: null };

    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === AccountContext) return { hashedUserId: 'user-123' };
      return {};
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns isSaved = true when API returns 200', async () => {
    mockBuildGlobalId.mockReturnValue('global-123');
    mockUasApiRequest.mockResolvedValue({ ok: true, status: 200 });
    mockUseQueryReturn.data = true;

    const { result } = renderHook(() =>
      useUASFetchSaveStatus(defaultArticleId),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => mockQueryFn());

    expect(result.current.isSaved).toBe(true);
    expect(result.current.error).toBeNull();
    expect(mockUasApiRequest).toHaveBeenCalledWith(
      'GET',
      FAVOURITES_CONFIG.activityType,
      expect.objectContaining({ globalId: 'global-123' }),
    );
  });

  test('returns isSaved = false when API returns 204', async () => {
    mockBuildGlobalId.mockReturnValue('global-123');
    mockUasApiRequest.mockResolvedValue({ ok: true, status: 204 });

    const { result } = renderHook(() =>
      useUASFetchSaveStatus(defaultArticleId),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isSaved).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('returns error and isSaved = false when API fails', async () => {
    mockBuildGlobalId.mockReturnValue('global-123');
    const apiError = new Error('API failed');
    mockUseQueryReturn.error = apiError;

    const { result } = renderHook(() =>
      useUASFetchSaveStatus(defaultArticleId),
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isSaved).toBe(false);
    expect(result.current.error).toBe(apiError);
  });

  test('does not call API when articleId is empty', () => {
    renderHook(() => useUASFetchSaveStatus(''));
    expect(mockEnabled).toBe(false);
    expect(mockUasApiRequest).not.toHaveBeenCalled();
  });
});
