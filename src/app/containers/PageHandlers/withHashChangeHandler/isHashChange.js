export default (
  { location: { hash: prevHash } },
  { location: { hash: nextHash } },
) => {
  return prevHash !== nextHash;
};
