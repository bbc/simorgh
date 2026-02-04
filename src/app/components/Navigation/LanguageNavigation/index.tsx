import { Fragment, use } from 'react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import CollapsibleNavigation from '#app/components/CollapsibleNavigation';
import Navigation from '#app/legacy/psammead/psammead-navigation/src';
import { ServiceContext } from '#app/contexts/ServiceContext';

const LanguageNavigation = () => {
  const { script, service, dir, collapsibleNavigation } = use(ServiceContext);

  if (!collapsibleNavigation?.length) {
    return null;
  }

  return (
    <Navigation script={script} service={service} dir={dir}>
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
