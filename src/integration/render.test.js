/**
 * @jest-environment jsdom
 */

/* eslint-disable no-console */

import { JSDOM } from 'jsdom';
import render from './render';

const showWarningsInConsole = false; // set to true if you want to see the retry messages in the console when running tests
const { warn } = console;
console.warn = jest.fn((...messages) => {
  if (showWarningsInConsole) {
    warn(...messages);
  }
});

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

it('should retry to render the DOM if socket hang up error occurs', async () => {
  JSDOM.fromURL = jest
    .fn()
    .mockRejectedValueOnce(new Error('socket hang up'))
    .mockRejectedValueOnce(new Error('socket hang up'))
    .mockRejectedValueOnce(new Error('socket hang up'))
    .mockResolvedValue(
      new JSDOM(
        `<html><head><title>Some HTML</title></head><body></body></html>`,
      ),
    );

  const result = await render('/some/path');
  const pageTitle = result.document.querySelector('title').textContent;

  expect(console.warn).toHaveBeenCalledWith(
    'Error getting DOM from http://localhost:7080/some/path',
    'Retry attempts: 1',
  );
  expect(console.warn).toHaveBeenCalledWith(
    'Error getting DOM from http://localhost:7080/some/path',
    'Retry attempts: 2',
  );
  expect(console.warn).toHaveBeenCalledWith(
    'Error getting DOM from http://localhost:7080/some/path',
    'Retry attempts: 3',
  );
  expect(pageTitle).toBe('Some HTML');
});

it('should not retry if failure is not a socket hang up error and throw error as normal', async () => {
  JSDOM.fromURL = jest.fn().mockRejectedValueOnce(new Error('Some error'));

  await expect(render('/some/path')).rejects.toThrow();
});
