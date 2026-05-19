const uasKeys = {
  all: (userId: string) => ['uas', userId] as const,
  favourites: (userId: string) =>
    [...uasKeys.all(userId), 'favourites'] as const,
  favouritesList: (userId: string) =>
    [...uasKeys.favourites(userId), 'list'] as const,
  favouriteStatus: (userId: string, articleId: string) =>
    [...uasKeys.favourites(userId), 'status', articleId] as const,
};

export default uasKeys;
