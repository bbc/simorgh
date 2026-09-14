import { render } from '../react-testing-library-with-providers';
import PageLayoutWrapper from '.';

global.performance.getEntriesByName = jest.fn(() => []);

let receivedProps: Record<string, unknown> = {};

jest.mock('../../legacy/containers/Header', () => {
  return (props: Record<string, unknown>) => {
    receivedProps = props;
    return <div>Header</div>;
  };
});

describe('PageLayoutWrapper primaryMediaType', () => {
  beforeEach(() => {
    receivedProps = {};
  });

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

    expect(receivedProps.primaryMediaType).toBe('audio');
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

    expect(receivedProps.primaryMediaType).toBe('video');
  });

  it('should fallback to scanning content blocks for audio when blockTypes is empty', () => {
    render(
      <PageLayoutWrapper
        pageData={{
          metadata: { type: 'article' },
          blockTypes: [],
          content: {
            model: {
              blocks: [{ type: 'audio' }],
            },
          },
        }}
        status={200}
      />,
    );

    expect(receivedProps.primaryMediaType).toBe('audio');
  });

  it('should fallback to scanning content blocks for video when blockTypes is empty', () => {
    render(
      <PageLayoutWrapper
        pageData={{
          metadata: { type: 'article' },
          blockTypes: [],
          content: {
            model: {
              blocks: [{ type: 'video' }],
            },
          },
        }}
        status={200}
      />,
    );

    expect(receivedProps.primaryMediaType).toBe('video');
  });

  it('should return undefined when no media type is found in blockTypes or content blocks', () => {
    render(
      <PageLayoutWrapper
        pageData={{
          metadata: { type: 'article' },
          blockTypes: ['text', 'image'],
          content: {
            model: {
              blocks: [{ type: 'text' }],
            },
          },
        }}
        status={200}
      />,
    );

    expect(receivedProps.primaryMediaType).toBeUndefined();
  });
});
