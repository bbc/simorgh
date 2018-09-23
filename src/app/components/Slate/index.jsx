/* eslint-disable */
import React from 'react';
import Nodes from './Nodes';

const Slate = ({ data }) => (
  <div>
    <h1>Slate POC</h1>
    <Nodes {...data} />
  </div>
);

Slate.getInitialProps = async ({ req } = {}) => {
  try {
    let url = `/data/slate.json`;

    if (req) {
      url = `${process.env.RAZZLE_BASE_PATH}${url}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return { data };
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    return {};
  }
};

export default Slate;
