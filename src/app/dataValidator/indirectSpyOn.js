const play = () =>  {
  console.log('called play');
  return true;
};

const foobar = () =>  {
  console.log('called foobar');
  play();
  return false;
};

module.exports = { play, foobar };


