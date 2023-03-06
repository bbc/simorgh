/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';

const HomePage = ({ pageData }) => {
  return <div>Hi, I am a Home Page component! My id is {pageData.id}</div>;
};
export default HomePage;
