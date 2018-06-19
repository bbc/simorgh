import React from 'react';
import BlockContext from '../BlockContext';

const BaseText = ({ text }) => (
  <BlockContext.Consumer>
    {({ BaseTextComponent }) => <BaseTextComponent>{text}</BaseTextComponent>}
  </BlockContext.Consumer>
);

export default BaseText;
