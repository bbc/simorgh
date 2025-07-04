import { ClassNames, useTheme } from '@emotion/react';
import React, { useState } from 'react';
import styles from './index.styles';
import languageSections, { CloseIconSvg } from './constants';

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
                    className={css(styles.navItem({ isLast }))}
                  >
                    <a href={section.href} className={css(styles.navLink)}>
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
                  className={css(styles.navItem({ isLast, isActive }))}
                  onToggle={e => {
                    const isOpen = (e.target as HTMLDetailsElement).open;
                    setOpenSection(isOpen ? section.title : null);
                  }}
                >
                  <summary className={css(styles.navSummary)}>
                    {section.title}
                  </summary>
                </details>
              );
            })}
          </nav>

          {openSection && (
            <div className={css(styles.dropDown)}>
              <div className={css(styles.dropDownHeader)}>
                <span className={css(styles.dropDownTitle)}>{openSection}</span>
                <button
                  type="button"
                  className={css(styles.closeButton)}
                  onClick={() => setOpenSection(null)}
                >
                  <CloseIconSvg />
                </button>
              </div>

              {languageSections
                .find(s => s.title === openSection)
                ?.links?.map(link => (
                  <div key={link.href} className={css(styles.dropDownItem)}>
                    <a href={link.href} className={css(styles.dropDownLink)}>
                      {link.label}
                    </a>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </ClassNames>
  );
};

export default LanguageNavigation;
