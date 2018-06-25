const mp = id => {
  const mediaPlayer = document.getElementById(id).player(playlistSettings);
  mediaPlayer.load();
  console.log('inside mp');
};

export default mp;
