import React, { Component } from 'react';
import styled from 'styled-components';

const BBCNewsLink = styled.a`
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  font-size: 2.2em;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
`;

const BBCNewsHeader = styled.header`
  background-color: #bb1919;
  height: 40px;
  width: 100%;
  padding: 15px 16px;
`;

class Header extends Component {
  state = {
    title: 'BBC News',
  };

  render() {
    const { title } = this.state;

    return (
      <BBCNewsHeader role="banner" aria-label="BBC News">
        <BBCNewsLink href="http://bbc.co.uk/news" id="brand">
          {title}
        </BBCNewsLink>
      </BBCNewsHeader>
    );
  }
}

export default Header;
