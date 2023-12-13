/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import App from './App';
import { decodeBlock } from '#app/routes/article/utils/encodeText';

export class ClientApp extends React.Component {
  // Having an error boundary here means that if hydration fails, users are left with the server-rendered DOM
  // Without this, DOM would be removed if hydration fails, leaving users with a blank white page

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { data: props.data };
  }

  componentDidCatch() {}

  componentDidMount() {
    const decoded = decodeBlock(
      this.props.data.pageData.content,
      this.props.data.clientDict,
    );
    this.props.data.pageData.content = decoded;
    this.setState(state => ({
      ...state,
      pageData: { ...state.pageData, content: decoded },
    }));
  }

  render() {
    return (
      <BrowserRouter {...this.props}>
        <App initialData={this.state.data} />
      </BrowserRouter>
    );
  }
}

export const ServerApp = props => (
  <StaticRouter {...props}>
    <App initialData={props.data} bbcOrigin={props.bbcOrigin} />
  </StaticRouter>
);
