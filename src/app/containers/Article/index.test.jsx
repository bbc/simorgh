import React from 'react';
import { render } from 'react-testing-library';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import ArticleContainer from './index';
// Import a react-testing-library method
import { articleDataNews, articleDataPersian } from './fixtureData';

const persianData = {
  data: articleDataPersian,
  isAmp: false,
  service: 'persian',
};

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();
const newsData = { data: articleDataNews, isAmp: false, service: 'news' };

// temporary: will be removed with https://github.com/BBC-News/simorgh/issues/836
const newsDataNoHeadline = JSON.parse(JSON.stringify(newsData));
newsDataNoHeadline.data.content.model.blocks.shift();

describe('ArticleContainer Jest', () => {
  describe('Component', () => {
    shouldShallowMatchSnapshot(
      'should render news correctly',
      <ArticleContainer data={newsData} />,
    );

    shouldShallowMatchSnapshot(
      'should render Persian article correctly',
      <ArticleContainer data={persianData} />,
    );

    shouldShallowMatchSnapshot(
      'should render null if no headline block',
      <ArticleContainer data={newsDataNoHeadline} />,
    );

    describe('no data', () => {
      shouldShallowMatchSnapshot(
        'should render correctly',
        <ArticleContainer />,
      );
    });
  });
});

describe('ArticleContainer react-testing-library', () => {
  it('should render news correctly', () => {
    const { baseElement } = render(<ArticleContainer data={newsData} />);
    expect(baseElement.firstChild).toMatchSnapshot();
  });

  it('should render Persian article correctly', () => {
    const { baseElement } = render(<ArticleContainer data={persianData} />);
    expect(baseElement.firstChild).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { baseElement } = render(<ArticleContainer data={newsData} />);
    expect(baseElement.firstChild).toMatchSnapshot();
  });

  it('should render null if no headline block', () => {
    const { container } = render(
      <ArticleContainer data={newsDataNoHeadline} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
