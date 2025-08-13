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

  const handleCloseClick = () => {
    setOpenSection(null);
  };

  return (
    <nav>
      <ul
        data-test={`is-hydrated-${isHydrated}`}
        role="list"
        id="collapsibleNav"
        aria-label={`List ${itemCount} items`}
        css={styles.navList}
      >
        {navigationSections.map(section => {
          const isActive = openSection === section.id;
          const shouldShowSubNav = isHydrated ? isActive : true;

          return (
            <React.Fragment key={section.id}>
              {/* Main navigation items */}
              <li css={[styles.navItem]} role="listitem">
                <a
                  id={`nav-${section.id}`}
                  href={section.href || `#${section.id}`}
                  onClick={e => handleNavClick(e, section)}
                  className="focusIndicatorRemove"
                  css={[styles.navLink, isActive && styles.navLinkActive]}
                  aria-current={isActive ? 'true' : undefined}
                  aria-expanded={isActive ? 'true' : 'false'}
                  role="link"
                >
                  {section.title}
                </a>
              </li>

              {/* Sub-navigation items - takes full width and appears below */}
              {section.links && shouldShowSubNav && (
                <div key={`${section.id}-sublist`} css={styles.subNavWrapper}>
                  <div
                    id={!isHydrated ? section.id : undefined}
                    css={isHydrated ? styles.subNav : styles.subNavNoJs}
                    role="region"
                    aria-label={section.title}
                  >
                    <div css={styles.subNavHeader}>
                      <span css={styles.subNavTitle}>{section.title}</span>
                      {/* TODO: could it be a single button using href? */}
                      {isHydrated ? (
                        <button
                          id={`close-${section.id}`}
                          type="button"
                          aria-label={`Close ${section.title} menu`}
                          css={styles.subNavCloseButton}
                          onClick={() => handleCloseClick()}
                        >
                          <Close css={styles.subNavCloseButtonIcon} />
                        </button>
                      ) : (
                        <a
                          aria-label={`Close ${section.title} menu`}
                          css={styles.subNavCloseButton}
                          href={`#nav-${section.id}`}
                        >
                          <Close />
                        </a>
                      )}
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
