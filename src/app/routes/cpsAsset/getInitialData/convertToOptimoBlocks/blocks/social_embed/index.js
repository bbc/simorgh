const convertSocialEmbed = block => {
  const { type, source, href } = block;

  return {
    type,
    model: {
      source,
      href,
    },
  };
};

export default convertSocialEmbed;
