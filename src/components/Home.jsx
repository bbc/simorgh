import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Helmet from "react-helmet";
import Headline from "./Headline";

const Home = () => {
  const headline = "Hello, World!";

  return (
    <Fragment>
      <Helmet htmlAttributes={{ lang: "en-GB" }}>
        <title>{headline}</title>
      </Helmet>
      <Headline text={headline} />
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/article/c0123456789o">An Article</NavLink>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Home;
