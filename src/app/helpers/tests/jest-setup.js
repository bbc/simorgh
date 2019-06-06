import Enzyme, { shallow, mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16'; // eslint-disable-line import/no-extraneous-dependencies
import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path';
import './createLoadableContextMock';

Enzyme.configure({ adapter: new Adapter() });

global.fetch = fetch;
global.shallow = shallow;
global.mount = mount;

process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
  __dirname,
  '../../../server/assets/fixture.json',
);
