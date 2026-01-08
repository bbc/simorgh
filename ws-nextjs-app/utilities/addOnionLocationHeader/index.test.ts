import { NextPageContext } from 'next/types';
import addOnionLocationHeader from '.';

describe('addOnionLocationHeader', () => {
  const mockSetHeader = jest.fn();
  const mockCtx = {
    asPath: '/test-path',
    res: {
      setHeader: mockSetHeader,
    },
  } as unknown as NextPageContext;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add the correct onion-location header', () => {
    addOnionLocationHeader({ ctx: mockCtx });

    expect(mockSetHeader).toHaveBeenCalledWith(
      'onion-location',
      'https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion/test-path',
    );
  });
});
