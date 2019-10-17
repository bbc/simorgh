import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import Title from '.';

describe(`Title`, () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should render visual title',
      <ServiceContextProvider service="igbo">
        <Title>Title</Title>
      </ServiceContextProvider>,
    );

    shouldMatchSnapshot(
      'should render visually hidden title',
      <ServiceContextProvider service="igbo">
        <Title isVisuallyHidden>Title</Title>
      </ServiceContextProvider>,
    );

    shouldMatchSnapshot(
      'should render title without service provided',
      <Title>Title</Title>,
    );
  });
});
