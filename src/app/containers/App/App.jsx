/* eslint-disable */
/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import loadInitialData from '../../routes/loadInitialData';

export class App extends Component {
  constructor(props) {
    super(props);

    const { match } = this.getRouteProps(
      this.props.routes,
      this.props.location.pathname,
    );

    this.state = {
      data: this.props.initialData,
      service: match.params.service,
      isAmp: !!match.params.amp,
      loading: false,
      error: null,
      loadInitialDataPromise: null,
    };
  }

  async componentDidUpdate({ location: prevLocation }) {
    if (this.props.location.pathname !== prevLocation.pathname) {
      const initialData = loadInitialData(
        this.props.location.pathname,
        this.props.routes,
      );

      const match = this.getRouteProps(
        this.props.routes,
        this.props.location.pathname,
      );

      this.setState({
        data: null,
        service: match.params.service,
        isAmp: match.params.amp,
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
          service: match.params.service,
          isAmp: match.params.amp,
          loading: false,
          error: null,
          loadInitialDataPromise: null,
        });
      } catch (error) {
        this.setState({
          data: null,
          service: match.params.service,
          isAmp: match.params.amp,
          loading: false,
          error,
          loadInitialDataPromise: null,
        });
      }
    }
  }

  getRouteProps(routes, url) {
    const matchedRoutes = matchRoutes(routes, url);

    if (matchedRoutes.length <= 0) {
      throw new Error(`No route was found for ${url}.`);
    }

    return matchedRoutes[0];
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
