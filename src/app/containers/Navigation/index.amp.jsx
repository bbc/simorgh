import React from 'react';
import Navigation from '@bbc/psammead-navigation';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { AmpScrollableNavigation } from '@bbc/psammead-navigation/scrollable';
import { AmpMenuButton } from '@bbc/psammead-navigation/dropdown';

const AmpNavigationContainer = ({
  script,
  service,
  skipLinkText,
  dir,
  menuAnnouncedText,
  scrollableListItems,
  dropdownListItems,
  dropdownId,
}) => {
  const scrollableId = 'scrollable-nav';
  const navigationId = 'navigation-id';
  const open = 'open';

  return (
    <Navigation
      script={script}
      skipLinkText={skipLinkText}
      service={service}
      dir={dir}
      id={navigationId}
      ampOpenClass={open}
    >
      <AmpMenuButton
        announcedText={menuAnnouncedText}
        onToggle={`
          ${dropdownId}.toggleVisibility,
          ${scrollableId}.toggleVisibility,
          ${navigationId}.toggleClass(class=${open})
        `}
        dir={dir}
        script={script}
      />
      {dropdownListItems}
      <AmpScrollableNavigation dir={dir} id={scrollableId}>
        {scrollableListItems}
      </AmpScrollableNavigation>
    </Navigation>
  );
};

AmpNavigationContainer.propTypes = {
  service: string.isRequired,
  dir: string.isRequired,
  script: shape(scriptPropType).isRequired,
  skipLinkText: string.isRequired,
  scrollableListItems: node.isRequired,
  dropdownListItems: node.isRequired,
  menuAnnouncedText: string.isRequired,
  dropdownId: string.isRequired,
};

export default AmpNavigationContainer;
