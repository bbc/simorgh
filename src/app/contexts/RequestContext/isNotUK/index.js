const isNotUK = bbcCountry =>
  bbcCountry
    ? !['GB', 'IM', 'JE', 'GG'].includes(bbcCountry.toUpperCase())
    : true;

export default isNotUK;
