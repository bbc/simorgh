import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Link from './index';

const link = name => ({
  href: 'https://www.bbc.co.uk/news',
  text: `Link ${name}`,
});

const exampleLink = link('BBC');

storiesOf('Link', module).add('default', () => (
  <Link text={exampleLink.text} href={exampleLink.href} />
));
