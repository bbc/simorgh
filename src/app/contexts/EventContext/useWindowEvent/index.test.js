import { useEffect } from 'react';
import { useWindowEvent } from './index';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useEffect: jest.fn().mockImplementation(original.useEffect),
  };
});

describe('useWindowEvent', () => {
  const fn1 = jest.fn();

  describe('mock useEffect', () => {
    const mockUseEffect = jest.fn(fn => fn);

    useEffect.mockImplementation(mockUseEffect);

    it('should call useEffect', () => {
      useWindowEvent('click', fn1);

      expect(mockUseEffect).toHaveBeenCalled();
    });
  });

  it('should trigger window click handler', () => {
    useEffect.mockImplementation(fn => fn());

    useWindowEvent('click', fn1, false);

    window.dispatchEvent(new Event('click'));

    expect(fn1).toHaveBeenCalled();
  });
});
