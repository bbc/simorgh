import React from 'react';
import { NextPageContext } from 'next';
import NextError from 'next/error';

function Error({ statusCode }: { statusCode: number }) {
  return <NextError statusCode={statusCode} />;
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;