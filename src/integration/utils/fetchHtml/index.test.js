/* eslint-disable no-console */
import fetchHtml from '.';

const showWarningsInConsole = false; // set to true if you want to see the retry messages in the console when running tests
const { warn } = console;
console.warn = jest.fn((...messages) => {
  if (showWarningsInConsole) {
    warn(...messages);
  }
});

describe('fetchHtml', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const html = `<html><head><title>Some HTML</title></head><body></body></html>`;

  it('should return document from a given url path', async () => {
    fetch.mockResponse(JSON.stringify(html));
    const { document } = await fetchHtml({
      url: 'http://localhost:7080/some/path',
    });
    const pageTitle = document.querySelector('title').textContent;

    expect(pageTitle).toBe('Some HTML');
  });

  it('should retry to fetch the HTML if socket hang up error occurs', async () => {
    fetch
      .mockRejectedValueOnce(new Error('socket hang up'))
      .mockRejectedValueOnce(new Error('socket hang up'))
      .mockRejectedValueOnce(new Error('socket hang up'))
      .mockResponse(JSON.stringify(html));

    const { document } = await fetchHtml({
      url: 'http://localhost:7080/some/path',
    });
    const pageTitle = document.querySelector('title').textContent;

    expect(console.warn).toHaveBeenCalledWith(
      'Error getting HTML from http://localhost:7080/some/path',
      'Retry attempts: 1',
    );
    expect(console.warn).toHaveBeenCalledWith(
      'Error getting HTML from http://localhost:7080/some/path',
      'Retry attempts: 2',
    );
    expect(console.warn).toHaveBeenCalledWith(
      'Error getting HTML from http://localhost:7080/some/path',
      'Retry attempts: 3',
    );
    expect(pageTitle).toBe('Some HTML');
  });

  it('should not retry if failure is not a socket hang up error and throw error as normal', async () => {
    fetch.mockRejectedValueOnce(new Error('Some error'));

    await expect(
      fetchHtml('http://localhost:7080/some/path'),
    ).rejects.toThrow();
  });
});
