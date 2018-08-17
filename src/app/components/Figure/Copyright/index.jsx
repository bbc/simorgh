import React from 'react';
import { string } from 'prop-types';
import VisuallyHiddenText from '../../VisuallyHiddenText';

const copyrightOffscreenText = 'Copyright';

const appendOffscreenText = copyrightHolder =>
  `${copyrightOffscreenText} ${copyrightHolder}`;

const Copyright = ({ children }) => (
  <VisuallyHiddenText>{appendOffscreenText(children)}</VisuallyHiddenText>
);

Copyright.propTypes = {
  children: string.isRequired,
};

export default Copyright;
