import React, { useContext } from 'react';
import { cleanup, render, waitForElement } from '@testing-library/react';
import createLoadableContext from '.';
import { ServiceContext } from '../../ServiceContext';
import dynamicServiceFixtureData from './fixtures';

const Component = () => {
  const { foobar } = useContext(ServiceContext);

  return <span>{foobar}</span>;
};

describe('createLoadableContext', () => {
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

  it(`should pass configKey and use to access fixture data`, async () => {
    const LoadableServiceProvider = createLoadableContext(
      ServiceContext,
      dynamicServiceFixtureData.fooService,
    );

    const { getByText } = render(
      <LoadableServiceProvider configKey="simp">
        <Component />
      </LoadableServiceProvider>,
    );

    const expectedFixtureText = 'valueFromSimpVariantFixtureData';

    await waitForElement(() => getByText(expectedFixtureText));

    expect(getByText(expectedFixtureText)).toBeTruthy();
  });
});
