const isLiveTVNavItem = ({ navItemUrl, liveTVChannelIdentifier }) =>
  liveTVChannelIdentifier && navItemUrl === liveTVChannelIdentifier;

export default isLiveTVNavItem;
