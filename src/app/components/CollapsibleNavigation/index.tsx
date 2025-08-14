/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState } from 'react';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import styles from './index.styles';
import { Close } from '../icons';
import { CollapsibleNavigationSection } from './types';

type CollapsibleNavigationProps = {
  navigationSections: CollapsibleNavigationSection[];
};

const CollapsibleNavigation = ({
  navigationSections,
}: CollapsibleNavigationProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const isHydrated = useHydrationDetection();
  const itemCount = navigationSections.length;

  const handleNavClick = (
    e: React.MouseEvent,
    section: CollapsibleNavigationSection,
  ) => {
    if (section.href) return;
    e.preventDefault();
    const isActive = openSection === section.id;
    setOpenSection(isActive ? null : section.id);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenSection(null);
  };

  return (
    <nav>
      <ul
        role="list"
        aria-label={`List ${itemCount} items`}
        css={styles.navList}
      >
        {navigationSections.map(section => {
          const isActive = Boolean(openSection === section.id);
          const shouldShowSubNav = isHydrated ? isActive : true;
          const hasLink = section.href;
          return (
            <React.Fragment key={section.id}>
              <li css={[styles.navItem]} role="listitem">
                <a
                  id={`nav-${section.id}`}
                  href={section.href || `#${section.id}`}
                  onClick={e => handleNavClick(e, section)}
                  className="focusIndicatorRemove"
                  css={[styles.navLink, isActive && styles.navLinkActive]}
                  aria-current={isActive ? 'true' : undefined}
                  aria-expanded={hasLink ? undefined : isActive}
                  role={hasLink ? 'link' : 'button'}
                >
                  {section.title}
                </a>
              </li>

              {section.links && shouldShowSubNav && (
                <div
                  key={`${section.id}-sublist`}
                  id={!isHydrated ? section.id : undefined}
                  css={[styles.subNav, !isHydrated && styles.subNavNoJs]}
                  role="region"
                  aria-label={section.title}
                >
                  <div css={styles.subNavHeader}>
                    <span css={styles.subNavTitle}>{section.title}</span>
                    <a
                      aria-label={`Close ${section.title} menu`}
                      css={styles.subNavCloseButton}
                      href={`#nav-${section.id}`}
                      onClick={handleClose}
                      role={isHydrated ? 'button' : 'link'}
                    >
                      <Close css={styles.subNavCloseButtonIcon} />
                    </a>
                  </div>

                  <ul css={styles.subNavGrid} role="list">
                    {section.links.map(link => (
                      <li key={link.id} css={styles.subNavItem}>
                        <a
                          href={link.href}
                          css={styles.subNavLink}
                          aria-label={link.label}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default CollapsibleNavigation;
