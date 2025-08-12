/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState } from 'react';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import styles from './index.styles';
import { Close } from '../icons';

type CollapsibleNavigationSubLink = {
  id: string;
  label: string;
  href: string;
};

type CollapsibleNavigationSection = {
  id: string;
  title: string;
  href?: string;
  links?: CollapsibleNavigationSubLink[];
};

type CollapsibleNavigationProps = {
  collapsibleNavigationSections: CollapsibleNavigationSection[];
};

const CollapsibleNavigation = ({
  collapsibleNavigationSections,
}: CollapsibleNavigationProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const isHydrated = useHydrationDetection();
  const activeSection = collapsibleNavigationSections.find(
    s => s.id === openSection,
  );
  const itemCount = collapsibleNavigationSections.length;
  return (
    <>
      <ul
        role="list"
        id="collapsibleNav"
        aria-label={`List ${itemCount} items`}
        title={`List ${itemCount} items`}
        css={styles.collapsibleNavList}
      >
        {collapsibleNavigationSections.map(section => {
          const isActive = openSection === section.id;

          return (
            <li
              key={section.id}
              css={styles.collapsibleNavItem}
              role="listitem"
            >
              <a
                id={`nav-${section.id}`}
                href={section.href || `#${section.id}`}
                onClick={e => {
                  if (section.href) return;
                  e.preventDefault();
                  setOpenSection(isActive ? null : section.id);
                  document.getElementById(`close-${section.id}`)?.focus();
                  setTimeout(() => {
                    document.getElementById(`close-${section.id}`)?.focus();
                  }, 0);
                }}
                className="focusIndicatorRemove"
                css={[
                  isActive ? styles.collapsibleNavLinkActive : '',
                  styles.collapsibleNavLink,
                ]}
                aria-current={isActive ? 'true' : undefined}
                aria-expanded={isActive ? 'true' : 'false'}
                role="link"
              >
                {section.title}
              </a>

              {!isHydrated && section.links && (
                <ul
                  role="list"
                  style={{ display: 'none', visibility: 'hidden' }}
                  aria-hidden="true"
                  key={`${section.id}-sublist`}
                >
                  {section.links.map(item => (
                    <li key={item.id}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {activeSection && (
        <div
          css={styles.collapsibleSubNav}
          role="region"
          aria-label={activeSection.title}
        >
          <div css={styles.collapsibleSubNavHeader}>
            <span css={styles.collapsibleSubNavTitle}>
              {activeSection.title}
            </span>
            <button
              id={`close-${activeSection.id}`}
              type="button"
              role="button"
              aria-label={`Close ${activeSection.title} menu`}
              title={`Close ${activeSection.title} menu`}
              name={`Close ${activeSection.title} menu`}
              css={styles.collapsibleSubNavCloseButton}
              onClick={() => {
                document.getElementById(`nav-${activeSection.id}`)?.focus();
                setOpenSection(null);
              }}
            >
              <Close
                aria-hidden="false"
                css={styles.collapsibleSubNavCloseButtonIcon}
              />
            </button>
          </div>

          <ul css={styles.collapsibleSubNavGrid}>
            {activeSection.links?.map(link => (
              <li key={link.id} css={styles.collapsibleSubNavItem}>
                <a
                  href={link.href}
                  css={styles.collapsibleSubNavLink}
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isHydrated &&
        collapsibleNavigationSections.map(section => {
          const sectionItemsCount = section.links?.length || 0;
          return (
            <div
              id={section.id}
              key={section.id}
              css={styles.collapsibleSubNavNoJs}
              aria-label={`List ${sectionItemsCount} items`}
              title={`List ${sectionItemsCount} items`}
            >
              <div css={styles.collapsibleSubNavHeader}>
                <span css={styles.collapsibleSubNavTitle}>{section.title}</span>
                <a
                  type="button"
                  aria-label={`Close ${section.title} menu`}
                  title={`Close ${section.title} menu`}
                  css={styles.collapsibleSubNavCloseButton}
                  onClick={() => setOpenSection(null)}
                  href={`#nav-${section.id}`}
                >
                  <Close aria-hidden="false" />
                </a>
              </div>

              <ul css={styles.collapsibleSubNavGrid}>
                {section.links?.map(link => (
                  <li key={link.id} css={styles.collapsibleSubNavItem}>
                    <a
                      href={link.href}
                      css={styles.collapsibleSubNavLink}
                      aria-label={link.label}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
    </>
  );
};

export default CollapsibleNavigation;
