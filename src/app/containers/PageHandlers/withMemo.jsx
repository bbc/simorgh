import React from 'react';
import { element } from 'prop-types';

const WithMemo = Component => {
  const ComponentMemo = React.memo(props => {
    return <Component {...props} />;
  });

  const WithMemoContainer = props => {
    const { history, location, match, route, ...useful } = props;
    return <ComponentMemo {...useful} />;
  };

  return WithMemoContainer;
};

WithMemo.propTypes = {
  Component: element,
};

export default WithMemo;
