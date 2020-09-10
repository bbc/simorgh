import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default ({ href, ...props }) => <Link to={href} {...props} />;
