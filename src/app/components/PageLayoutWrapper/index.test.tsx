import SERVICES from '#app/lib/config/services';
import { Services } from '#app/models/types/global';
import { Helmet } from 'react-helmet';
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

  it('escapes a `</script>` breakout attempt in a topic name before it is inlined', async () => {
    const originalJestWorkerId = process.env.JEST_WORKER_ID;
    delete process.env.JEST_WORKER_ID;

    try {
      await act(() =>
        render(
          <PageLayoutWrapper
            status={200}
            pageData={{
              metadata: {
                type: 'article',
                topics: [
                  {
                    topicName: '</script><script>alert(1)</script>',
                    topicId: 'c000000001',
                  },
                ],
              },
            }}
          />,
          { service: 'arabic' },
        ),
      );

      const { scriptTags } = Helmet.peek();
      const wrapperScript = scriptTags.find(scriptTag =>
        scriptTag.innerHTML.includes('wrappedTopics'),
      );

      expect(wrapperScript).toBeDefined();
      expect(wrapperScript?.innerHTML).not.toContain('</script>');
      expect(wrapperScript?.innerHTML).toContain('&lt;/script>&lt;script>');
    } finally {
      process.env.JEST_WORKER_ID = originalJestWorkerId;
    }
  });

  describe('executing the generated script in a browser-like environment', () => {
    const renderWithTopic = async (topicName: string) => {
      // react-helmet inserts the script into the real document, and jsdom
      // then runs it automatically. Stubbing `appendChild` stops that
      // automatic run so the script only executes once, below. This
      // doesn't affect `Helmet.peek()`, which reads from component state,
      // not the DOM.
      const appendChildSpy = jest
        .spyOn(document.head, 'appendChild')
        .mockImplementation(node => node);

      await act(() =>
        render(
          <PageLayoutWrapper
            status={200}
            pageData={{
              metadata: {
                type: 'article',
                topics: [{ topicName, topicId: 'c000000001' }],
              },
            }}
          />,
          { service: 'arabic' },
        ),
      );

      appendChildSpy.mockRestore();

      const { scriptTags } = Helmet.peek();
      const wrapperScript = scriptTags.find(scriptTag =>
        scriptTag.innerHTML.includes('wrappedTopics'),
      );
      expect(wrapperScript).toBeDefined();

      // Run the exact script sent to the browser using only real globals
      // (window, document, localStorage), proving it's valid, executable
      // JavaScript, not just correctly escaped text.
      // eslint-disable-next-line no-new-func
      new Function(wrapperScript?.innerHTML as string)();
    };

    let originalJestWorkerId: string | undefined;

    beforeEach(() => {
      originalJestWorkerId = process.env.JEST_WORKER_ID;
      delete process.env.JEST_WORKER_ID;
      localStorage.clear();
    });

    afterEach(() => {
      process.env.JEST_WORKER_ID = originalJestWorkerId;
      delete (window as unknown as { xssExecuted?: boolean }).xssExecuted;
    });

    it('stores a legitimate topic name unmodified after execution', async () => {
      await renderWithTopic('Climate Change');

      const topics = JSON.parse(
        localStorage.getItem('ws_bbc_topics') as string,
      );

      expect(topics.arabic['Climate Change']).toEqual({
        count: 1,
        id: 'c000000001',
        path: '/arabic/topics/c000000001',
      });
    });

    it('safely escapes a `</script>` breakout attempt without executing injected script content', async () => {
      await renderWithTopic(
        '</script><script>window.xssExecuted = true;</script>',
      );

      expect(
        (window as unknown as { xssExecuted?: boolean }).xssExecuted,
      ).toBeUndefined();

      const topics = JSON.parse(
        localStorage.getItem('ws_bbc_topics') as string,
      );

      expect(
        topics.arabic[
          '&lt;/script>&lt;script>window.xssExecuted = true;&lt;/script>'
        ],
      ).toEqual({
        count: 1,
        id: 'c000000001',
        path: '/arabic/topics/c000000001',
      });
    });
  });
});
