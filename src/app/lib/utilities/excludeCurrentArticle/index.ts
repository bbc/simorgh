// Promo/summary ids across onward journey (OJ) sources are not consistently
// formatted - e.g. a BFF curation Summary.id is a bare optimo id
// ("c0000000001o"), while an article's own metadata.id and some promo ids
// (e.g. TopStoriesSection's TopStoryItem.id) are full URNs
// ("urn:bbc:ares::article:c0000000001o"). Comparing the final ':'-delimited
// segment normalises both forms so the same content is always matched,
// regardless of which OJ surface it came from.
const getNormalisedId = (id?: string): string | undefined =>
  id?.split(':').pop();

const ARTICLE_URI_ID_PATTERN = /\/articles\/([^/?#]+)/;

const getIdFromArticleUri = (uri?: string): string | undefined =>
  uri?.match(ARTICLE_URI_ID_PATTERN)?.[1];

type PromoWithId = {
  id?: string;
  uri?: string;
};

/**
 * Removes the promo/summary matching the current article from a list of
 * OJs, so an article is never recommended
 * to a reader who is already viewing it.
 */
const excludeCurrentArticle = <Promo extends PromoWithId>(
  promos: Promo[] | null | undefined,
  currentArticleId?: string,
): Promo[] => {
  const normalisedCurrentArticleId = getNormalisedId(currentArticleId);
  const promoList = promos || [];

  if (!normalisedCurrentArticleId) return promoList;

  return promoList.filter(promo => {
    const promoId = promo.id || getIdFromArticleUri(promo.uri);

    return getNormalisedId(promoId) !== normalisedCurrentArticleId;
  });
};

export default excludeCurrentArticle;
