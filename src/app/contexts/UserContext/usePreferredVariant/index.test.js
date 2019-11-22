import { renderHook, act } from '@testing-library/react-hooks';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getPreferredVariant, setPreferredVariant } from '../cookies';
import usePreferredVariant from '.';

jest.mock('../cookies', () => ({
  getPreferredVariant: jest.fn(),
  setPreferredVariant: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
  useHistory: jest.fn(),
}));

describe('usePreferredVariant', () => {
  it('should update default variant and redirect', () => {
    getPreferredVariant.mockReturnValue('lat');
    useParams.mockReturnValue({ service: 'serbian', variant: '/lat' });
    const history = { push: jest.fn() };
    useHistory.mockReturnValue(history);
    useLocation.mockReturnValue({ pathname: '/serbian/lat' });

    const { result } = renderHook(() => usePreferredVariant());

    const [defaultVariant, setDefaultVariant] = result.current;

    expect(defaultVariant).toBe('lat');

    act(() => setDefaultVariant('cyr'));

    expect(setPreferredVariant).toHaveBeenCalledWith('serbian', 'cyr');
    expect(history.push).toHaveBeenCalledWith('/serbian/cyr');
  });
});
