import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock';
import path from 'path';

/*
 * Mock to avoid async behaviour in tests
 */
jest.mock('#contexts/ServiceContext');

global.Cypress = {
  env: jest.fn(),
};

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: true,
    media: query,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

Enzyme.configure({ adapter: new Adapter() });

global.fetch = fetch;
global.shallow = shallow;
global.mount = mount;
global.document.domain = 'www.bbc.com';

process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN = 'http://localhost:7080';
process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = '/';
process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
  __dirname,
  '../server/assets/fixture.json',
);
