const convertSocialEmbed = (block) => {
  const { type, source, ...rest } = block;

  return {
    type,
    model: {
      blocks: [
        {
          type: source,
          model: {
            ...rest,
          },
        },
      ],
    },
  };
};

export default convertSocialEmbed;
