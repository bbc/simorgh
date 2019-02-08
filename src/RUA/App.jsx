import { Component, useEffect, useState, useRef } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import loadInitialData from './loadInitialData';

// export class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data: this.props.initialData,
//       loading: false,
//       error: null,
//       loadInitialDataPromise: null,
//     };
//   }

//   async componentDidUpdate({ location: prevLocation }) {
//     if (this.props.location.pathname !== prevLocation.pathname) {

//       console.log('OLD', prevLocation.pathname);
//       console.log('CURRENT', this.props.location.pathname);

//       const initialData = loadInitialData(
//         this.props.location.pathname,
//         this.props.routes,
//       );

//       this.setState({
//         data: null,
//         loading: true,
//         error: null,
//         loadInitialDataPromise: initialData,
//       });
//     }

//     console.log('Always');

//     if (this.state.loading) {
//       console.log('Loading');
//       try {
//         const data = await this.state.loadInitialDataPromise;
//         this.setState({
//           data,
//           loading: false,
//           error: null,
//           loadInitialDataPromise: null,
//         });
//       } catch (error) {
//         this.setState({
//           data: null,
//           loading: false,
//           error,
//           loadInitialDataPromise: null,
//         });
//       }
//     }
//   }

//   render() {
//     return renderRoutes(this.props.routes, {
//       data: this.state.data,
//       loading: this.state.loading,
//       error: this.state.error,
//     });
//   }
// }

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const App = ({ initialData, location, routes }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadInitialDataPromise, setLoadInitialDataPromise] = useState(null);
  const previousLocation = usePrevious(location);

  const stuff = async location => {
    if(previousLocation && previousLocation != location){
      const data = await loadInitialData(location.pathname, routes);

        try {
        setData(data);
        setLoading(false);
        setError(null);
        setLoadInitialDataPromise(null);
      } catch (error) {
        setData(null);
        setLoading(false);
        setError(error);
        setLoadInitialDataPromise(null);
      }
    }
  };

  useEffect(
    () => {
      stuff(location);
    },
    [location],
  );

  return renderRoutes(routes, {
    data,
    loading,
    error,
  });
};

export default withRouter(App);
