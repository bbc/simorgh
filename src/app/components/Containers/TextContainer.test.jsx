import React from 'react';
import TextContainer from './TextContainer';
import { isNull } from '../../helpers/tests/testHelpers';

describe('TextContainer', () => {
  describe('with no data', () => {
    isNull('should return null', <TextContainer />);
  });
});
