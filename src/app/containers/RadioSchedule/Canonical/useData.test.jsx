import { renderHook, act } from '@testing-library/react-hooks';
import useData from './useData';

describe('useData', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it('should return initial data if it exists', () => {
    const { result } = renderHook(() =>
      useData('http://test.com/api', 'testData'),
    );
    expect(result.current).toBe('testData');
  });

  it('should fetch data from endpoint if no initial data is passed', async () => {
    fetch.mockResponse(JSON.stringify('testData'));

    let result;

    await act(async () => {
      result = renderHook(() => useData('http://test.com/api')).result;
    });

    expect(result.current).toBe('testData');
  });

  it('gracefully handles errors', async () => {
    fetch.mockResponse('Not Found', {
      status: 404,
    });

    let result;

    await act(async () => {
      result = renderHook(() => useData('http://test.com/api')).result;
    });

    expect(result.current).toBe(undefined);
  });
});
