import equals from 'ramda/src/equals';

export default (
  { location: { hash: prevHash, ...prevLocation }, ...prevProps },
  { location: { hash: nextHash, ...nextLocation }, ...nextProps },
) => {
  const propsAreEqual = equals(prevProps, nextProps);
  const locationIsEqual = equals(prevLocation, nextLocation);

  return propsAreEqual && locationIsEqual;
};
