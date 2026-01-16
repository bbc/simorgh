export interface IsLiveTVNavItemArgs {
  navItemUrl: string | null | undefined;
  liveTVChannelIdentifier: string | null | undefined;
}

const isLiveTVNavItem = ({
  navItemUrl,
  liveTVChannelIdentifier,
}: IsLiveTVNavItemArgs): boolean =>
  Boolean(liveTVChannelIdentifier) && navItemUrl === liveTVChannelIdentifier;

export default isLiveTVNavItem;
