import React from 'react';
import { render } from '../react-testing-library-with-providers';
import PageLayoutWrapper from '.';

global.performance.getEntriesByName = jest.fn(() => []);

describe('PageLayoutWrapper', () => {
  it('should render default page wrapper with children', async () => {
    const { container } = render(
      <PageLayoutWrapper
        pageData={{ pageType: 'STY', metadata: { type: 'STY' } }}
        status={200}
      >
        <h2>Child element</h2>
      </PageLayoutWrapper>,
    );

    expect(container).toMatchSnapshot();
  });
});
