import { ClassNames, useTheme } from '@emotion/react';
import React, { useState } from 'react';
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

  return (
    <ClassNames>
      {({ css }) => (
        <>
          <nav className={css(styles.wrapper(theme))}>
            {languageSections.map((section, index) => {
              const isLast = index === languageSections.length - 1;

              if (section.href) {
                return (
                  <div
                    key={section.id}
                    className={css(styles.navItem({ ...theme, isLast }))}
                  >
                    <a
                      href={section.href}
                      className={css(styles.navLink(theme))}
                    >
                      {section.title}
                    </a>
                  </div>
                );
              }

              const isActive = openSection === section.id;

              return (
                <details
                  key={section.id}
                  open={isActive}
                  className={css(
                    styles.navItem({ ...theme, isLast, isActive }),
                  )}
                  onToggle={e => {
                    const isOpen = (e.target as HTMLDetailsElement).open;
                    setOpenSection(isOpen ? section.id : null);
                  }}
                >
                  <summary className={css(styles.navSummary(theme))}>
                    {section.title}
                  </summary>
                </details>
              );
            })}
          </nav>

          {activeSection && (
            <div className={css(styles.dropDown(theme))}>
              <div className={css(styles.dropDownHeader)}>
                <span className={css(styles.dropDownTitle)}>
                  {activeSection.title}
                </span>
                <button
                  type="button"
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
