import React from 'react';
import { grid } from '#psammead/psammead-styles/src/detection';

const twoOfSixColumnsMaxWidthScaleable = `33.33%`;
// (2 / 6) * 100 = 0.3333333333 = 33.33%

const fourOfSixColumnsMaxWidthScaleable = `66.67%`;
// (4 / 6) * 100 = 66.6666666667 = 66.67%

const fullWidthColumnsMaxScaleable = `100%`;
// (12 / 12) * 100 = 100 = 100%

const halfWidthColumnsMaxScaleable = `50%`;

const textGridStyles = {
  top: 'col-span-6 group-3:col-span-3 group-3:col-start-4 group-5:col-span-6 group-5:col-start-7',
  regular: (displayImage) => displayImage ? 'col-span-4 col-start-3 group-4:pt-double' : 'col-span-6',
  leading: 'p-0 w-full grid-cols-6 col-span-6 group-3:grid-cols-3 group-3:col-span-3 group-4:grid-cols-2 group-4:col-span-2',
};

const textGridFallbackStyles = {
  top: (dir) => `
    @media (min-width: 37.5rem) {
      width: ${halfWidthColumnsMaxScaleable};
      padding: 0 2rem;
    }
    
    @media (min-width: 63rem) {
      width: ${halfWidthColumnsMaxScaleable};
    }
  `,
  regular: ({ displayImage, dir }) => `
    width: ${fourOfSixColumnsMaxWidthScaleable};
    padding: 0 1rem;
    
    @media (min-width: 37.5rem) {
      padding: 0 2rem;
    }
    
    @media (min-width: 63rem) {
      display: block;
      width: 100%;
      padding: 1rem 0;
    }
    
    ${!displayImage ? `
      width: ${fullWidthColumnsMaxScaleable};
      >div { vertical-align: middle; }
    ` : ''}
  `,
  leading: ({ dir }) => `
    width: ${fullWidthColumnsMaxScaleable};
    
    @media (min-width: 37.5rem) {
      ${dir === 'rtl' ? 'padding-left: 1rem;' : 'padding-right: 1rem;'}
      width: ${halfWidthColumnsMaxScaleable};
    }
    
    @media (min-width: 63rem) {
      width: ${twoOfSixColumnsMaxWidthScaleable};
    }
  `,
};

// This applies 8px padding only to the timestamp.
// The headline already has padding so targeting the timestamp prevents double padding
// from being applied.
const leadingPromoTimestampPadding = `
  >time {
    @media (max-width: 48rem) {
      padding-bottom: 1rem;
    }
  }
`;

const TextGridItem = ({ promoType, displayImage, dir, children, ...props }) => {
  const gridClasses = typeof textGridStyles[promoType] === 'function' 
    ? textGridStyles[promoType](displayImage) 
    : textGridStyles[promoType];
  
  const fallbackStyles = textGridFallbackStyles[promoType] 
    ? textGridFallbackStyles[promoType]({ displayImage, dir })
    : textGridFallbackStyles.regular({ displayImage, dir });
  
  const leadingTimestampStyles = promoType === 'leading' ? leadingPromoTimestampPadding : '';
  
  const displayImageStyles = !displayImage ? `
    >div { 
      display: inline-block; 
      vertical-align: initial; 
    }
    & svg { 
      margin: 0; 
    }
  ` : '';
  
  return (
    <div
      className={`inline-block align-top ${gridClasses}`}
      style={{
        ...(!CSS.supports(grid) && {
          ...fallbackStyles
        }),
        ...(CSS.supports(grid) && {
          display: 'block',
          width: 'initial',
          padding: 'initial'
        }),
        ...leadingTimestampStyles,
        ...displayImageStyles
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default TextGridItem;
