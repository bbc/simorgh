import React from 'react';
import { render, screen, act } from '@testing-library/react';
import HealthFactorsSidebarLabel from '.';

describe('Storybook Sidebar Labels', () => {
  it('should render story title correctly', async () => {
    await act(async () => {
      render(
        <HealthFactorsSidebarLabel
          metadata={{
            uxAccessibilityDoc: {
              done: true,
            },
            acceptanceCriteria: {
              done: true,
            },
            swarm: {
              done: true,
            },
          }}
          name="test_name"
        />,
      );
    });

    const title = screen.getByText('test_name');
    expect(title).toBeInTheDocument();
  });

  it('should render correct hidden text for completed health factors', async () => {
    await act(async () => {
      render(
        <HealthFactorsSidebarLabel
          metadata={{
            uxAccessibilityDoc: {
              done: true,
            },
            acceptanceCriteria: {
              done: true,
            },
            swarm: {
              done: true,
            },
          }}
          name="test_name"
        />,
      );
    });

    const title = screen.getByText(', Component Health, complete.');
    expect(title).toBeInTheDocument();
  });

  it('should render correct hidden text for outstanding actions health factors', async () => {
    await act(async () => {
      render(
        <HealthFactorsSidebarLabel
          metadata={{
            uxAccessibilityDoc: {
              done: false,
            },
            acceptanceCriteria: {
              done: true,
            },
            swarm: {
              done: true,
            },
          }}
          name="test_name"
        />,
      );
    });

    const title = screen.getByText(', Component Health, incomplete.');
    expect(title).toBeInTheDocument();
  });

  it('should render correct hidden text for outstanding actions health factors', async () => {
    await act(async () => {
      render(<HealthFactorsSidebarLabel metadata={null} name="test_name" />);
    });

    const title = screen.getByText(', Component Health, missing.');
    expect(title).toBeInTheDocument();
  });

  it('should render correct icon for completed health factors', async () => {
    await act(async () => {
      render(
        <HealthFactorsSidebarLabel
          metadata={{
            uxAccessibilityDoc: {
              done: true,
            },
            acceptanceCriteria: {
              done: true,
            },
            swarm: {
              done: true,
            },
          }}
          name="test_name"
        />,
      );
    });

    const icon = screen.getByTestId('recommend');
    expect(icon).toBeInTheDocument();
  });

  it('should render correct icon for outstanding actions health factors', async () => {
    await act(async () => {
      render(
        <HealthFactorsSidebarLabel
          metadata={{
            uxAccessibilityDoc: {
              done: false,
            },
            acceptanceCriteria: {
              done: true,
            },
            swarm: {
              done: true,
            },
          }}
          name="test_name"
        />,
      );
    });

    const icon = screen.getByTestId('warning');
    expect(icon).toBeInTheDocument();
  });

  it('should render correct icon for outstanding actions health factors', async () => {
    await act(async () => {
      render(<HealthFactorsSidebarLabel metadata={null} name="test_name" />);
    });

    const icon = screen.getByTestId('activity');
    expect(icon).toBeInTheDocument();
  });
});
