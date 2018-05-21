import React from 'react';
import { NavLink } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>Hello, World!</h1>        
        <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/article/c0123456789o">An Article</NavLink></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Home;
