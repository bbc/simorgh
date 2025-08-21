import React, { use } from 'react';
import CollapsibleNavigation from '../../../../components/CollapsibleNavigation';
import Navigation from '../../../psammead/psammead-navigation/src';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const LanguageNavigation = () => {
  const { script, service, dir, collapsibleNavigation } = use(ServiceContext);

  if (!collapsibleNavigation?.length) {
    return null;
  }

  return (
    <Navigation script={script} service={service} dir={dir}>
      <CollapsibleNavigation
        navigationSections={collapsibleNavigation}
        as={React.Fragment}
      />
    </Navigation>
  );
};

export default LanguageNavigation;
