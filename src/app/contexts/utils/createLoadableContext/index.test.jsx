import React, { useContext } from 'react';
import { cleanup, render, waitForElement } from '@testing-library/react';
import createLoadableContext from '.';
import { ServiceContext } from '../../ServiceContext';
import dynamicServiceFixtureData from './fixtures';

const Component = () => {
  const { foobar } = useContext(ServiceContext);

  return <span>{foobar}</span>;
};

afterEach(() => {
  cleanup();
});

it(`should pass fixture data as context from dynamic service`, async () => {
  const LoadableServiceProvider = createLoadableContext(
    ServiceContext,
    dynamicServiceFixtureData.fooService,
  );

  const { getByText } = render(
    <LoadableServiceProvider>
      <Component />
    </LoadableServiceProvider>,
  );

  const expectedFixtureText = 'valueFromFixtureData';

  await waitForElement(() => getByText(expectedFixtureText));

  expect(getByText(expectedFixtureText)).toBeTruthy();
});
