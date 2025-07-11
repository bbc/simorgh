import { ClassNames, useTheme } from '@emotion/react';
import React, { useState } from 'react';
import styles from './index.styles';
import languageSections from './constants';
import { Close } from '../icons';

const LanguageNavigation = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const theme = useTheme();

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
                    key={section.title}
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

              const isActive = openSection === section.title;

              return (
                <details
                  key={section.title}
                  open={isActive}
                  className={css(
                    styles.navItem({ ...theme, isLast, isActive }),
                  )}
                  onToggle={e => {
                    const isOpen = (e.target as HTMLDetailsElement).open;
                    setOpenSection(isOpen ? section.title : null);
                  }}
                >
                  <summary className={css(styles.navSummary(theme))}>
                    {section.title}
                  </summary>
                </details>
              );
            })}
          </nav>

          {openSection && (
            <div className={css(styles.dropDown(theme))}>
              <div className={css(styles.dropDownHeader)}>
                <span className={css(styles.dropDownTitle)}>{openSection}</span>
                <button
                  type="button"
                  className={css(styles.closeButton(theme))}
                  onClick={() => setOpenSection(null)}
                >
                  <Close />
                </button>
              </div>

              <div className={css(styles.dropDownItemsGrid(theme))}>
                {languageSections
                  .find(s => s.title === openSection)
                  ?.links?.map(link => (
                    <div
                      key={link.href}
                      className={css(styles.dropDownItem(theme))}
                    >
                      <a
                        href={link.href}
                        className={css(styles.dropDownLink(theme))}
                      >
                        {link.label}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </ClassNames>
  );
};

export default LanguageNavigation;
