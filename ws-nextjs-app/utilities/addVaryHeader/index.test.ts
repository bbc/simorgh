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
    jest.replaceProperty(process, 'env', {
      ...process.env,
      SIMORGH_APP_ENV: 'live',
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

  it.each(['local', 'test'])(
    'varies all %s responses by the renderer header, even without an override',
    environment => {
      process.env.SIMORGH_APP_ENV = environment;

      addVaryHeaders({
        ctx: mockCtx,
        serverSideExperiments: [
          { experimentName: 'experiment-1', variation: 'A', enabled: true },
        ],
      });

      expect(mockSetHeader).toHaveBeenCalledWith('Vary', [
        'X-Country',
        'X-Renderer-Env',
        'mvt-experiment-1',
      ]);
    },
  );
});
