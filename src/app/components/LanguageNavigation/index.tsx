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
          <ul className={css(styles.langNavUnorderedList())}>
            {languageSections.map((section, index) => {
              const isLast = index === languageSections.length - 1;

              const isActive = openSection === section.id;

              return (
                <li
                  key={section.id}
                  className={css(
                    styles.langNavItem({ ...theme, isLast, isActive }),
                  )}
                >
                  <a
                    href="#link"
                    onClick={e => {
                      e.preventDefault();
                      const isOpen = isActive ? null : section.id;
                      setOpenSection(isOpen);
                    }}
                    className={`focusIndicatorRemove ${isActive ? css(styles.langNavLinkActive(theme)) : ''} ${css(styles.langNavLink(theme))}`}
                  >
                    {section.title}
                  </a>
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
