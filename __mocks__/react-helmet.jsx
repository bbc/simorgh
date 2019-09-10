import React from 'react';

// eslint-disable-next-line react/prop-types
export default ({ htmlAttributes, ...props }) => (
  <>
    {htmlAttributes && <helmet-html-attributes {...htmlAttributes} />}
    <helmet-head {...props} />
  </>
);
