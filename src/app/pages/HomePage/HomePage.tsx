/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';

type HomePageProps = {
  pageData: {
    id: string;
  };
};

const HomePage = ({ pageData }: HomePageProps) => {
  return <div>Hi, I am a Home Page component! My id is {pageData.id}</div>;
};
export default HomePage;
