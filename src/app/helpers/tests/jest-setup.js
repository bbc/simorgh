import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path';

Enzyme.configure({ adapter: new Adapter() });

global.fetch = fetch;
global.shallow = shallow;
global.mount = mount;

process.env.SPARTACUS_ASSETS_MANIFEST_PATH = path.resolve(
  __dirname,
  '../../../server/assets/fixture.json',
);
