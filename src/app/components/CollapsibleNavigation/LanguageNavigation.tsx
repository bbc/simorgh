import React from 'react';
import CollapsibleNavigation from '.';
import constants from './constants';

const LanguageNavigation = () => (
  <CollapsibleNavigation navigationSections={constants} as={React.Fragment} />
);

export default LanguageNavigation;
