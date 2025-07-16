import React from 'react';

const TextGridItem = ({ bulletinType, fullWidth, dir, children, ...props }) => {
  const paddingClass = dir === 'ltr' ? 'pl-double' : 'pr-double';
  
  const radioClasses = bulletinType === 'radio' ? 
    `group-3:max-group-3:${!fullWidth ? 'w-2/3' : 'w-full'} group-3:max-group-3:${paddingClass}` : 
    '';
  const tvClasses = bulletinType === 'tv' ? 
    `group-3:${!fullWidth ? 'w-1/2' : 'w-full'} group-3:${paddingClass}` : 
    '';
  
  const gridRadioClasses = bulletinType === 'radio' ? 'supports-grid:group-3:max-group-3:col-start-3 supports-grid:group-3:max-group-3:col-span-4 supports-grid:group-3:max-group-3:p-0' : '';
  const gridTvClasses = bulletinType === 'tv' ? 'supports-grid:group-3:col-start-4 supports-grid:group-3:col-span-3 supports-grid:group-3:p-0' : '';
  
  return (
    <div
      className={`inline-block w-full ${radioClasses} ${tvClasses} supports-grid:w-auto supports-grid:col-span-6 ${!fullWidth ? gridRadioClasses : ''} ${!fullWidth ? gridTvClasses : ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default TextGridItem;
