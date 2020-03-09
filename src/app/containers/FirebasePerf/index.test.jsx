import React from 'react';
import useToggle from '../Toggle/useToggle';

jest.mock('../Toggle/useToggle', () =>
  jest.fn().mockReturnValue({ enabled: true }),
);
