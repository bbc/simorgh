import React from 'react';
import LanguageNavigation from './index';
import languageSections from './constants';

export default {
  title: 'Components/LanguageNavigation',
  component: LanguageNavigation,
};

export const Default = () => (
  <LanguageNavigation languageSections={languageSections} />
);
