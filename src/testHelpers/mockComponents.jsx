import React, { Fragment, useContext } from 'react';
import { any, objectOf } from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const ComponentUsingContext = ({ context }) => {
  const value = useContext(context);
  return (
    <Fragment>
      <span>{JSON.stringify(value)}</span>
    </Fragment>
  );
};

ComponentUsingContext.propTypes = {
  context: objectOf(any).isRequired,
};
