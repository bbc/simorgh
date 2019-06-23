const scriptMatches = service => [
  /(\/static\/js\/main-\w+\.\w+\.js)/g,
  /(\/static\/js\/vendor-\w+\.\w+\.js)/g,
  new RegExp(`(\\/static\\/js\\/${service}-\\w+\\.\\w+\\.js)`, 'g'),
];

export default scriptMatches;
