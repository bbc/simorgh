import React, { useState } from 'react';
import Navigation from '@bbc/psammead-navigation';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { CanonicalScrollableNavigation } from '@bbc/psammead-navigation/scrollable';
import { CanonicalMenuButton } from '@bbc/psammead-navigation/dropdown';

const CanonicalNavigationContainer = ({
  script,
  service,
  skipLinkText,
  dir,
  menuAnnouncedText,
  scrollableListItems,
  dropdownListItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navigation
      script={script}
      skipLinkText={skipLinkText}
      service={service}
      dir={dir}
      isOpen={isOpen}
    >
      <CanonicalMenuButton
        announcedText={menuAnnouncedText}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        dir={dir}
        script={script}
      />
      {isOpen ? (
        dropdownListItems
      ) : (
        <CanonicalScrollableNavigation dir={dir}>
          {scrollableListItems}
        </CanonicalScrollableNavigation>
      )}
    </Navigation>
  );
};

CanonicalNavigationContainer.propTypes = {
  service: string.isRequired,
  dir: string.isRequired,
  script: shape(scriptPropType).isRequired,
  skipLinkText: string.isRequired,
  scrollableListItems: node.isRequired,
  dropdownListItems: node.isRequired,
  menuAnnouncedText: string.isRequired,
};

export default CanonicalNavigationContainer;
