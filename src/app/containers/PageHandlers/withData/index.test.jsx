import React from 'react';
import {
  shouldShallowMatchSnapshot,
  suppressPropWarnings,
} from '../../../../testHelpers';
import { articleDataNews, articleDataPersian } from '../../Article/fixtureData';
import { WithData, shouldRender } from '.';
import frontPageDataPidgin from '../../../../../data/pidgin/frontpage';

describe('withData HOC', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Component = () => <h1>Hola</h1>;
  const WithDataHOC = WithData(Component);

  const noDataProps = {
    data: null,
  };

  const noAssetData = {
    data: {
      status: 200,
    },
  };

  const non200StatusProps = {
    data: {
      pageData: articleDataNews,
      status: 157,
    },
  };

  const validNewsProps = {
    data: {
      pageData: articleDataNews,
      status: 200,
    },
    service: 'news',
  };

  const validPersianProps = {
    data: {
      pageData: articleDataPersian,
      status: 200,
    },
    service: 'news',
  };

  const validFrontPagesProps = {
    data: {
      pageData: frontPageDataPidgin,
      status: 200,
    },
  };

  const validPortugueseData = {
    pageData: {
      metadata: {
        passport: {
          home: 'brasil',
        },
      },
    },
    status: 200,
  };

  const invalidPortugueseData = {
    pageData: {
      metadata: {
        passport: {
          home: 'brasil',
        },
      },
    },
    status: 404,
  };

  describe('with no data', () => {
    suppressPropWarnings(['data.dials', 'undefined']);
    shouldShallowMatchSnapshot(
      'should return the errorMain component and 500 status',
      <WithDataHOC {...noDataProps} />,
    );
  });

  describe('with missing pageData', () => {
    suppressPropWarnings(['data.pageData', 'undefined']);
    shouldShallowMatchSnapshot(
      'should return the errorMain component',
      <WithDataHOC {...noAssetData} />,
    );
  });

  describe('with valid articles data', () => {
    shouldShallowMatchSnapshot(
      'should return the passed in component',
      <WithDataHOC {...validNewsProps} />,
    );

    describe('but different home service other than locale service', () => {
      shouldShallowMatchSnapshot(
        'should return the errorMain component',
        <WithDataHOC {...validPersianProps} />,
      );
    });
  });

  describe('with valid front-pages data', () => {
    shouldShallowMatchSnapshot(
      'should return the passed in component',
      <WithDataHOC {...validFrontPagesProps} />,
    );
  });

  describe('with non 200 status', () => {
    shouldShallowMatchSnapshot(
      'should return the errorMain component',
      <WithDataHOC {...non200StatusProps} />,
    );
  });

  describe('passport home override', () => {
    jest.mock('../../../contexts/ServiceContext', () => {
      const mockReact = jest.requireActual('react');
      return jest.fn().mockImplementation(
        mockReact.createContext({
          passportHomes: ['brasil'],
        }),
      );
    });

    it('should match passport home override', () => {
      const service = 'portuguese';
      const { hasData200StatusAndCorrectService, status } = shouldRender(
        validPortugueseData,
        service,
        ['brasil'],
      );
      expect(status).toEqual(200);
      expect(hasData200StatusAndCorrectService).toEqual(true);
    });

    it('should NOT match passport home override', () => {
      const service = 'portuguese';
      const { hasData200StatusAndCorrectService, status } = shouldRender(
        validPortugueseData,
        service,
        ['xyz'],
      );
      expect(status).toEqual(404);
      expect(hasData200StatusAndCorrectService).toEqual(false);
    });

    describe('no passportHomeOverride', () => {
      it('should NOT match passport home override', () => {
        const service = 'portuguese';
        const { hasData200StatusAndCorrectService, status } = shouldRender(
          validPortugueseData,
          service,
        );
        expect(status).toEqual(404);
        expect(hasData200StatusAndCorrectService).toEqual(false);
      });
    });

    describe('null passportHomeOverride', () => {
      it('should NOT match passport home override', () => {
        const service = 'portuguese';
        const { hasData200StatusAndCorrectService, status } = shouldRender(
          validPortugueseData,
          service,
          null,
        );
        expect(status).toEqual(404);
        expect(hasData200StatusAndCorrectService).toEqual(false);
      });
    });

    it('should return 404 status', () => {
      const service = 'portuguese';
      const { hasData200StatusAndCorrectService, status } = shouldRender(
        invalidPortugueseData,
        service,
        ['brasil'],
      );
      expect(status).toEqual(404);
      expect(hasData200StatusAndCorrectService).toEqual(false);
    });
  });
});
