import { Services, Variants } from '#app/models/types/global';

type EmbedUrlParts = {
  assetId: string | null;
  mediaDelimiter?: string | null;
  mediaId?: string | null;
  service: Services;
  variant?: Variants | null;
};

// to do - remove?
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
