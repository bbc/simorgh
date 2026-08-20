import SERVICES from '#app/lib/config/services';
import { Services } from '#app/models/types/global';
import { act, render } from '../react-testing-library-with-providers';
import PageLayoutWrapper from '.';

global.performance.getEntriesByName = jest.fn(() => []);

// Capture props passed to HeaderContainer
let capturedHeaderProps: any = {};

jest.mock('#app/legacy/containers/Header', () => {
  return function MockHeaderContainer(props: any) {
    capturedHeaderProps = { ...props };
    return <header data-testid="header-container">Header</header>;
  };
});

describe('PageLayoutWrapper', () => {
  beforeEach(() => {
    capturedHeaderProps = {};
  });

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

  describe('primaryMediaType', () => {
    it('should pass primaryMediaType as audio when blockTypes includes audio', () => {
      render(
        <PageLayoutWrapper
          pageData={{
            metadata: { type: 'article' },
            blockTypes: ['text', 'audio', 'image'],
          }}
          status={200}
        />,
      );

      expect(capturedHeaderProps.primaryMediaType).toBe('audio');
    });

    it('should pass primaryMediaType as video when blockTypes includes video', () => {
      render(
        <PageLayoutWrapper
          pageData={{
            metadata: { type: 'article' },
            blockTypes: ['text', 'video', 'image'],
          }}
          status={200}
        />,
      );

      expect(capturedHeaderProps.primaryMediaType).toBe('video');
    });

    it('should fallback to scanning content blocks for audio when blockTypes is empty', () => {
      render(
        <PageLayoutWrapper
          pageData={{
            metadata: { type: 'article' },
            blockTypes: [],
            content: {
              model: {
                blocks: [
                  { type: 'paragraph' },
                  { type: 'audio' },
                ] as any,
              },
            },
          }}
          status={200}
        />,
      );

      expect(capturedHeaderProps.primaryMediaType).toBe('audio');
    });

    it('should fallback to scanning content blocks for video when blockTypes is empty', () => {
      render(
        <PageLayoutWrapper
          pageData={{
            metadata: { type: 'article' },
            blockTypes: [],
            content: {
              model: {
                blocks: [
                  { type: 'text' },
                  { type: 'video' },
                ] as any,
              },
            },
          }}
          status={200}
        />,
      );

      expect(capturedHeaderProps.primaryMediaType).toBe('video');
    });

    it('should return undefined when no media type is found in blockTypes or content blocks', () => {
      render(
        <PageLayoutWrapper
          pageData={{
            metadata: { type: 'article' },
            blockTypes: ['text', 'image'],
            content: {
              model: {
                blocks: [
                  { type: 'paragraph' },
                  { type: 'text' },
                ] as any,
              },
            },
          }}
          status={200}
        />,
      );

      expect(capturedHeaderProps.primaryMediaType).toBeUndefined();
    });
  });
});
