import React, { useState } from 'react';
import Navigation from '@bbc/psammead-navigation';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { CanonicalScrollableNavigation } from '@bbc/psammead-navigation/scrollable';
import { CanonicalMenuButton } from '@bbc/psammead-navigation/dropdown';
import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/dist/breakpoints';
import useMediaQuery from '#lib/utilities/useMediaQuery';

const CanonicalNavigationContainer = ({
  script,
  service,
  dir,
  menuAnnouncedText,
  scrollableListItems,
  dropdownListItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  useMediaQuery(`(max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX})`, event => {
    setIsScrollable(event.matches);
    if (!event.matches) {
      setIsOpen(false);
    }
  });

  return (
    <Navigation script={script} service={service} dir={dir} isOpen={isOpen}>
      <CanonicalMenuButton
        announcedText={menuAnnouncedText}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        dir={dir}
        script={script}
      />
      {isOpen ? (
        dropdownListItems
      ) : (
        <CanonicalScrollableNavigation dir={dir} isScrollable={isScrollable}>
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
  scrollableListItems: node.isRequired,
  dropdownListItems: node.isRequired,
  menuAnnouncedText: string.isRequired,
};

export default CanonicalNavigationContainer;
