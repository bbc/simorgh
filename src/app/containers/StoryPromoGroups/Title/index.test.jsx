import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Title from '.';

describe(`Title`, () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should render Title',
      <ServiceContextProvider service="igbo">
        <Title>Title</Title>
      </ServiceContextProvider>,
    );
  });
});
