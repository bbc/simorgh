import { NextPageContext } from 'next/types';
import addVaryHeaders from '.';

describe('addVaryHeaders', () => {
  const mockSetHeader = jest.fn();
  const mockCtx = {
    res: {
      setHeader: mockSetHeader,
    },
  } as unknown as NextPageContext;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add the correct Vary headers', () => {
    addVaryHeaders({ ctx: mockCtx, serverSideExperiments: [] });

    expect(mockSetHeader).toHaveBeenCalledWith('Vary', ['X-Country']);
  });

  it('should include server-side experiment headers in Vary', () => {
    const serverSideExperiments = [
      {
        experimentName: 'experiment-1',
        variation: 'A',
        enabled: true,
      },
    ];

    addVaryHeaders({ ctx: mockCtx, serverSideExperiments });

    expect(mockSetHeader).toHaveBeenCalledWith('Vary', [
      'X-Country',
      'mvt-experiment-1',
    ]);
  });
});
