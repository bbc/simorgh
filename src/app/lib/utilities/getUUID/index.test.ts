import getUUID from '.';

const randomUUIDSpy = jest.spyOn(global.crypto, 'randomUUID');
const getRandomValuesSpy = jest.spyOn(global.crypto, 'getRandomValues');

describe('getUUID', () => {
  const originalRandomUUID = global.crypto.randomUUID;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.crypto.randomUUID = originalRandomUUID;
  });

  it('should invoke the randomUUID function if it is supported', () => {
    (global.crypto.randomUUID as jest.Mock).mockImplementationOnce(
      () => 'mockId',
    );

    const uuid = getUUID();

    expect(randomUUIDSpy).toHaveBeenCalled();
    expect(uuid).toBe('mockId');
  });

  it('should invoke the getRandomValues function if randomUUID is not supported', () => {
    // @ts-expect-error override randomUUID for testing purposes
    global.crypto.randomUUID = null;

    (global.crypto.getRandomValues as jest.Mock).mockImplementationOnce(() => [
      12345, 67890, 98765, 54321, 24680,
    ]);

    const uuid = getUUID();

    expect(getRandomValuesSpy).toHaveBeenCalled();
    expect(uuid).toBe('12345-67890-98765-54321-24680');
  });
});
