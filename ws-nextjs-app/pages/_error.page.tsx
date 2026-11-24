import { Component } from 'react';
import { NextPageContext } from 'next/types';
import NextError from 'next/error';
import { NOT_FOUND } from '#app/lib/statusCodes.const';

class Error extends Component<{ statusCode: number }> {
  static async getInitialProps(ctx: NextPageContext) {
    const { res, err } = ctx;
    let statusCode = NOT_FOUND;

    if (res) {
      statusCode = res.statusCode;
    } else if (err) {
      statusCode =
        typeof err.statusCode === 'number' ? err.statusCode : statusCode;
    }

    if (ctx.req && res) {
      const { default: getRequestProps } =
        await import('#utilities/pageRequests/getRequestProps');
      const requestProps = await getRequestProps(ctx);
      return { ...requestProps, status: statusCode, statusCode };
    }

    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return <NextError statusCode={statusCode} />;
  }
}

export default Error;
