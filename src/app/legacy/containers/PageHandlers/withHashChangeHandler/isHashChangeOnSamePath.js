export default (previous, next) => {
  const { hash: prevHash, pathname: prevPathname } = previous?.location || {};
  const { hash: nextHash, pathname: nextPathname } = next?.location || {};

  const isSamePath = prevPathname === nextPathname;
  const isDifferentHash = prevHash !== nextHash;

  // Memoise the component if the URL hash value changes on the same path
  return isSamePath && isDifferentHash;
};
