import React from 'react';
import {
  articleDataNews,
  articleDataPersian,
} from '#pages/ArticlePage/fixtureData';
import serbianFrontPageData from '#data/serbian/frontpage/lat.json';
import WithData from '.';
import { render } from '../../../../components/react-testing-library-with-providers';

jest.mock('#pages/ErrorPage/ErrorPage', () => ({ errorCode }) => (
  <h1>This is a {errorCode} error.</h1>
));

describe('withData HOC', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Component = () => <h1>Hola</h1>;
  const WithDataHOC = WithData(Component);

  const noDataProps = {
    status: 500,
    location: {},
  };

  const noAssetData = {
    status: 200,
    location: {},
  };

  const non200StatusProps = {
    pageData: articleDataNews,
    status: 157,
    location: {},
  };

  const validNewsProps = {
    pageData: articleDataNews,
    status: 200,
    service: 'news',
    location: {},
  };

  const validPersianProps = {
    pageData: articleDataPersian,
    status: 200,
    service: 'news',
    location: {},
  };

  const validFrontPagesProps = {
    pageData: serbianFrontPageData,
    status: 200,
    location: {},
  };

  describe('with no data', () => {
    it('should return the errorMain component and 500 status', () => {
      const { container } = render(<WithDataHOC {...noDataProps} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('with missing pageData', () => {
    it('should return the errorMain component', () => {
      const { container } = render(<WithDataHOC {...noAssetData} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('with valid articles data', () => {
    it('should return the passed in component', () => {
      const { container } = render(<WithDataHOC {...validNewsProps} />);
      expect(container).toMatchSnapshot();
    });

    describe('but different home service other than locale service', () => {
      it('should return the errorMain component', () => {
        const { container } = render(<WithDataHOC {...validPersianProps} />);
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('with valid front-pages data', () => {
    it('should return the passed in component', () => {
      const { container } = render(<WithDataHOC {...validFrontPagesProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('with non 200 status', () => {
    it('should return the errorMain component', () => {
      const { container } = render(<WithDataHOC {...non200StatusProps} />);
      expect(container).toMatchSnapshot();
    });
  });
});
