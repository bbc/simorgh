import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from '@bbc/psammead-navigation';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { ScrollableNavigation } from '@bbc/psammead-navigation/scrollable';
import {
  CanonicalDropdown,
  CanonicalMenuButton,
} from '@bbc/psammead-navigation/dropdown';
import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/dist/breakpoints';
import useMediaQuery from '#lib/utilities/useMediaQuery';

const ScrollableWrapper = styled.div`
  position: relative;
`;

const CanonicalNavigationContainer = ({
  script,
  service,
  dir,
  menuAnnouncedText,
  scrollableListItems,
  dropdownListItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useMediaQuery(`(max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX})`, (event) => {
    if (!event.matches) {
      setIsOpen(false);
    }
  });

  return (
    <Navigation script={script} service={service} dir={dir} isOpen={isOpen}>
      <ScrollableWrapper>
        <CanonicalMenuButton
          announcedText={menuAnnouncedText}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          dir={dir}
          script={script}
        />
        {!isOpen && (
          <ScrollableNavigation dir={dir}>
            {scrollableListItems}
          </ScrollableNavigation>
        )}
      </ScrollableWrapper>
      <CanonicalDropdown isOpen={isOpen}>{dropdownListItems}</CanonicalDropdown>
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
