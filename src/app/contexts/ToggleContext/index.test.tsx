import React, { PropsWithChildren, useContext } from 'react';
import { render, act } from '@testing-library/react';
import { queryByText } from '@testing-library/dom';
import { Toggles } from '#models/types/global';
import { ToggleContext, ToggleContextProvider } from '.';

jest.mock('#lib/config/toggles', () => ({
  local: {
    testToggle: {
      enabled: true,
    },
  },
}));

type Props = {
  toggle: string;
};

const TestComponent = ({ toggle, children }: PropsWithChildren<Props>) => {
  const { toggleState } = useContext(ToggleContext);
  // @ts-expect-error - mocking a fake toggle
  const toggleIsEnabled = !!toggleState[toggle as Toggles]?.enabled;
  if (!toggleIsEnabled) {
    return null;
  }
  return <div>{children}</div>;
};

it('should render test component when toggles are passed in that enable them', async () => {
  const mockToggles = {
    testToggle: {
      enabled: true,
    },
  };

  let container!: HTMLElement;

  await act(async () => {
    ({ container } = await render(
      <ToggleContextProvider toggles={mockToggles}>
        <TestComponent toggle="testToggle">Dummy Component</TestComponent>
      </ToggleContextProvider>,
    ));
  });

  expect(queryByText(container, 'Dummy Component')).toBeInTheDocument();
});

it('should not render test component when toggle is set to false', async () => {
  const mockToggles = {
    testToggle: {
      enabled: false,
    },
  };

  let container!: HTMLElement;
  await act(async () => {
    ({ container } = await render(
      <ToggleContextProvider toggles={mockToggles}>
        <TestComponent toggle="testToggle">Dummy Component</TestComponent>
      </ToggleContextProvider>,
    ));
  });

  expect(queryByText(container, 'Dummy Component')).not.toBeInTheDocument();
});

it('should use default toggles if toggles are not passed into the component', async () => {
  let container!: HTMLElement;
  await act(async () => {
    ({ container } = await render(
      <ToggleContextProvider>
        <TestComponent toggle="testToggle">Dummy Component</TestComponent>
      </ToggleContextProvider>,
    ));
  });

  expect(queryByText(container, 'Dummy Component')).toBeInTheDocument();
});
