import { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import loadInitialData from './loadInitialData';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.initialData,
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

      this.setState({
        data: null,
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
          loading: false,
          error: null,
          loadInitialDataPromise: null,
        });
      } catch (error) {
        this.setState({
          data: null,
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
      loading: this.state.loading,
      error: this.state.error,
    });
  }
}

export default withRouter(App);
