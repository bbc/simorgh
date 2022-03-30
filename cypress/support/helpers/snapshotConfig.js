const snapTheseServices = [
  'afrique',
  'amharic',
  'mundo',
  'pashto',
  'persian',
  'pidgin',
  'thai',
  'russian',
];

export default service => {
  if (snapTheseServices.includes(service)) {
    return true;
  }
  return false;
};
