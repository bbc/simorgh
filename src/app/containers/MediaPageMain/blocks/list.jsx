import React from 'react';
import path from 'ramda/src/path';

// eslint-disable-next-line react/prop-types
const ListContainer = ({ items }) => {



  return (
    <ul>
      {items.map(({ text }) => (
        <li>{text}</li>
      ))}
    </ul>
  );
};

export default ListContainer;
