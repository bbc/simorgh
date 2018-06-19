import React from 'react';

import Paragraph from '../components/Paragraph';

const BlockContext = React.createContext({
  BaseTextComponent: Paragraph,
});

export default BlockContext;
