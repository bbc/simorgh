import React from 'react';
import Navigation from '@bbc/psammead-navigation';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { AmpScrollableNavigation } from '@bbc/psammead-navigation/scrollable';
import { AmpMenuButton } from '@bbc/psammead-navigation/dropdown';
import styled from '@emotion/styled-base';

const HIDDEN_CLASS_NAME = 'scrollable-hidden';
const SCROLLABLE_ID = 'scrollable-nav';
const NAVIGATION_ID = 'navigation-id';
const OPEN_CLASS_NAME = 'open';
const StyledAmpScrollableNavigation = styled(AmpScrollableNavigation)`
  &.${HIDDEN_CLASS_NAME} {
    /* TODO: import from psammead-styles */
    @media (max-width: 37.5rem) {
      display: none;
      visibility: hidden;
    }
  }
`;

const AmpNavigationContainer = ({
  script,
  service,
  skipLinkText,
  dir,
  menuAnnouncedText,
  scrollableListItems,
  dropdownListItems,
  dropdownId,
}) => (
  <Navigation
    script={script}
    skipLinkText={skipLinkText}
    service={service}
    dir={dir}
    id={NAVIGATION_ID}
    ampOpenClass={OPEN_CLASS_NAME}
  >
    <AmpMenuButton
      announcedText={menuAnnouncedText}
      onToggle={`
        ${dropdownId}.toggleVisibility,
        ${SCROLLABLE_ID}.toggleClass(class=${HIDDEN_CLASS_NAME}),
        ${NAVIGATION_ID}.toggleClass(class=${OPEN_CLASS_NAME})
      `}
      dir={dir}
      script={script}
    />
    {dropdownListItems}
    <StyledAmpScrollableNavigation dir={dir} id={SCROLLABLE_ID}>
      {scrollableListItems}
    </StyledAmpScrollableNavigation>
  </Navigation>
);

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
