import SERVICES from '#app/lib/config/services';
import { Services } from '#app/models/types/global';
import { act, render } from '../react-testing-library-with-providers';
import PageLayoutWrapper from '.';

global.performance.getEntriesByName = jest.fn(() => []);

describe('PageLayoutWrapper', () => {
  it('should render default page wrapper with children', async () => {
    const { container } = render(
      <PageLayoutWrapper
        // @ts-expect-error - metadata type is mocked for test purposes
        pageData={{ metadata: { type: 'test-page-type' } }}
        status={200}
      >
        <h2>Child element</h2>
      </PageLayoutWrapper>,
    );

    expect(container).toMatchSnapshot();
  });

  it.each(SERVICES)('should render fonts for %s', async (service: Services) => {
    await act(() =>
      render(
        <PageLayoutWrapper
          status={200}
          // @ts-expect-error - metadata type is mocked for test purposes
          pageData={{ metadata: { type: 'test-page-type' } }}
        />,
        { service },
      ),
    );

    const element = document.querySelector('[dir]');

    // @ts-expect-error element will not be null
    const style = window.getComputedStyle(element);

    expect({
      'font-family': style.getPropertyValue('font-family'),
      'font-style': style.getPropertyValue('font-style'),
      'font-weight': style.getPropertyValue('font-weight'),
    }).toMatchSnapshot();
  });
});
