import React, { useState, use } from 'react';
import Navigation from '#psammead/psammead-navigation/src';
import { ScrollableNavigation } from '#psammead/psammead-navigation/src/ScrollableNavigation';
import {
  CanonicalDropdown,
  CanonicalMenuButton,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import { GROUP_2_MAX_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import useMediaQuery from '#hooks/useMediaQuery';
import { RequestContext } from '#app/contexts/RequestContext';
import TopBarOJs from '#app/components/TopBarOJs';
import useToggle from '#app/hooks/useToggle';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import styles from './index.styles';

interface CanonicalNavigationContainerProps {
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

const CanonicalNavigationContainer: React.FC<
  CanonicalNavigationContainerProps
> = ({
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

  useMediaQuery(`(max-width: ${GROUP_2_MAX_WIDTH_BP}rem)`, event => {
    if (!event.matches) {
      setIsOpen(false);
    }
  });

  return (
    <Navigation service={service} dir={dir} isOpen={isOpen}>
      <div css={styles.navStack}>
        <div style={{ position: 'relative', width: '100%' }}>
          <div css={styles.topRow}>
            <ScrollableNavigation
              dir={dir}
              css={styles.topRowItems}
              navPosition="primary"
            >
              {topScrollableListItems}
            </ScrollableNavigation>
            {!isLite && (
              <CanonicalMenuButton
                css={styles.menuButton}
                announcedText={menuAnnouncedText}
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                dir={dir}
              />
            )}
          </div>
          <CanonicalDropdown isOpen={isOpen} css={styles.dropdown}>
            {dropdownListItems}
          </CanonicalDropdown>
        </div>

        <div css={styles.lowerNavWrapper}>
          <ScrollableNavigation
            dir={dir}
            css={styles.bottomRowItems}
            navPosition="secondary"
          >
            {scrollableListItems}
          </ScrollableNavigation>
        </div>
      </div>

      <div css={styles.divider} />
      {enabled && <TopBarOJs blocks={blocks ?? []} />}
    </Navigation>
  );
};

export default CanonicalNavigationContainer;
