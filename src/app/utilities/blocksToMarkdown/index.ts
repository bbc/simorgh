type MarkdownBlock = {
  type: string;
  model: {
    text?: string;
    blocks?: MarkdownBlock[];
    locator?: string;
    originCode?: string;
  };
};

const inlineText = ({ model }: MarkdownBlock): string =>
  model.text?.replace(/[\\`*_{}[\]()#+.!<>|~=&-]/g, '\\$&') ??
  model.blocks?.map(inlineText).join('') ??
  '';

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

      return `![${altText ? inlineText(altText) : ''}](https://ichef.bbci.co.uk/ace/ws/800/${image.model.originCode || 'cpsprodpb'}/${image.model.locator}.webp)`;
    }
    default:
      return '';
  }
};

export default function blocksToMarkdown(blocks: MarkdownBlock[]): string {
  return blocks.map(renderBlock).filter(Boolean).join('\n\n');
}
