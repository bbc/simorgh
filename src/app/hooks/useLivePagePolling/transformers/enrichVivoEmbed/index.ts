import { OEmbedData } from '#app/components/Embeds/types';
import { OptimoBlock } from '#app/models/types/optimo';
import addFullHeightToFlourishSrc from '../addFullHeightToFlourishSrc';

export interface NativeVivoEmbed {
  type: 'paragraph';
  model: {
    blocks: OptimoBlock[];
  };
}

interface RawEmbedModel {
  locator: string;
}

const flourishTemplate = (type: string, id: string) => `
  <iframe 
    src="https://flo.uri.sh/${type}/${id}/embed"
    frameborder="0"
    scrolling="no"
    height="575"
    width="700"
    style="width:100%;"
    title="Interactive or visual content"></iframe>
`;

const enrichFlourishBlock = (type: string) => (id: string) => {
  const flourishBlock = {
    version: '1.0',
    provider_name: 'Flourish',
    provider_url: 'https://flourish.studio',
    html: flourishTemplate(type, id),
    width: 700,
    height: 575,
    type: 'rich',
    source: `https://public.flourish.studio/${type}/${id}`,
    url: `https://public.flourish.studio/${type}/${id}`,
    srcLink: `https://flo.uri.sh/${type}/${id}/embed?auto=1`,
    oEmbedType: 'aresFlourish',
  } as OEmbedData;

  const withFullHeightData = addFullHeightToFlourishSrc(flourishBlock);
  return withFullHeightData;
};

const enrichRiddleBlock = () => (id: string) => ({
  version: '2.0',
  provider_name: 'riddle',
  provider_url: 'https://www.riddle.com',
  html: null,
  riddleId: id,
  url: `https://www.riddle.com/embed/a/${id}?lazyImages=false&staticHeight=false`,
  type: 'rich',
  iFrameTitle: 'Interactive or visual content',
  oEmbedType: 'clientSideRiddle',
});

type EnrichFunctions = Record<
  string,
  (_type: string) => (_id: string) => Record<string, string | number | null>
>;

const enrichMap: EnrichFunctions = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  flourishEmbed: enrichFlourishBlock,
  riddleEmbed: enrichRiddleBlock,
};

export default (block: OptimoBlock): OptimoBlock => {
  const embedBlock = (block as NativeVivoEmbed).model.blocks?.[0];
  const blockType = embedBlock?.type;

  if (blockType?.includes('Embed')) {
    const { locator } = embedBlock.model as RawEmbedModel;
    const id = locator.split(':').at(-1);
    const assetType = locator.split(':').at(-2);

    if (id && assetType) {
      const enrichFn = enrichMap[blockType](assetType);

      if (enrichFn) {
        const enrichedBlock = enrichFn(id);
        const optimoFormattedBlock = {
          type: 'oEmbed',
          model: {
            oembed: enrichedBlock,
          },
        } as OEmbedData;

        return optimoFormattedBlock as OptimoBlock;
      }
    }
  }

  return block;
};
