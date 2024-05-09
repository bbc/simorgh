import React, { useContext } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const ComponentUsingContext = ({ context }) => {
  const value = useContext(context);
  /* JSON.stringify returns functions as null, so for the case of the font
     functions, this is needed. (key, val) below allows the stringify to
     replace null with identify-able strings using the funciton names */
  return (
    <span>
      {JSON.stringify(value, (key, val) =>
        typeof val === 'function' ? `*function - ${val.name}*` : val,
      )}
    </span>
  );
};
