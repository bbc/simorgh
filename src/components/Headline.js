import React from "react";
import PropTypes from 'prop-types';

class Headline extends React.Component {
  render() {
    return <h1>{this.props.text}</h1>;
  }
}

Headline.propTypes = {
  text: PropTypes.string.isRequired
};

export default Headline;
