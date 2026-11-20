import buildIChefURL from '#app/lib/utilities/ichefURL';

type MarkdownBlock = {
  type: string;
  model: {
    text?: string;
    blocks?: MarkdownBlock[];
    locator?: string;
    originCode?: string;
  };
};

export const getBlockText = ({ model }: MarkdownBlock): string =>
  model.text ?? model.blocks?.map(getBlockText).join('') ?? '';

const inlineText = (block: MarkdownBlock): string =>
  getBlockText(block).replace(/[\\`*_{}[\]()#+.!<>|~=&-]/g, '\\$&');

const renderBlock = (block: MarkdownBlock): string => {
  switch (block.type) {
    case 'paragraph':
      return inlineText(block);
    case 'headline':
      return `# ${inlineText(block)}`;
    case 'subheadline':
      return `## ${inlineText(block)}`;
    case 'text':
      return (block.model.blocks ?? [])
        .map(renderBlock)
        .filter(Boolean)
        .join('\n\n');
    case 'image': {
      const blocks = block.model.blocks ?? [];
      const image = blocks.find(({ type }) => type === 'rawImage');
      const altText = blocks.find(({ type }) => type === 'altText');

      if (!image?.model.locator) return '';

      const imageUrl = buildIChefURL({
        originCode: image.model.originCode || 'cpsprodpb',
        locator: image.model.locator,
        resolution: 800,
      });

      return `![${altText ? inlineText(altText) : ''}](${imageUrl})`;
    }
    default:
      return '';
  }
};

export default function blocksToMarkdown(blocks: MarkdownBlock[]): string {
  return blocks.map(renderBlock).filter(Boolean).join('\n\n');
}
