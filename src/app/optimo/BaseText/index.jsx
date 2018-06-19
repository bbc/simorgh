import React from 'react';
import Context from './Context';

const BaseText = ({ text }) => (
  <Context.Consumer>
    {Component => <Component>{text}</Component>}
  </Context.Consumer>
);

export default BaseText;
