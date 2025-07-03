import React, { useState } from 'react';
import languageSections, { CloseIconSvg } from './constants';
import { 
  Wrapper, 
  NavLink, 
  NavSummary, 
  NavItem, 
  DropDown, 
  DropDownItem, 
  DropDownHeader, 
  DropDownTitle, 
  CloseButton,
  DropDownLink
} from './index.styles';

const LanguageNavigation = () => {

  const [openSection, setOpenSection] = useState<string | null>(null); 

  return (
    <>
      <Wrapper>
        {languageSections.map((section, index) => {
          const isLast = index === languageSections.length - 1;

          //HOME
          if (section.href) {
            return (
              <NavItem key={section.title} isLast={isLast}>
                <NavLink href={section.href}>{section.title}</NavLink>
              </NavItem>
            );
          }

          //ALL OTHERS- AFRICA, ASIA ETC
          return (
            <NavItem 
              key={section.title} 
              isLast={isLast}
              isActive={openSection === section.title}
            >
              <NavSummary
                onClick={() =>
                  setOpenSection(openSection === section.title ? null: section.title)
                }
              >
                {section.title}
              </NavSummary>
            </NavItem>
          );
        })}
      </Wrapper>

      {openSection && (
        <DropDown>

          <DropDownHeader>
            <DropDownTitle>{openSection}</DropDownTitle>
            <CloseButton onClick={() => setOpenSection(null)}> 
              <CloseIconSvg /> 
            </CloseButton>
          </DropDownHeader>

          {languageSections
            .find((s) => s.title === openSection)
            ?.links?.map ((link) => (
              <DropDownItem key={link.href}>
                <DropDownLink href={link.href}>{link.label}</DropDownLink>
              </DropDownItem>
            ))
          }
        </DropDown>
        
      )}
    </>
    
  );
}
export default LanguageNavigation;
