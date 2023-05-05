import '@testing-library/jest-dom/extend-expect';

global.setImmediate = jest.useRealTimers;
