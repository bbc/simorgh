import { configure, addDecorator } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import CanonicalDecorator from '../src/app/helpers/storybook/canonicalDecorator';

const req = require.context('../src/app', true, /\.stories\.jsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(CanonicalDecorator);

configure(loadStories, module);
