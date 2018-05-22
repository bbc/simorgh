import React from "react";
import PropTypes from 'prop-types';

const Headline = (props) => <h1>{props.text}</h1>;

Headline.propTypes = {
  text: PropTypes.string.isRequired
};

export default Headline;
