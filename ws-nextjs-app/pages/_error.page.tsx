import React from 'react';
import { NextPageContext } from 'next';
import NextError from 'next/error';
import { NOT_FOUND } from '#app/lib/statusCodes.const';

function Error({ statusCode }: { statusCode: number }) {
  return <NextError statusCode={statusCode} />;
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  let statusCode = NOT_FOUND;

  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode =
      typeof err.statusCode === 'number' ? err.statusCode : statusCode;
  }

  return { statusCode };
};

export default Error;
