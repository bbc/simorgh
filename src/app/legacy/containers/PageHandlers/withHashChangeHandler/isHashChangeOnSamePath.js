export default (
  { location: { hash: prevHash, pathname: prevPathname } = {} },
  { location: { hash: nextHash, pathname: nextPathname } = {} },
) => {
  const isSamePath = prevPathname === nextPathname;
  const isDifferentHash = prevHash !== nextHash;

  // Memoise the component if the URL hash value changes on the same path
  return isSamePath && isDifferentHash;
};
