import React from 'react';
import Navigation from '@bbc/psammead-navigation';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { AmpScrollableNavigation } from '@bbc/psammead-navigation/scrollable';
import { AmpMenuButton } from '@bbc/psammead-navigation/dropdown';

const AmpNavigationContainer = ({
  script,
  dir,
  menuAnnouncedText,
  scrollableListItems,
  dropdownListItems,
}) => {
  return (
    <Navigation dir={dir}>
      <AmpMenuButton
        announcedText={menuAnnouncedText}
        onToggle="tap:dropdown-menu.toggleVisibility"
        dir={dir}
        script={script}
      />
      {dropdownListItems}
      <AmpScrollableNavigation dir={dir}>
        {scrollableListItems}
      </AmpScrollableNavigation>
    </Navigation>
  );
};

AmpNavigationContainer.propTypes = {
  dir: string.isRequired,
  script: shape(scriptPropType).isRequired,
  scrollableListItems: node.isRequired,
  dropdownListItems: node.isRequired,
  menuAnnouncedText: string.isRequired,
};

export default AmpNavigationContainer;
