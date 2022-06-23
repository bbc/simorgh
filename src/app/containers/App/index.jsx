/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from '#pages/ErrorPage';

export class ClientApp extends React.Component {
  // Having an error boundary here means that if hydration fails, users are left with the server-rendered DOM
  // Without this, DOM would be removed if hydration fails, leaving users with a blank white page
  componentDidCatch() {}

  render() {
    return (
      <BrowserRouter {...this.props}>
        <App initialData={this.props.data} />
      </BrowserRouter>
    );
  }
}

export class ServerApp extends React.Component {
  // Having an error boundary here means that if hydration fails, users are left with the server-rendered DOM
  // Without this, DOM would be removed if hydration fails, leaving users with a blank white page
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.log('Hello ');
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line react/prop-types
    console.log('DO I HAVE AN ERROR  from server app', hasError);
    if (!hasError) {
      return (
        <StaticRouter {...this.props}>
          <App initialData={this.props.data} bbcOrigin={this.props.bbcOrigin} />
        </StaticRouter>
      );
    }
    return <ErrorPage errorCode={500} />;
  }

  // render() {
  //   return (
  //     <StaticRouter {...props}>
  //       <App initialData={props.data} bbcOrigin={props.bbcOrigin} />
  //     </StaticRouter>
  //   );
  // }
}

// export const ServerApp = props => (
//   <StaticRouter {...props}>
//     <App initialData={props.data} bbcOrigin={props.bbcOrigin} />
//   </StaticRouter>
// );
