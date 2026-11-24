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

const audioTagging = {
  predicate: 'http://www.bbc.co.uk/ontologies/bbc/primaryMediaType',
  value: 'http://www.bbc.co.uk/things/fe1fbc8a-bb44-4bf8-8b12-52e58c6345a4#id',
};

const videoTagging = {
  predicate: 'http://www.bbc.co.uk/ontologies/bbc/primaryMediaType',
  value: 'http://www.bbc.co.uk/things/ffc98bca-8cff-4ee6-9beb-a6ff6ef3ef9f#id',
};

describe('PageLayoutWrapper primaryMediaType', () => {
  beforeEach(() => {
    receivedProps = {};
  });

  it('should pass primaryMediaType as audio when the passport primaryMediaType tagging is audio', () => {
    render(
      <PageLayoutWrapper
        pageData={{
          metadata: {
            type: 'article',
            passport: { taggings: [audioTagging] },
          },
        }}
        status={200}
      />,
    );

    expect(receivedProps.primaryMediaType).toBe('audio');
  });

  it('should pass primaryMediaType as video when the passport primaryMediaType tagging is video', () => {
    render(
      <PageLayoutWrapper
        pageData={{
          metadata: {
            type: 'article',
            passport: { taggings: [videoTagging] },
          },
        }}
        status={200}
      />,
    );

    expect(receivedProps.primaryMediaType).toBe('video');
  });

  it('should not treat audio/video blockTypes or content blocks as primaryMediaType', () => {
    render(
      <PageLayoutWrapper
        pageData={{
          metadata: { type: 'article' },
          blockTypes: ['text', 'audio', 'video'],
          content: {
            model: {
              blocks: [{ type: 'audio' }, { type: 'video' }],
            },
          },
        }}
        status={200}
      />,
    );

    expect(receivedProps.primaryMediaType).toBeUndefined();
  });

  it('should return undefined when there is no passport primaryMediaType tagging', () => {
    render(
      <PageLayoutWrapper
        pageData={{
          metadata: { type: 'article', passport: { taggings: [] } },
        }}
        status={200}
      />,
    );

    expect(receivedProps.primaryMediaType).toBeUndefined();
  });

  it('should return undefined when passport is missing entirely', () => {
    render(
      <PageLayoutWrapper
        pageData={{
          metadata: { type: 'article' },
        }}
        status={200}
      />,
    );

    expect(receivedProps.primaryMediaType).toBeUndefined();
  });
});
