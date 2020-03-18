import React from 'react';
import { withData } from 'react-isomorphic-data';
import SubComponent from './SubComponent';

const Application = ({ todosData }) => {
  return (
    <>
      <h1>Hello World {JSON.stringify(todosData.data)}</h1>
      <SubComponent id="3" />
    </>
  );
};

export default withData({
  url: 'https://jsonplaceholder.typicode.com/todos/1',
  name: 'todosData',
  dataOptions: {
    ssr: true,
    fetchPolicy: 'cache-first',
  },
})(Application);
