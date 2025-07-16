import React from 'react';
import { LUNAR } from '../../../../components/ThemeProvider/palette';

const promoListDefaultProps = {
  border: true,
};

export const StoryPromoLiBase = ({ border, children, ...props }) => {
  const borderClasses = border ? 'max-group-3:border-b max-group-3:border-lunar' : '';
  
  return (
    <li 
      className={`${borderClasses} last:border-none`}
      role="listitem"
      {...props}
    >
      {children}
    </li>
  );
};

StoryPromoLiBase.defaultProps = promoListDefaultProps;

export const StoryPromoLi = ({ children, ...props }) => (
  <StoryPromoLiBase
    className="py-double pb-double group-3:py-double group-3:pb-double group-4:p-0 group-4:pb-triple first:pt-0 first:group-3:pt-double first:group-3:max-group-3:pt-double last:pb-0"
    {...props}
  >
    {children}
  </StoryPromoLiBase>
);

StoryPromoLi.defaultProps = promoListDefaultProps;

export const StoryPromoUl = ({ children, ...props }) => (
  <ul 
    className="list-none m-0 p-0"
    role="list"
    {...props}
  >
    {children}
  </ul>
);

StoryPromoUl.defaultProps = {
  role: 'list',
};
