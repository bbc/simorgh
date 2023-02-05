/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import App from './App';

export class ClientApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hydrated: false,
    };
  }
  // Having an error boundary here means that if hydration fails, users are left with the server-rendered DOM
  // Without this, DOM would be removed if hydration fails, leaving users with a blank white page
  componentDidCatch() {}

  componentDidMount() {
    this.setState({ hydrated: true });
  }

  render() {
    const { hydrated } = this.state;

    if (!hydrated) return null;

    return (
      <BrowserRouter {...this.props}>
        <App initialData={this.props.data} />
      </BrowserRouter>
    );
  }
}

export const ServerApp = props => (
  <StaticRouter {...props}>
    <App initialData={props.data} bbcOrigin={props.bbcOrigin} />
  </StaticRouter>
);
