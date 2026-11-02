import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import { NextPageContext } from 'next';
import getRequestProps from '#utilities/pageRequests/getRequestProps';
import ErrorPage from './_error.page';

jest.mock('#utilities/pageRequests/getRequestProps', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    nonce: 'error-nonce',
    toggles: {},
  }),
}));

const mockGetRequestProps = jest.mocked(getRequestProps);
const createContext = () => {
  const req = new IncomingMessage(new Socket());
  const res = new ServerResponse(req);
  res.statusCode = 500;

  return {
    req,
    res,
    pathname: '/_error',
    asPath: '/pidgin/articles/c0000000000o',
    query: {},
    AppTree: () => null,
  } satisfies NextPageContext;
};

describe('ErrorPage.getInitialProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets up shared request props for server-rendered errors', async () => {
    const ctx = createContext();
    const props = await ErrorPage.getInitialProps(ctx);

    expect(mockGetRequestProps).toHaveBeenCalledWith(ctx);
    expect(props).toMatchObject({
      nonce: 'error-nonce',
      toggles: {},
      status: 500,
      statusCode: 500,
    });
  });

  it('does not run server setup during static error rendering', async () => {
    const ctx = createContext();
    const props = await ErrorPage.getInitialProps({
      ...ctx,
      req: undefined,
      res: undefined,
    });

    expect(mockGetRequestProps).not.toHaveBeenCalled();
    expect(props).toEqual({ statusCode: 404 });
  });

  it('preserves the status of client errors without running server setup', async () => {
    const ctx = createContext();
    const props = await ErrorPage.getInitialProps({
      ...ctx,
      req: undefined,
      res: undefined,
      err: Object.assign(new Error('Client error'), { statusCode: 503 }),
    });

    expect(mockGetRequestProps).not.toHaveBeenCalled();
    expect(props).toEqual({ statusCode: 503 });
  });
});
