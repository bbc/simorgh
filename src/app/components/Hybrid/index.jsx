/* eslint-disable */
import React from 'react';
import Blocks from './Blocks';

const Hybrid = ({ data }) => (
  <div>
    <h1>Hybrid POC</h1>
    <Blocks {...data.model} />
  </div>
);

Hybrid.getInitialProps = async ({ req } = {}) => {
  try {
    let url = `/data/hybrid.json`;

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

export default Hybrid;
