import React from 'react';

const NavButton = ({ isCurrentPage, index, setCurrentPage }) => {
  return <button onClick={() => setCurrentPage(index)} />;
};

const StoryNav = ({ numStories, currentPage, setCurrentPage }) => {
  const navButtons = new Array(numStories).map((_, index) => {
    return (
      <li>
        <NavButton
          isCurrentPage={index === currentPage}
          index={index}
          setCurrentPage={setCurrentPage}
        />
      </li>
    );
  });
  console.log(navButtons);
  // for (let i = 0; i < numStories; i++) {
  //   navButtons.push(
  // <li>
  //   <NavButton
  //     isCurrentPage={i === currentPage}
  //     index={i}
  //     setCurrentPage={setCurrentPage}
  //   />
  // </li>,
  //   );
  // }
  return <ol>{navButtons}</ol>;
};

export default StoryNav;
