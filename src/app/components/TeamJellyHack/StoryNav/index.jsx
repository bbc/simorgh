import React from 'react';
import styled from '@emotion/styled';

const NavButton = ({ isCurrentPage, index, setCurrentPage }) => {
  return <button onClick={() => setCurrentPage(index)} />;
};

const StoryNav = ({ numStories, currentPage, setCurrentPage }) => {
  const navButtons = [];
  for (let i = 0; i < numStories; i++) {
    navButtons.push(
      <li>
        <NavButton
          isCurrentPage={i === currentPage}
          index={i}
          setCurrentPage={setCurrentPage}
        />
      </li>,
    );
  }
  return <ol>{navButtons}</ol>;
};

export default StoryNav;
