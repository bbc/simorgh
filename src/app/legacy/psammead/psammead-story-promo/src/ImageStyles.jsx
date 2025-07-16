import React from 'react';
import { grid } from '#psammead/psammead-styles/src/detection';

const twoOfSixColumnsMaxWidthScaleable = `33.33%`;
// (2 / 6) * 100 = 0.3333333333 = 33.33%

const fourOfSixColumnsMaxWidthScaleable = `66.67%`;
// (4 / 6) * 100 = 66.6666666667 = 66.67%

const fullWidthColumnsMaxScaleable = `100%`;
// (12 / 12) * 100 = 100 = 100%

const halfWidthColumnsMaxScaleable = `50%`;

const imageGridStyles = {
  top: 'col-span-6 group-3:col-span-3 group-3:max-group-4:col-span-3',
  regular: 'col-span-2',
  leading: 'p-0 grid-cols-6 col-span-6 group-3:grid-cols-3 group-3:col-span-3 group-4:grid-cols-4 group-4:col-span-4',
};

const imageGridFallbackStyles = {
  top: (dir) => `
    margin-bottom: 1rem;
    width: ${fullWidthColumnsMaxScaleable};
    
    @media (min-width: 37.5rem) {
      width: calc(${halfWidthColumnsMaxScaleable} - 1rem);
      margin-bottom: 0;
    }
    
    @media (min-width: 63rem) {
      width: calc(${halfWidthColumnsMaxScaleable} - 1rem);
    }
  `,
  regular: (dir) => `
    width: ${twoOfSixColumnsMaxWidthScaleable};
    
    @media (min-width: 63rem) {
      display: block;
      width: 100%;
    }
  `,
  leading: (dir) => `
    width: ${fullWidthColumnsMaxScaleable};
    
    @media (min-width: 37.5rem) {
      ${dir === 'rtl' ? 'padding-left: 1rem;' : 'padding-right: 1rem;'}
      width: ${halfWidthColumnsMaxScaleable};
    }
    
    @media (min-width: 63rem) {
      width: ${fourOfSixColumnsMaxWidthScaleable};
    }
  `,
};

const ImageGridItem = ({ promoType, dir, children, ...props }) => {
  const gridClasses = imageGridStyles[promoType] || imageGridStyles.regular;
  const fallbackStyles = imageGridFallbackStyles[promoType] ? imageGridFallbackStyles[promoType](dir) : imageGridFallbackStyles.regular(dir);
  
  return (
    <div
      className={`inline-block align-top relative ${gridClasses}`}
      style={{
        ...(!CSS.supports(grid) && {
          ...fallbackStyles
        }),
        ...(CSS.supports(grid) && {
          width: 'initial'
        })
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ImageGridItem;
