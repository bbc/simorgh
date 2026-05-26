import type { OptimoBlock } from '#app/models/types/optimo';
import { instagram, twitter, youtube } from './providerMarkup';

export interface CustomEmbedBlock {
  type: 'customEmbed';
  model: {
    embedType: SupportedCustomEmbeds;
    href: string;
  };
}

export type SupportedCustomEmbeds = 'twitter' | 'instagram' | 'youtube';

const SUPPORTED_PLATFORMS = ['twitter', 'instagram', 'youtube'];

const providerMarkup = ({ provider, url }: { provider: string; url: string }) =>
  ({
    instagram: instagram({ provider, url }),
    twitter: twitter({ provider, url }),
    youtube: youtube({ provider, url }),
  })[provider];

const buildSocialEmbedBlock = ({
  provider,
  url,
}: {
  provider: string;
  url: string;
}): OptimoBlock => {
  const socialEmbedUrl =
    provider === 'youtube' ? url.replace(/\/watch\?v=/, '/embed/') : url;

  return {
    type: 'social',
    model: {
      source: socialEmbedUrl,
      blocks: [
        {
          type: 'renditions',
          model: {
            locator: '',
            blocks: [
              {
                type: 'aresOEmbed',
                model: {
                  oembed: {
                    provider_name: provider,
                    url: socialEmbedUrl,
                    html: providerMarkup({ provider, url: socialEmbedUrl }),
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
};

const isSupportedCustomEmbed = (block: OptimoBlock) =>
  block?.type === 'customEmbed' &&
  'embedType' in block.model &&
  SUPPORTED_PLATFORMS.includes(block.model.embedType as SupportedCustomEmbeds);

export default (block: OptimoBlock): OptimoBlock => {
  if (isSupportedCustomEmbed(block)) {
    const {
      model: { embedType, href },
    } = block as CustomEmbedBlock;

    return buildSocialEmbedBlock({
      provider: embedType,
      url: href,
    });
  }
  return block;
};
