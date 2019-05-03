/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import getRouteProps from './RouteMatch';

import loadInitialData from '../../routes/loadInitialData';

export class App extends Component {
  constructor(props) {
    super(props);

    const { service, isAmp } = getRouteProps(
      this.props.routes,
      this.props.location.pathname,
    );

    this.state = {
      data: this.props.initialData,
      service: service,
      isAmp: isAmp,
      loading: false,
      error: null,
      loadInitialDataPromise: null,
    };
  }

  async componentDidUpdate({ location: prevLocation }) {
    const { service, isAmp } = getRouteProps(
      this.props.routes,
      this.props.location.pathname,
    );

    if (this.props.location.pathname !== prevLocation.pathname) {
      const initialData = loadInitialData(
        this.props.location.pathname,
        this.props.routes,
      );

      this.setState({
        data: null,
        service: service,
        isAmp: isAmp,
        loading: true,
        error: null,
        loadInitialDataPromise: initialData,
      });
    }

    if (this.state.loading) {
      try {
        const data = await this.state.loadInitialDataPromise;
        this.setState({
          data,
          service: service,
          isAmp: isAmp,
          loading: false,
          error: null,
          loadInitialDataPromise: null,
        });
      } catch (error) {
        console.log('error caught');
        this.setState({
          data: null,
          service: service,
          isAmp: isAmp,
          loading: false,
          error,
          loadInitialDataPromise: null,
        });
      }
    }
  }

  render() {
    return renderRoutes(this.props.routes, {
      data: this.state.data,
      service: this.state.service,
      isAmp: this.state.isAmp,
      loading: this.state.loading,
      error: this.state.error,
      bbcOrigin: this.props.bbcOrigin,
    });
  }
}

export default withRouter(App);
