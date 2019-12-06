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
  toggleElement,
}) => {
  // togglableElement is the 2nd element onToggle will toggle between.
  // That is, onToggle will toggle between toggleElement and togglableElement
  const togglableElement = 'scrollable-nav';

  return (
    <Navigation
      script={script}
      skipLinkText={skipLinkText}
      service={service}
      dir={dir}
    >
      <AmpMenuButton
        announcedText={menuAnnouncedText}
        onToggle={`${toggleElement}.toggleVisibility,${togglableElement}.toggleVisibility`}
        dir={dir}
        script={script}
      />
      {dropdownListItems}
      <AmpScrollableNavigation dir={dir} id={togglableElement}>
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
  toggleElement: string.isRequired,
};

export default AmpNavigationContainer;
