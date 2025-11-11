import React from 'react';
import {
  render,
  act,
} from '#app/components/react-testing-library-with-providers';
import { useRouter } from 'next/router';
import withLiteRedirect from './liteRedirect';

const Component = withLiteRedirect(() => <div />);

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

describe('LiteRedirect', () => {
  beforeEach(() => {
    pushMock.mockReset();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });
  it.each([
    {
      effectiveType: 'randomValue',
      redirectUrl: undefined,
    },
    {
      effectiveType: 'slow-2g',
      redirectUrl: '/news/articles/c0g992jmmkko.lite',
    },
    {
      effectiveType: '2g',
      redirectUrl: '/news/articles/c0g992jmmkko.lite',
    },
    {
      effectiveType: '3g',
      redirectUrl: '/news/articles/c0g992jmmkko.lite',
    },
    {
      effectiveType: '4g',
      redirectUrl: undefined,
    },
  ])(
    `When the client is on $effectiveType then it should redirect to $redirectUrl`,
    async ({ effectiveType, redirectUrl }) => {
      Object.defineProperty(window, 'navigator', {
        writable: true,
        value: {
          connection: {
            effectiveType,
          },
        },
      });

      act(() => {
        render(<Component />);
      });

      expect(pushMock.mock.calls[0]?.[0]).toBe(redirectUrl);
    },
  );
});
