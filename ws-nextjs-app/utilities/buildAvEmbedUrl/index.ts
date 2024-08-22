type EmbedUrlParts = {
  assetId: string;
  mediaDelimiter: string | null;
  mediaId: string | null;
  service: string;
  variant: string;
};

export default function buildAvEmbedURL({
  assetId,
  mediaDelimiter,
  mediaId,
  service,
  variant,
}: EmbedUrlParts) {
  const siteUri = `${service}${variant ? `/${variant}` : ''}`;
  const mediaPath =
    mediaDelimiter && mediaId ? `/${mediaDelimiter}/${mediaId}` : '';

  return `https://www.bbc.com/${siteUri}/av-embeds/${assetId}${mediaPath}`;
}
