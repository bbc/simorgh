import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Footer from './index';

const link = {
  href: 'Welcome to the BBC',
  text: 'https://www.bbc.co.uk',
};
const list = [{ link }];

storiesOf('Footer', module).add('default', () => (
  <Footer list={list} text="text" link={link} />
));
