import { renderHook } from '#app/components/react-testing-library-with-providers';
import useErrorTracking, {
  type TrackErrorParams,
} from '#app/hooks/useErrorTracking';
import useTrackErrorEffect from './index';

jest.mock('#app/hooks/useErrorTracking');

const mockUseErrorTracking = useErrorTracking as jest.MockedFunction<
  typeof useErrorTracking
>;
const mockTrackError = jest.fn();

describe('useTrackErrorEffect', () => {
  const params: TrackErrorParams = {
    error: new Error('Unable to fetch status'),
    feature: 'follow-topic-uas',
    action: 'fetch-status',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseErrorTracking.mockReturnValue(mockTrackError);
  });

  it('reports the error with its feature and action on mount', () => {
    renderHook(() => useTrackErrorEffect(params));

    expect(mockTrackError).toHaveBeenCalledTimes(1);
    expect(mockTrackError).toHaveBeenCalledWith(params);
  });

  it.each([null, undefined])('does not report a missing error: %p', error => {
    renderHook(() => useTrackErrorEffect({ ...params, error }));

    expect(mockTrackError).not.toHaveBeenCalled();
  });

  it('reports an error when it becomes available', () => {
    const { rerender } = renderHook(
      (props: TrackErrorParams) => useTrackErrorEffect(props),
      { initialProps: { ...params, error: null } as TrackErrorParams },
    );

    expect(mockTrackError).not.toHaveBeenCalled();

    rerender(params);

    expect(mockTrackError).toHaveBeenCalledTimes(1);
    expect(mockTrackError).toHaveBeenCalledWith(params);
  });

  it('does not repeat tracking when inputs are unchanged', () => {
    const { rerender } = renderHook(
      (props: TrackErrorParams) => useTrackErrorEffect(props),
      { initialProps: params },
    );

    rerender({ ...params });

    expect(mockTrackError).toHaveBeenCalledTimes(1);
  });

  it('reports a new error', () => {
    const nextParams = {
      ...params,
      error: new Error('Unable to fetch status'),
    };
    const { rerender } = renderHook(
      (props: TrackErrorParams) => useTrackErrorEffect(props),
      { initialProps: params },
    );

    rerender(nextParams);

    expect(mockTrackError).toHaveBeenCalledTimes(2);
    expect(mockTrackError).toHaveBeenLastCalledWith(nextParams);
  });

  it.each([{ feature: 'save-article-uas' }, { action: 'metadata-sync' }])(
    'forwards updated tracking context: %o',
    updatedContext => {
      const { rerender } = renderHook(
        (props: TrackErrorParams) => useTrackErrorEffect(props),
        { initialProps: params },
      );
      const nextParams = { ...params, ...updatedContext };

      rerender(nextParams);

      expect(mockTrackError).toHaveBeenCalledTimes(2);
      expect(mockTrackError).toHaveBeenLastCalledWith(nextParams);
    },
  );

  it('uses the latest tracking callback', () => {
    const { rerender } = renderHook(() => useTrackErrorEffect(params));
    const nextTrackError = jest.fn();
    mockUseErrorTracking.mockReturnValue(nextTrackError);

    rerender();

    expect(mockTrackError).toHaveBeenCalledTimes(1);
    expect(nextTrackError).toHaveBeenCalledTimes(1);
    expect(nextTrackError).toHaveBeenCalledWith(params);
  });

  it('does not report when an error is cleared', () => {
    const { rerender } = renderHook(
      (props: TrackErrorParams) => useTrackErrorEffect(props),
      { initialProps: params },
    );

    rerender({ ...params, error: null });

    expect(mockTrackError).toHaveBeenCalledTimes(1);
  });
});
