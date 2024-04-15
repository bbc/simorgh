import React from 'react';
import { render, screen, act } from '@testing-library/react';
import SidebarLabel from '.';

// mock useStorybookApi
jest.mock('@storybook/manager-api', () => ({
  useStorybookApi: jest.fn(() => {
    return {
      getData: () => {
        return {
          parameters: {
            metadata: {
              uxAccessibilityDoc: {
                done: false,
              },
              acceptanceCriteria: {
                done: true,
              },
              swarm: {
                done: true,
              },
            },
          },
        };
      },
    };
  }),
}));

describe('Storybook Sidebar Labels', () => {
  it('should return name when type is root', async () => {
    await act(async () => {
      render(
        <SidebarLabel
          item={{
            type: 'root',
            id: 'components-healthfactors',
            name: 'HealthFactors',
            parent: 'components',
            depth: 1,
            children: [
              'components-healthfactors--health-factors-with-complete-docs',
              'components-healthfactors--health-factors-with-outstanding-docs',
              'components-healthfactors--health-factors-with-invalid-data',
              'components-healthfactors--health-factors-with-no-data',
            ],
            isComponent: false,
            isLeaf: false,
            isRoot: true,
          }}
        />,
      );
    });

    const text = screen.getByText('HealthFactors');
    const sidbarText = screen.queryByText(', Component Health, incomplete.');
    expect(sidbarText).toBeNull();
    expect(text).toBeInTheDocument();
  });

  it('should return name when children is Null', async () => {
    await act(async () => {
      render(
        <SidebarLabel
          item={{
            type: 'component',
            id: 'components-healthfactors',
            name: 'HealthFactors',
            parent: 'components',
            depth: 1,
            isComponent: true,
            isLeaf: false,
            isRoot: false,
          }}
        />,
      );
    });
    const text = screen.getByText('HealthFactors');
    const sidbarText = screen.queryByText(', Component Health, incomplete.');
    expect(sidbarText).toBeNull();
    expect(text).toBeInTheDocument();
  });

  it('should return name when children are missing', async () => {
    await act(async () => {
      render(
        <SidebarLabel
          item={{
            type: 'story',
            id: 'components-healthfactors',
            name: 'HealthFactors',
            parent: 'components',
            depth: 1,
            children: [],
            isComponent: true,
            isLeaf: false,
            isRoot: false,
          }}
        />,
      );
    });
    const text = screen.getByText('HealthFactors');
    const sidbarText = screen.queryByText(', Component Health, incomplete.');
    expect(sidbarText).toBeNull();
    expect(text).toBeInTheDocument();
  });

  it('should return name when is not type component and it has not exaclty 1 children', async () => {
    await act(async () => {
      render(
        <SidebarLabel
          item={{
            type: 'story',
            id: 'components-healthfactors',
            name: 'HealthFactors',
            parent: 'components',
            depth: 1,
            children: [
              'components-healthfactors--health-factors-with-complete-docs',
              'components-healthfactors--health-factors-with-invalid-data',
              'components-healthfactors--health-factors-with-no-data',
            ],
            isComponent: false,
            isLeaf: false,
            isRoot: false,
          }}
        />,
      );
    });
    const text = screen.getByText('HealthFactors');
    const sidbarText = screen.queryByText(', Component Health, incomplete.');
    expect(sidbarText).toBeNull();
    expect(text).toBeInTheDocument();
  });

  it('should return sidebar label when is folder with children', async () => {
    await act(async () => {
      render(
        <SidebarLabel
          item={{
            type: 'story',
            id: 'components-healthfactors',
            name: 'HealthFactors',
            parent: 'components',
            depth: 1,
            children: [
              'components-healthfactors--health-factors-with-complete-docs',
              'components-healthfactors--health-factors-with-outstanding-docs',
              'components-healthfactors--health-factors-with-invalid-data',
              'components-healthfactors--health-factors-with-no-data',
            ],
            isComponent: true,
            isLeaf: false,
            isRoot: false,
          }}
        />,
      );
    });
    const text = screen.getByText(', Component Health, incomplete.');
    expect(text).toBeInTheDocument();
  });
});
