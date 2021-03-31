const getAmpDestination = ({ PS, GNL }) => {
  /*
   ** AMP Variable substitution is used here to construct a string that
   ** will get the correct destination according to the client's geolocation,
   ** provided by <amp-geo>.
   ** https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md
   ** https://amp.dev/documentation/components/amp-geo/
   */

  // eslint-disable-next-line no-template-curly-in-string
  const ampGeo = '${ampGeo}'; // String representing the list of matched groups (comma delimited) e.g. eea,gbOrUnknown
  const ampGeoMatchesGbOrUnknown = `$MATCH(${ampGeo}, gbOrUnknown, 0)`; // Checks for presence of 'gbOrUnknown' and returns 'gbOrUnknown' if found
  const isGbOrUnknown = `$EQUALS(${ampGeoMatchesGbOrUnknown}, gbOrUnknown)`; // Returns 'true' if the result of the $MATCH was 'gbOrUnknown'
  return `$IF(${isGbOrUnknown}, ${PS}, ${GNL})`; // If 'true', use PS destination, otherwise use GNL
};

export default getAmpDestination;
