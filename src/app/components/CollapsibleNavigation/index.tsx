/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState, useRef } from 'react';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import styles from './index.styles';
import { Close } from '../icons';
import { CollapsibleNavigationSection } from './types';
import Heading from '../Heading';

type CollapsibleNavigationProps = {
  navigationSections: CollapsibleNavigationSection[];
};

const CollapsibleNavigation = ({
  navigationSections,
}: CollapsibleNavigationProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const isHydrated = useHydrationDetection();
  const activeNavItemRef = useRef<HTMLAnchorElement | null>(null);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: CollapsibleNavigationSection,
  ) => {
    if (section.href) {
      return;
    }

    e.preventDefault();
    const isActive = openSection === section.id;

    if (isActive) {
      setOpenSection(null);
      activeNavItemRef.current = null;
    } else {
      activeNavItemRef.current = e.currentTarget;
      setOpenSection(section.id);
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

  return (
    <nav role="navigation">
      <ul role="list" css={styles.navList}>
        {navigationSections.map(section => {
          const isActive = Boolean(openSection === section.id);
          const shouldShowSubNav = isHydrated ? isActive : true;
          const isLink = section.href;

          const navigationLinkId = `navigation-link-${section.id}`;
          const subNavigationTitleId = `subnavigation-title-${section.id}`;
          const subNavigationId = section.id;

          return (
            <React.Fragment key={section.id}>
              <li css={styles.navItem} role="listitem">
                <a
                  id={navigationLinkId}
                  href={section.href || `#${section.id}`}
                  onClick={e => handleNavClick(e, section)}
                  className="focusIndicatorRemove"
                  css={[styles.navLink, isActive && styles.navLinkActive]}
                  aria-current={isActive ? 'true' : undefined}
                  aria-expanded={isLink ? undefined : isActive}
                  aria-controls={isLink ? undefined : subNavigationId}
                  role={isLink ? 'link' : 'button'}
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
                >
                  <div css={styles.subNavHeader}>
                    <Heading
                      level={3}
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
                      const linkLabelId = `subnavigation-link-label-${link.id}`;

                      return (
                        <li
                          key={link.id}
                          css={styles.subNavItem}
                          role="listitem"
                        >
                          <a
                            href={link.href}
                            css={styles.subNavLink}
                            aria-labelledby={linkLabelId}
                          >
                            <span id={linkLabelId}>{link.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default CollapsibleNavigation;
