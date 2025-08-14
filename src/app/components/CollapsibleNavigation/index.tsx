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
    <nav role="navigation">
      <ul
        role="list"
        // TODO: Do we need this? This causes to double pronounce it when we open sub navigation
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
                  // TODO: Double check re. screen reader - Announce the section, not the upper scope label;
                  aria-controls={hasLink ? undefined : `subav-${section.id}`}
                  role={hasLink ? 'link' : 'button'}
                >
                  {section.title}
                </a>
              </li>

              {section.links && shouldShowSubNav && (
                <li
                  // TODO: make sure it's pronounced
                  aria-label={section.title}
                  id={`subav-${section.id}`}
                  css={[styles.subNav, !isHydrated && styles.subNavNoJs]}
                  role="region"
                >
                  <div css={styles.subNavHeader}>
                    <span
                      css={styles.subNavTitle}
                      id={`subNavTitle-${section.id}`}
                    >
                      {section.title}
                    </span>
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
                      <li key={link.id} css={styles.subNavItem} role="listitem">
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
