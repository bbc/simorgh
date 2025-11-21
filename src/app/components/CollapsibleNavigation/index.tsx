import { useState, useRef, Fragment, ElementType } from 'react';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from './index.styles';
import { Close } from '../icons';
import { CollapsibleNavigationSection } from './types';
import Heading from '../Heading';

type CollapsibleNavigationProps = {
  navigationSections: CollapsibleNavigationSection[];
  as?: ElementType;
};

const CollapsibleNavigation = ({
  navigationSections,
  as = 'nav',
}: CollapsibleNavigationProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const isHydrated = useHydrationDetection();
  const activeNavItemRef = useRef<HTMLAnchorElement | null>(null);

  const navSectionEventTrackingData: EventTrackingMetadata = {
    componentName: 'collapsible-navigation-section',
    preventNavigation: true,
  };

  const navLinkEventTrackingData: EventTrackingMetadata = {
    componentName: 'collapsible-navigation-link',
  };

  const { onClick: navSectionClickTrackerHandler } = useClickTrackerHandler(
    navSectionEventTrackingData,
  );

  const { onClick: navLinkClickTrackerHandler } = useClickTrackerHandler(
    navLinkEventTrackingData,
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: CollapsibleNavigationSection,
  ) => {
    if (section.href) {
      navLinkClickTrackerHandler?.(e);
      return;
    }

    /**
     * Prevents the browser from scrolling when a hash is present in the URL.
     * The hash is used for the no-JS fallback and for improved section click tracking
     */
    e.preventDefault();
    navSectionClickTrackerHandler?.(e);

    const isActive = openSection === section.id;

    if (isActive) {
      setOpenSection(null);
      activeNavItemRef.current = null;
    } else {
      activeNavItemRef.current = e.currentTarget;
      setOpenSection(section.id);

      setTimeout(() => {
        const subNavElement = document.getElementById(section.id);
        subNavElement?.focus({ preventScroll: true });
      }, 200);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenSection(null);

    if (activeNavItemRef.current) {
      activeNavItemRef.current.focus();
      activeNavItemRef.current = null;
    }
  };

  const Component: React.ElementType = as;

  return (
    <Component>
      <ul role="list" css={styles.navList} data-testid="collapsible-nav">
        {navigationSections.map(section => {
          const isActive = Boolean(openSection === section.id);
          const shouldShowSubNav = isHydrated ? isActive : true;
          const isLink = section.href;

          const navigationLinkId = `nav-${section.id}`;
          const subNavigationTitleId = `subnav-title-${section.id}`;
          const subNavigationId = section.id;

          return (
            <Fragment key={section.id}>
              <li css={styles.navItem} role="listitem">
                <a
                  id={navigationLinkId}
                  href={section.href || `#${section.id}`}
                  onClick={e => handleNavClick(e, section)}
                  className="focusIndicatorRemove"
                  css={[styles.navLink, isActive && styles.navLinkActive]}
                  role={isLink ? 'link' : 'button'}
                  {...(isActive && { 'aria-current': 'true' })}
                  {...(!isLink && {
                    'aria-expanded': isActive,
                    'aria-controls': subNavigationId,
                  })}
                >
                  {section.title}
                </a>
              </li>

              {section.links && shouldShowSubNav && (
                <li
                  id={subNavigationId}
                  css={[styles.subNav, !isHydrated && styles.subNavNoJs]}
                  role="region"
                  aria-labelledby={subNavigationTitleId}
                  tabIndex={-1}
                  className="focusIndicatorRemove"
                >
                  <div css={styles.subNavHeader}>
                    <Heading
                      level={2}
                      id={subNavigationTitleId}
                      css={styles.subNavTitle}
                    >
                      {section.title}
                    </Heading>
                    <a
                      aria-label={`Close ${section.title} submenu`}
                      css={styles.subNavCloseButton}
                      href={`#${navigationLinkId}`}
                      onClick={handleClose}
                      role={isHydrated ? 'button' : 'link'}
                    >
                      <Close css={styles.subNavCloseButtonIcon} />
                    </a>
                  </div>

                  <ul css={styles.subNavGrid} role="list">
                    {section.links.map(link => {
                      const linkLabelId = `subnav-${link.id}`;

                      return (
                        <li
                          key={link.id}
                          css={styles.subNavItem}
                          role="listitem"
                        >
                          <a
                            href={link.href}
                            css={styles.subNavLink}
                            onClick={e => navLinkClickTrackerHandler?.(e)}
                            {...(link?.lang && { lang: link.lang })}
                            {...(link?.latinTransliteration && {
                              'aria-label': link?.latinTransliteration,
                            })}
                            {...(link?.disableTranslation && {
                              translate: 'no',
                            })}
                          >
                            <span id={linkLabelId}>{link.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    </Component>
  );
};

export default CollapsibleNavigation;
