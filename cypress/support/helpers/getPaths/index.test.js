/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
describe('getPaths', () => {
  jest.mock('../../config/services', () => {
    return {
      serviceA: {
        pageTypes: {
          testPageType: {
            environments: {
              test: {
                paths: ['smoke/false/enabled/true'],
                enabled: true,
              },
            },
            smoke: false,
          },
        },
      },
      serviceB: {
        pageTypes: {
          testPageType: {
            environments: {
              test: {
                paths: ['/smoke/false/enabled/false'],
                enabled: false,
              },
            },
            smoke: false,
          },
        },
      },
      serviceC: {
        pageTypes: {
          testPageType: {
            environments: {
              test: {
                paths: ['/smoke/true/enabled/true'],
                enabled: true,
              },
            },
            smoke: true,
          },
        },
      },
      serviceD: {
        pageTypes: {
          testPageType: {
            environments: {
              test: {
                paths: ['/smoke/true/enabled/false'],
                enabled: false,
              },
            },
            smoke: true,
          },
        },
      },
    };
  });

  const pageType = 'testPageType';

  describe('Given CYPRESS_SMOKE is true', () => {
    let getPaths;
    beforeEach(() => {
      global.Cypress = {
        env: (name) => {
          switch (name) {
            case 'SMOKE':
              return true;
            case 'APP_ENV':
              return 'test';
            default:
              return null;
          }
        },
      };
      getPaths = require('.').default;
    });

    it('should not return paths which are not smoke but enabled', () => {
      expect(getPaths('serviceA', pageType)).toStrictEqual([]);
    });
    it('should not return paths which are not smoke and not enabled', () => {
      expect(getPaths('serviceB', pageType)).toStrictEqual([]);
    });
    it('should not return paths which are smoke but not enabled', () => {
      expect(getPaths('serviceD', pageType)).toStrictEqual([]);
    });
    it('should return paths which are smoke and enabled', () => {
      expect(getPaths('serviceC', pageType)).toMatchObject([
        '/smoke/true/enabled/true',
      ]);
    });
  });

  describe('Given CYPRESS_SMOKE is false', () => {
    let getPaths;
    beforeEach(() => {
      global.Cypress = {
        env: (name) => {
          switch (name) {
            case 'SMOKE':
              return false;
            case 'APP_ENV':
              return 'test';
            default:
              return null;
          }
        },
      };
      getPaths = require('.').default;
    });

    it('should return paths which are not smoke but enabled', () => {
      expect(getPaths('serviceA', pageType)).toMatchObject([
        'smoke/false/enabled/true',
      ]);
    });
    it('should not return paths which are not smoke and not enabled', () => {
      expect(getPaths('serviceB', pageType)).toStrictEqual([]);
    });
    it('should not return paths which are smoke but not enabled', () => {
      expect(getPaths('serviceD', pageType)).toStrictEqual([]);
    });
    it('should return paths which are smoke and enabled', () => {
      expect(getPaths('serviceC', pageType)).toMatchObject([
        '/smoke/true/enabled/true',
      ]);
    });
  });
});
