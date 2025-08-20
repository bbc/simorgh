import React, { use } from 'react';
import CollapsibleNavigation from '#app/components/CollapsibleNavigation';
import Navigation from '#psammead/psammead-navigation/src';
import { ServiceContext } from '#app/contexts/ServiceContext';
import sections from './constants';

const LanguageNavigation = () => {
  const { script, service, dir } = use(ServiceContext);

  return (
    <Navigation script={script} service={service} dir={dir}>
      <CollapsibleNavigation
        navigationSections={sections}
        as={React.Fragment}
      />
    </Navigation>
  );
};

export default LanguageNavigation;
