import React, { useContext } from 'react';
import { any, objectOf } from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const ComponentUsingContext = ({ context }) => {
  const value = useContext(context);
  return (
    <>
      <span>
        {JSON.stringify(value, (key, val) =>
          typeof val === 'function' ? val.toString() : val,
        )}
      </span>
    </>
  );
};

ComponentUsingContext.propTypes = {
  context: objectOf(any).isRequired,
};
