const convertSocialEmbed = block => {
  const { type, source, href } = block;
  const sourceLowerCase = source.toLowerCase();

  // https://twitter.com/BBCWorld/status/1224253149176791040
  // https://www.instagram.com/p/B8FPf4ZphHi/?utm_source=ig_web_copy_link
  // https://youtu.be/J4KzO1P6gW4

  const getIdFromUrl = (provider, url) => {
    const getUrlIdIndex = p =>
      ({
        twitter: 5,
        instagram: 4,
        youtube: 3,
      }[p]);

    return url.split('/')[getUrlIdIndex(provider)];
  };

  return {
    type,
    model: {
      source: sourceLowerCase,
      href,
      id: getIdFromUrl(source, href),
    },
  };
};

export default convertSocialEmbed;
