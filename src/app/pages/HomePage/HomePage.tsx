/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';

interface HomePageProps {
  pageData: {
    id: string;
    title: string;
  };
}

const HomePage = ({ pageData }: HomePageProps) => {
  return (
    <div data-testid="home-page">
      Hi, I am a Home Page component and your page id is {pageData.id} and the
      title is {pageData.title}!
    </div>
  );
};
export default HomePage;
