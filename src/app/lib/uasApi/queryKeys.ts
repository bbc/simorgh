const uasKeys = {
  all: ['uas'] as const,
  favourites: () => [...uasKeys.all, 'favourites'] as const,
  favouritesList: () => [...uasKeys.favourites(), 'list'] as const,
  favouriteStatus: (articleId: string) =>
    [...uasKeys.favourites(), 'status', articleId] as const,
};

export default uasKeys;
