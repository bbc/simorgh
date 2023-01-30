/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import InlineLink from '../InlineLink';
import { ServiceContext } from '../../contexts/ServiceContext';

const UsefulLinks = () => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  return <div>Hi, I am a Useful Links component</div>;
};
export default UsefulLinks;
