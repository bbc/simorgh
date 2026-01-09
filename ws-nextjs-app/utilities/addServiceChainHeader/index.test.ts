import { NextPageContext } from 'next/types';
import addServiceChainHeader from '.';

describe('addServiceChainHeader', () => {
  const mockSetHeader = jest.fn();
  const mockCtx = {
    req: {
      headers: {
        'req-svc-chain': 'UPSTREAM_A',
      },
    },
    res: {
      setHeader: mockSetHeader,
    },
  } as unknown as NextPageContext;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add the correct req-svc-chain header', () => {
    addServiceChainHeader({ ctx: mockCtx });

    expect(mockSetHeader).toHaveBeenCalledWith(
      'req-svc-chain',
      expect.stringContaining('UPSTREAM_A'),
    );
  });
});
