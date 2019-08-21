import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock';
import path from 'path';

/*
 * Mock to avoid async behaviour in tests
 */
jest.mock('../app/contexts/ServiceContext');

Enzyme.configure({ adapter: new Adapter() });

global.fetch = fetch;
global.shallow = shallow;
global.mount = mount;

process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
  __dirname,
  '../server/assets/fixture.json',
);
