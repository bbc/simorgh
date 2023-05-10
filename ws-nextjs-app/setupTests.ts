import '@testing-library/jest-dom/extend-expect';
import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
