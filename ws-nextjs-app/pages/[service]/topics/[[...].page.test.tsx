import afriqueFixture from '#app/fixtures/topics/afrique.json';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import TopicsIndexPage from './TopicsIndexPage';
import { TopicsData } from './types';

const validTopicsData: TopicsData = {
  headline: 'Sujets',
  topics: [
    {
      topicName: 'Topic One',
      topicUrl: '/service/topics/id-1',
      id: 'id-1',
    },
    {
      topicName: 'Topic Two',
      topicUrl: '/service/topics/id-2',
      id: 'id-2',
    },
  ],
};

describe('TopicsIndexPage', () => {
  it('fails if any topic in the imported fixture has a malformed id or mismatched topicUrl', () => {
    const idFormat = /^[a-z0-9]{12}$/i; // alphanumeric, 12 chars
    afriqueFixture.topics.forEach(topic => {
      expect(typeof topic.id).toBe('string');
      expect(topic.id).toMatch(idFormat);
      const expectedUrl = `/afrique/topics/${topic.id}`;
      expect(topic.topicUrl).toBe(expectedUrl);
    });
  });
  it('renders topics page for valid service and matches snapshot', async () => {
    await act(async () => {
      render(
        <TopicsIndexPage service="afrique" topicsData={validTopicsData} />,
      );
    });
    expect(screen.getByText(validTopicsData.headline)).toBeInTheDocument();
    validTopicsData.topics.forEach(topic => {
      expect(screen.getByText(topic.topicName)).toBeInTheDocument();
    });
  });
  it('parses valid topic data and exposes all required fields', () => {
    render(<TopicsIndexPage service="afrique" topicsData={validTopicsData} />);
    validTopicsData.topics.forEach(topic => {
      expect(screen.getByText(topic.topicName)).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: topic.topicName }),
      ).toHaveAttribute('href', topic.topicUrl);
    });
  });
  it('fails if any topic in the imported fixture is missing required fields', () => {
    afriqueFixture.topics.forEach(topic => {
      expect(topic.topicName).toBeTruthy();
      expect(topic.topicUrl).toBeTruthy();
      expect(topic.id).toBeTruthy();
    });
  });

  //   it('should render all topics except ones with missing keys: topicName, topicUrl, id', async () => { TODO: implement
  //     // jest.resetModules();
  //     const invalidTopicsData = {
  //       headline: 'Sujets',
  //       topics: [
  //         { topicName: 'Topic missing id', topicUrl: '/service/topics/id-1' }, // missing id
  //         { topicName: 'Topic missing topicUrl', id: 'id-1' }, // missing topicUrl
  //         { topicUrl: '/service/topics/id-1', id: 'id-2' }, // missing topicName
  //         {
  //           topicName: 'Valid topic',
  //           topicUrl: '/service/topics/id-2',
  //           id: 'id-3',
  //         }, // valid
  //       ],
  //     };
  //     // jest.doMock('#app/fixtures/topics/afrique.json', () => invalidTopicsData, {
  //     //   virtual: true,
  //     // });
  //     const { getServerSideProps } = await import('./index.page');
  //     const context = {
  //       req: { headers: {} },
  //       query: { service: 'afrique' },
  //       res: {},
  //       resolvedUrl: '/afrique/topics',
  //       params: { service: 'afrique' },
  //     };

  //     // @ts-expect-error - props is not typed
  //     const { props } = await getServerSideProps(context);

  //     expect(props.status).toBe(200);

  //     await act(async () => {
  //       render(
  //         <TopicsIndexPage
  //           service="afrique"
  //           topicsData={props.topicsData as TopicsData}
  //         />,
  //       );
  //     });
  //     // Should only render the valid topic
  //     expect(screen.queryByText('Valid topic')).toBeInTheDocument();
  //     expect(screen.queryByText('Topic missing id')).not.toBeInTheDocument();
  //     expect(
  //       screen.queryByText('Topic missing topicUrl'),
  //     ).not.toBeInTheDocument();
  //     expect(
  //       screen.queryByRole('link', { name: '', hidden: true }),
  //     ).not.toBeInTheDocument();
  //     expect(
  //       screen
  //         .queryByRole('link', { name: /.+/, hidden: true })
  //         ?.getAttribute('href'),
  //     ).not.toBe('/service/topics/id-1');
  //     jest.dontMock('#app/fixtures/topics/afrique.json');
  //   });
});
