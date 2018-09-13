const createMetadata = (metadata, promo) => {
  const id = metadata.id.split(':').pop();

  return {
    canonicalLink: `https://www.bbc.com/news/articles/${id}`,
    lang: metadata.passport.language,
    title: promo.headlines.seoHeadline,
  };
};

export default createMetadata;
