import React from 'react';
import { withData } from 'react-isomorphic-data';

const SubComponent = ({ users }) => {
  //   const { data } = useData('https://jsonplaceholder.typicode.com/todos/1', {});
  return <h1>Hello Sub component {JSON.stringify(users.data)}</h1>;
};

export default withData({
  url: 'https://jsonplaceholder.typicode.com/users',
  name: 'users',
  dataOptions: {
    ssr: true,
    fetchPolicy: 'cache-first',
  },
})(SubComponent);
