import { ClassNames, useTheme } from '@emotion/react';
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
  CollapsibleNavigationSections: CollapsibleNavigationSection[];
};

const CollapsibleNavigation = ({
  CollapsibleNavigationSections,
}: CollapsibleNavigationProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const isHydrated = useHydrationDetection();
  const theme = useTheme();
  const activeSection = CollapsibleNavigationSections.find(
    s => s.id === openSection,
  );
  const items = CollapsibleNavigationSections.length;

  return (
    <ClassNames>
      {({ css }) => (
        <>
          <ul
            role="list"
            id="dropDownNavigation"
            aria-label={`List ${items} items`}
            title={`List ${items} items`}
            className={css(styles.collapsibleNavSections(theme))}
          >
            {CollapsibleNavigationSections.map(section => {
              const isActive = openSection === section.id;

              return (
                <li
                  key={section.id}
                  className={css(styles.collapsibleNavItem(theme))}
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
                    className={`focusIndicatorRemove ${isActive ? css(styles.collapsibleNavLinkActive(theme)) : ''} ${css(styles.collapsibleNavLink(theme))}`}
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
            <div className={css(styles.collapsibleSubNav(theme))}>
              <div className={css(styles.collapsibleSubNavHeader)}>
                <span className={css(styles.collapsibleSubNavTitle(theme))}>
                  {activeSection.title}
                </span>
                <button
                  id={`close-${activeSection.id}`}
                  type="button"
                  role="button"
                  aria-label="Close"
                  title="Close"
                  name="Close"
                  className={css(styles.collapsibleSubNavCloseButton(theme))}
                  onClick={() => {
                    document.getElementById(activeSection.id)?.focus();
                    setOpenSection(null);
                  }}
                >
                  <Close />
                </button>
              </div>

              <ul className={css(styles.collapsibleSubNavGrid(theme))}>
                {activeSection.links?.map(link => (
                  <li
                    key={link.id}
                    className={css(styles.collapsibleSubNavItem(theme))}
                  >
                    <a
                      href={link.href}
                      className={css(styles.collapsibleSubNavLink(theme))}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!isHydrated && (
            <>
              {CollapsibleNavigationSections.map((section, index) => {
                const sectionItems = section.links?.length;
                return (
                  <div
                    id={section.id}
                    key={section.id}
                    className={`${css(styles.collapsibleSubNavNoJs(theme))}`}
                    aria-label={`List ${sectionItems} items`}
                    title={`List ${sectionItems} items`}
                  >
                    <div className={css(styles.collapsibleSubNavHeader)}>
                      <span
                        className={css(styles.collapsibleSubNavTitle(theme))}
                      >
                        {section.title}
                      </span>
                      <a
                        href="#dropDownNavigation"
                        type="button"
                        role="button"
                        aria-label={`close Region${index} languages navigation`}
                        title={`close Region${index} languages navigation`}
                        className={css(
                          styles.collapsibleSubNavCloseButton(theme),
                        )}
                        onClick={() => setOpenSection(null)}
                      >
                        <Close />
                      </a>
                    </div>

                    <ul className={css(styles.collapsibleSubNavGrid(theme))}>
                      {section.links?.map(link => (
                        <li
                          key={link.id}
                          className={css(styles.collapsibleSubNavItem(theme))}
                        >
                          <a
                            href={link.href}
                            className={css(styles.collapsibleSubNavLink(theme))}
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
          )}
        </>
      )}
    </ClassNames>
  );
};

export default CollapsibleNavigation;
