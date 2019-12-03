const isNotUK = bbcCountry =>
  bbcCountry ? !['gb', 'uk'].includes(bbcCountry.toLowerCase()) : true;

export default isNotUK;
