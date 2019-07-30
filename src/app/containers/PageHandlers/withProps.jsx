import React from 'react';
import { element } from 'prop-types';

const withProps = Component => {
  const withPropsContainer = props => {
    const { history, location, match, route, ...useful } = props;
    return <Component {...useful} />;
  };

  return withPropsContainer;
};

withProps.propTypes = {
  Component: element,
};

export default withProps;
