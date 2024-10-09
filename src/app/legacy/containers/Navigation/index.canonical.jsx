import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import Navigation from '#psammead/psammead-navigation/src';
import { ScrollableNavigation } from '#psammead/psammead-navigation/src/ScrollableNavigation';
import {
  CanonicalDropdown,
  CanonicalMenuButton,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import useMediaQuery from '#hooks/useMediaQuery';
import { RequestContext } from '#app/contexts/RequestContext';

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
  const { isLite } = useContext(RequestContext);
  const [isOpen, setIsOpen] = useState(false);

  useMediaQuery(`(max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX})`, event => {
    if (!event.matches) {
      setIsOpen(false);
    }
  });

  return (
    <Navigation script={script} service={service} dir={dir} isOpen={isOpen}>
      <ScrollableWrapper>
        {!isLite && (
          <CanonicalMenuButton
            announcedText={menuAnnouncedText}
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            dir={dir}
            script={script}
          />
        )}
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

export default CanonicalNavigationContainer;
