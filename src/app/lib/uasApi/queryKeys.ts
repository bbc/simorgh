const uasKeys = {
  all: (userId: string) => ['uas', userId] as const,
  favourites: (userId: string) =>
    [...uasKeys.all(userId), 'favourites'] as const,
  favouritesList: (userId: string) =>
    [...uasKeys.favourites(userId), 'list'] as const,
  favouritesPage: (userId: string, startIndex: number) =>
    [...uasKeys.favouritesList(userId), startIndex] as const,
  favouriteStatus: (userId: string, articleId: string) =>
    [...uasKeys.favourites(userId), 'status', articleId] as const,
  // POC (Follow Topics): mirrors the favourites key structure under a
  // separate `follows` namespace so topic caches never collide with articles.
  follows: (userId: string) => [...uasKeys.all(userId), 'follows'] as const,
  followsList: (userId: string) =>
    [...uasKeys.follows(userId), 'list'] as const,
  followStatus: (userId: string, topicId: string) =>
    [...uasKeys.follows(userId), 'status', topicId] as const,
};

export default uasKeys;
