import React from 'react';
import { containerProp } from '../../models/proptypes';

const SubHeading = ({ text }) => <h2>{text}</h2>;

SubHeading.propTypes = containerProp;

SubHeading.defaultProps = {
  text: 'Subheading',
};

export default SubHeading;
