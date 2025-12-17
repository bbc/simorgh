import { Component } from 'react';
import { NextPageContext } from 'next';
import NextError from 'next/error';
import { NOT_FOUND } from '#app/lib/statusCodes.const';

class Error extends Component<{ statusCode: number }> {
  static getInitialProps({ res, err }: NextPageContext) {
    let statusCode = NOT_FOUND;

    if (res) {
      statusCode = res.statusCode;
    } else if (err) {
      statusCode =
        typeof err.statusCode === 'number' ? err.statusCode : statusCode;
    }

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return <NextError statusCode={statusCode} />;
  }
}

export default Error;
