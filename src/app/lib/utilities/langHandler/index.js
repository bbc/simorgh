const getLangOverride = ({ pathname }) => {
  // Override application variant for ukraine_in_russian idx page
  if (pathname === '/ukrainian/ukraine_in_russian') {
    return 'ru-UA';
  }
  return null;
};

export default getLangOverride;
