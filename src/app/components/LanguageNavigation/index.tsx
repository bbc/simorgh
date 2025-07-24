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
  const items = collapsibleNavigationSections.length;

  return (
    <>
      <ul
        role="list"
        id="dropDownNavigation"
        aria-label={`List ${items} items`}
        title={`List ${items} items`}
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
                id={section.id}
                href={section.href || `#${section.id}`}
                onClick={e => {
                  e.preventDefault();
                  setOpenSection(isActive ? null : section.id);
                  setTimeout(() => {
                    document.getElementById(`close-${section.id}`)?.focus();
                  }, 0);
                }}
                className="focusIndicatorRemove"
                css={[
                  isActive ? styles.collapsibleNavLinkActive : '',
                  styles.collapsibleNavLink,
                ]}
              >
                {section.title}
              </a>
              {!isHydrated && section.links && (
                <ul
                  role="list"
                  style={{ display: 'none', visibility: 'hidden' }}
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
        <div css={styles.collapsibleSubNav}>
          <div css={styles.collapsibleSubNavHeader}>
            <span css={styles.collapsibleSubNavTitle}>
              {activeSection.title}
            </span>
            <button
              id={`close-${activeSection.id}`}
              type="button"
              role="button"
              aria-label="Close"
              title="Close"
              name="Close"
              css={styles.collapsibleSubNavCloseButton}
              onClick={() => {
                document.getElementById(activeSection.id)?.focus();
                setOpenSection(null);
              }}
            >
              <Close />
            </button>
          </div>

          <ul css={styles.collapsibleSubNavGrid}>
            {activeSection.links?.map(link => (
              <li key={link.id} css={styles.collapsibleSubNavItem}>
                <a href={link.href} css={styles.collapsibleSubNavLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isHydrated && (
        <>
          {collapsibleNavigationSections.map((section, index) => {
            const sectionItems = section.links?.length;
            return (
              <div
                id={section.id}
                key={section.id}
                css={styles.collapsibleSubNavNoJs}
                aria-label={`List ${sectionItems} items`}
                title={`List ${sectionItems} items`}
              >
                <div css={styles.collapsibleSubNavHeader}>
                  <span css={styles.collapsibleSubNavTitle}>
                    {section.title}
                  </span>
                  <a
                    href="#dropDownNavigation"
                    type="button"
                    role="button"
                    aria-label={`close Region${index} languages navigation`}
                    title={`close Region${index} languages navigation`}
                    css={styles.collapsibleSubNavCloseButton}
                    onClick={() => setOpenSection(null)}
                  >
                    <Close />
                  </a>
                </div>

                <ul css={styles.collapsibleSubNavGrid}>
                  {section.links?.map(link => (
                    <li key={link.id} css={styles.collapsibleSubNavItem}>
                      <a href={link.href} css={styles.collapsibleSubNavLink}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default CollapsibleNavigation;
