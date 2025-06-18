import config from '../../config/services';
import shouldSmokeTest from './index';

const PAGE_TYPE = 'photoGalleryPage';
const SERVICE = 'korean';

afterAll(() => {
  global.Cypress = jest.fn();
});

it('should return smoke value from config when env variable is true', () => {
  global.Cypress.env = jest.fn().mockReturnValue(true);
  config.korean.pageTypes.photoGalleryPage.smoke = false;
  expect(shouldSmokeTest(PAGE_TYPE, SERVICE)).toEqual(false);

  config.korean.pageTypes.photoGalleryPage.smoke = true;
  expect(shouldSmokeTest(PAGE_TYPE, SERVICE)).toEqual(true);
});

it('should return default smoke value when env variable if false', () => {
  global.Cypress.env = jest.fn().mockReturnValue(false);
  config.korean.pageTypes.photoGalleryPage.smoke = false;
  expect(shouldSmokeTest(PAGE_TYPE, SERVICE)).toEqual(true);

  config.korean.pageTypes.photoGalleryPage.smoke = true;
  expect(shouldSmokeTest(PAGE_TYPE, SERVICE)).toEqual(true);
});
