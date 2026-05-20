import { Fragment, use } from 'react';

import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import CollapsibleNavigation from '../../../../components/CollapsibleNavigation';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import Navigation from '../../../psammead/psammead-navigation/src';

const LanguageNavigation = () => {
  const { dir, collapsibleNavigation } = use(ServiceContext);

  if (!collapsibleNavigation?.length) {
    return null;
  }

  return (
    <Navigation dir={dir}>
      <VisuallyHiddenText>
        Navigation, BBC World Service regions
      </VisuallyHiddenText>
      <CollapsibleNavigation
        navigationSections={collapsibleNavigation}
        as={Fragment}
      />
    </Navigation>
  );
};

export default LanguageNavigation;
