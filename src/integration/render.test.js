/**
 * @jest-environment jsdom
 */

import { JSDOM } from 'jsdom';
import render from './render';

const consoleWarnSpy = jest.spyOn(console, 'warn');

it('should return DOM from a given url path', async () => {
  JSDOM.fromURL = jest
    .fn()
    .mockResolvedValue(
      new JSDOM(
        `<html><head><title>Some HTML</title></head><body></body></html>`,
      ),
    );
  const result = await render('/some/path');
  const pageTitle = result.document.querySelector('title').textContent;

  expect(pageTitle).toBe('Some HTML');
});

it('should retry to render the DOM if network request fails', async () => {
  JSDOM.fromURL = jest
    .fn()
    .mockRejectedValueOnce(new Error('Async error'))
    .mockRejectedValueOnce(new Error('Async error'))
    .mockRejectedValueOnce(new Error('Async error'))
    .mockResolvedValue(
      new JSDOM(
        `<html><head><title>Some HTML</title></head><body></body></html>`,
      ),
    );
  await render('/some/path');

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    'Error getting DOM from http://localhost:7080/some/path',
    'Retry attempts: 1',
  );
  expect(consoleWarnSpy).toHaveBeenCalledWith(
    'Error getting DOM from http://localhost:7080/some/path',
    'Retry attempts: 2',
  );
  expect(consoleWarnSpy).toHaveBeenCalledWith(
    'Error getting DOM from http://localhost:7080/some/path',
    'Retry attempts: 3',
  );
});
