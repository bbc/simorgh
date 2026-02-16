import React, { useState, use } from 'react';
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
import TopBarOJs from '#app/components/TopBarOJs';
import useToggle from '#app/hooks/useToggle';

import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';

interface CanonicalNavigationContainerProps {
  script: unknown;
  service: string;
  dir: string;
  menuAnnouncedText: string;
  topScrollableListItems?: React.ReactNode;
  topDivider?: React.ReactNode;
  scrollableListItems: React.ReactNode;
  dropdownListItems: React.ReactNode;
  menuButton?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  blocks?: TopStoryItem[];
}

const Divider = styled.div`
  position: absolute;
  width: calc(100vw - 0.8rem);
  inset-inline-start: 0;
  @media (min-width: 1041px) {
    width: calc(100vw + 0.8rem);
    inset-inline-start: calc(-1 * (100vw - 1014px) / 2);
  }
  &::after {
    content: '';
    position: absolute;
    inset-block-end: 0;
    inset-inline: -0.8rem 0;
    width: calc(100% + 0.8rem);
    border-bottom: 0.0625rem solid ${props => props.theme.palette.GREY_3};
  }
  @media (min-width: 1008px) {
    display: none;
  }
`;

const NavStack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const NavRow = styled.div<{ dir: string }>`
  display: flex;
  flex-direction: ${({ dir }) => (dir === 'rtl' ? 'row-reverse' : 'row')};
  align-items: stretch;
  justify-content: ${({ dir }) => (dir === 'rtl' ? 'flex-end' : 'flex-start')};
  width: 100%;
`;

/**
 * ✅ TopRow is the same as NavRow, but it paints a full-bleed POSTBOX background behind it.
 * This works even though ancestors are width-constrained because we use a centered 100vw pseudo-element.
 * No spacing/height changes; content stays exactly where it is.
 */
const TopRow = styled(NavRow)`
  position: relative;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    /* Cover this row vertically */
    top: 0;
    bottom: 0;

    /* Full-bleed horizontally, independent of the constrained container */
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);

    /* POSTBOX red from theme */
    background: ${props => props.theme.palette.POSTBOX};
    pointer-events: none; /* ensure it never interferes with clicks */
  }
`;

const LowerNavWrapper = styled.div`
  width: 100%;
  margin-top: 0.25rem;
  position: relative;
  z-index: 1;
`;

const CanonicalNavigationContainer: React.FC<
  CanonicalNavigationContainerProps
> = ({
  script,
  service,
  dir,
  menuAnnouncedText,
  topScrollableListItems,
  scrollableListItems,
  dropdownListItems,
  blocks,
}) => {
  const { isLite } = use(RequestContext);
  const { enabled } = useToggle('topBarOJs');
  const [isOpen, setIsOpen] = useState(false);

  useMediaQuery(`(max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX})`, event => {
    if (!event.matches) {
      setIsOpen(false);
    }
  });

  return (
    <Navigation script={script} service={service} dir={dir} isOpen={isOpen}>
      <NavStack>
        <TopRow dir={dir}>
          {dir === 'rtl' ? (
            <>
              {!isLite && (
                <div style={{ flex: '0 0 auto' }}>
                  <CanonicalMenuButton
                    script={script}
                    announcedText={menuAnnouncedText}
                    isOpen={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    dir={dir}
                    navType="top"
                  />
                </div>
              )}

              <ScrollableNavigation dir={dir} navType="top">
                {topScrollableListItems}
              </ScrollableNavigation>
            </>
          ) : (
            <>
              <ScrollableNavigation dir={dir} navType="top">
                {topScrollableListItems}
              </ScrollableNavigation>

              {!isLite && (
                <div style={{ flex: '0 0 auto' }}>
                  <CanonicalMenuButton
                    announcedText={menuAnnouncedText}
                    isOpen={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    dir={dir}
                    script={script}
                    navType="top"
                  />
                </div>
              )}
            </>
          )}
        </TopRow>

        <LowerNavWrapper>
          <ScrollableNavigation dir={dir} navType={null}>
            {scrollableListItems}
          </ScrollableNavigation>
        </LowerNavWrapper>

        <CanonicalDropdown isOpen={isOpen}>
          {dropdownListItems}
        </CanonicalDropdown>
      </NavStack>

      <Divider />
      {enabled && <TopBarOJs blocks={blocks ?? []} />}
    </Navigation>
  );
};

export default CanonicalNavigationContainer;
