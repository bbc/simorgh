import React from 'react';

const ImageGridItem = ({ bulletinType, children, ...props }) => {
  const radioClasses = bulletinType === 'radio' ? 'group-3:max-group-3:w-1/3 group-3:max-group-3:grid-cols-2' : '';
  const tvClasses = bulletinType === 'tv' ? 'group-3:w-1/2 group-3:grid-cols-3' : '';
  
  return (
    <div
      className={`align-top inline-block w-full p-full group-3:p-0 supports-grid:w-auto supports-grid:col-span-6 ${radioClasses} ${tvClasses}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ImageGridItem;
