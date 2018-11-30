import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import BrandContainer from '../../containers/Brand';

storiesOf('Brand', module).add('default', () => <BrandContainer />);
