import React from 'react';
import SidebarLabel from '.';
import { render, screen, act } from '@testing-library/react';
import * as api from '@storybook/api';

describe('Storybook Sidebar Labels', () => {
  api.useStorybookApi = jest.fn().mockImplementation(() => {
    return {
      getData: () => {
        return 'this please';
      },
    };
  });

  it('should render the correct title when all docs are provided', async () => {
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

    screen.debug();
  });
});
