import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { queryByText } from '@testing-library/dom';
import { ToggleContext, ToggleContextProvider } from '.';

// eslint-disable-next-line react/prop-types
const TestComponent = ({ toggle, children }) => {
  const { toggleState } = useContext(ToggleContext);
  const toggleIsEnabled = toggleState[toggle] && toggleState[toggle].enabled;
  return toggleIsEnabled && <div>{children}</div>;
};

const mockRemoteToggles = {
  service: 'mundo',
  testToggle: {
    enabled: true,
  },
};

it('should render ads when remoteToggles are passed in that enable them', async () => {
  let container;

  await act(async () => {
    container = await render(
      <ToggleContextProvider remoteToggles={mockRemoteToggles}>
        <TestComponent toggle="testToggle">Dummy Ad Component</TestComponent>
      </ToggleContextProvider>,
    ).container;
  });

  expect(queryByText(container, 'Dummy Ad Component')).toBeInTheDocument();
});

it('should not render ads by default as no remoteToggles are passed in', async () => {
  let container;
  await act(async () => {
    container = await render(
      <ToggleContextProvider remoteToggles={null}>
        <TestComponent toggle="ads">Dummy Ad Component</TestComponent>
      </ToggleContextProvider>,
    ).container;
  });

  expect(queryByText(container, 'Dummy Ad Component')).not.toBeInTheDocument();
});
