import { ClassNames, useTheme } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.styles';
import { Close } from '../icons';

type LanguageLink = {
  id: string;
  label: string;
  href: string;
};

type LanguageSection = {
  id: string;
  title: string;
  href?: string;
  links?: LanguageLink[];
};

type LanguageNavigationProps = {
  languageSections: LanguageSection[];
};

const LanguageNavigation = ({ languageSections }: LanguageNavigationProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const theme = useTheme();
  const activeSection = languageSections.find(s => s.id === openSection);

  const showSubListItems = useRef(false);
  useEffect(() => {
    if (window.document) {
      showSubListItems.current = true;
    }
  }, []);

  return (
    <ClassNames>
      {({ css }) => (
        <>
          <ul
            role="list"
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            className={css(styles.langNavUnorderedList(theme))}
          >
            {languageSections.map((section, index) => {
              const isLast = index === languageSections.length - 1;

              const isActive = openSection === section.id;

              return (
                <li
                  key={section.id}
                  className={css(
                    styles.langNavItem({ ...theme, isLast, isActive }),
                  )}
                  role="listitem"
                >
                  <a
                    href={section.href || `#${section.id}`}
                    onClick={e => {
                      e.preventDefault();
                      const isOpen = isActive ? null : section.id;
                      setOpenSection(isOpen);
                    }}
                    className={`focusIndicatorRemove ${isActive ? css(styles.langNavLinkActive(theme)) : ''} ${css(styles.langNavLink(theme))}`}
                  >
                    {section.title}
                  </a>
                  {!showSubListItems.current &&
                    section.links?.map(item => (
                      <ul
                        role="list"
                        style={{ display: 'none', visibility: 'hidden' }}
                        key={item.id}
                      >
                        <li>
                          <a href={item.href}>{item.label}</a>
                        </li>
                      </ul>
                    ))}
                </li>
              );
            })}
          </ul>

          {activeSection && (
            <div className={css(styles.dropDown(theme))}>
              <div className={css(styles.dropDownHeader)}>
                <span className={css(styles.dropDownTitle)}>
                  {activeSection.title}
                </span>
                <button
                  type="button"
                  role="button"
                  aria-label="Close"
                  className={css(styles.closeButton(theme))}
                  onClick={() => setOpenSection(null)}
                >
                  <Close />
                </button>
              </div>

              <ul className={css(styles.dropDownItemsGrid(theme))}>
                {activeSection.links?.map(link => (
                  <li
                    key={link.id}
                    className={css(
                      styles.dropDownItem({
                        ...theme,
                        isActive: false,
                      }),
                    )}
                  >
                    <a
                      href={link.href}
                      className={css(styles.dropDownLink(theme))}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </ClassNames>
  );
};

export default LanguageNavigation;
