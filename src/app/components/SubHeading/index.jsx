import React from 'react';
import { requiredTextProp } from '../../models/proptypes';

const SubHeading = ({ text }) => <h2>{text}</h2>;

SubHeading.propTypes = requiredTextProp;

SubHeading.defaultProps = {
  text: 'Subheading',
};

export default SubHeading;
