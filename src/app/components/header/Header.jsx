import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const BBCNewsBranding = styled.div`
  background-color: #bb1919;
  height: 58px;
  width: 100%;
`;

const BBCNewsBrandingLogo = styled.div`
  margin: 0 62px 0 62px;
  padding: 10px 16px 10px 16px;
`;

const BBCNewsNavigation = styled.div`
  width: 100%;
`;

const BBCNewsLink = styled.a`
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  font-size: 2.4em;
  color: #fff;
  text-transform: uppercase;
`;

class Header extends Component {
  state = {
    title: 'BBC News',
  };

  render() {
    const { title } = this.state;

    return (
      <Fragment>
        <BBCNewsBranding>
          <BBCNewsBrandingLogo>
            <BBCNewsNavigation>
                  <BBCNewsLink href="/news" id="brand">
                    {title}
                  </BBCNewsLink>
            </BBCNewsNavigation>
          </BBCNewsBrandingLogo>
        </BBCNewsBranding>
      </Fragment>
    );
  }
}

export default Header;