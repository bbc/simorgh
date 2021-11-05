import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { queryByText } from '@testing-library/dom';
import { ToggleContext, ToggleContextProvider } from '.';

jest.mock('#lib/config/toggles', () => ({
  local: {
    testToggle: {
      enabled: true,
    },
  },
}));

// eslint-disable-next-line react/prop-types
const TestComponent = ({ toggle, children }) => {
  const { toggleState } = useContext(ToggleContext);
  const toggleIsEnabled = toggleState[toggle] && toggleState[toggle].enabled;
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

  let container;
  await act(async () => {
    container = await render(
      <ToggleContextProvider toggles={mockToggles}>
        <TestComponent toggle="testToggle">Dummy Component</TestComponent>
      </ToggleContextProvider>,
    ).container;
  });

  expect(queryByText(container, 'Dummy Component')).toBeInTheDocument();
});

it('should not render test component when toggle is set to false', async () => {
  const mockToggles = {
    testToggle: {
      enabled: false,
    },
  };

  let container;
  await act(async () => {
    container = await render(
      <ToggleContextProvider toggles={mockToggles}>
        <TestComponent toggle="testToggle">Dummy Component</TestComponent>
      </ToggleContextProvider>,
    ).container;
  });

  expect(queryByText(container, 'Dummy Component')).not.toBeInTheDocument();
});

it('should use default toggles if toggles are not passed into the component', async () => {
  let container;
  await act(async () => {
    container = await render(
      <ToggleContextProvider>
        <TestComponent toggle="testToggle">Dummy Component</TestComponent>
      </ToggleContextProvider>,
    ).container;
  });

  expect(queryByText(container, 'Dummy Component')).toBeInTheDocument();
});
