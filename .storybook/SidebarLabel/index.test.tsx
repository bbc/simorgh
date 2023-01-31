import React from 'react';
import { render, screen, act } from '@testing-library/react';
import * as api from '@storybook/api';
import SidebarLabel from '.';

describe('Storybook Sidebar Labels', () => {
  beforeEach(() => {
    api.useStorybookApi = jest.fn().mockImplementation(() => {
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
    });
  });

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
    expect(text).toBeInTheDocument();
  });

  it('should return Sidebar component when type is group', async () => {
    await act(async () => {
      render(
        <SidebarLabel
          item={{
            type: 'group',
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
            isRoot: false,
          }}
        />,
      );
    });
    const text = screen.getByText(', Component Health: incomplete');
    expect(text).toBeInTheDocument();
  });

  it('should return SideBar component when type is component', async () => {
    await act(async () => {
      render(
        <SidebarLabel
          item={{
            type: 'component',
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
    const text = screen.getByText(', Component Health: incomplete');
    expect(text).toBeInTheDocument();
  });

  it('should return SideBar component when type is story', async () => {
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
    const text = screen.getByText(', Component Health: incomplete');
    expect(text).toBeInTheDocument();
  });
});
