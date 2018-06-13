import React, { Component } from 'react';
import styled from 'styled-components';

const Link = styled.a`
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  font-size: 2.2em;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
`;

const StyledHeader = styled.header`
  background-color: #bb1919;
  height: 40px;
  width: 100%;
  padding: 15px 16px;
`;

class BBCNewsBanner extends Component {
  state = {
    title: 'BBC News',
  };

  render() {
    const { title } = this.state;

    return (
      <StyledHeader role="banner" aria-label="BBC News">
        <Link href="http://bbc.co.uk/news">{title}</Link>
      </StyledHeader>
    );
  }
}

export default BBCNewsBanner;
