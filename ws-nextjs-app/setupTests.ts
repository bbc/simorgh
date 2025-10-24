import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util';
import { ReadableStream } from 'node:stream/web';
import { MessageChannel, MessagePort } from 'node:worker_threads';

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
  MessageChannel: { value: MessageChannel },
  MessagePort: { value: MessagePort },
  crypto: {
    value: {
      randomUUID: jest.fn(),
      getRandomValues: jest.fn(),
    },
  },
});

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

global.setImmediate =
  global.setImmediate ||
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((fn: (...args: any[]) => void, ...args: any) =>
    global.setTimeout(fn, 0, ...args));
