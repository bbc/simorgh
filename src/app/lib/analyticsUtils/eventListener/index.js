import onClient from '../../utilities/onClient';

const listener = () => {
  if (onClient()) {
    const nav1 = document.getElementById('nav-/yoruba');

    return nav1.addEventListener('click', e => {
      e.preventDefault();
    });
  }

  return 'something';
};

export default listener;
