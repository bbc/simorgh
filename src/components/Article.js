import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Headline from './Headline';

class Article extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return {};
  }

  render(){
    return (
      <Fragment>
        <NavLink to="/">Home</NavLink>
        <Headline/>
      </Fragment>
    );
  }
}

export default Article;
