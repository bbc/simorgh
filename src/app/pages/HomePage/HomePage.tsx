/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';

const HomePage = ({ pageData }) => {
  return (
    <div>
      Hi, I am a Home Page component and your page id is {pageData.id} and the
      title is {pageData.title}!
    </div>
  );
};
export default HomePage;
