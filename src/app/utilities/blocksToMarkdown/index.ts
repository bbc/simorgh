export default function blocksToMarkdown(blocks: Block[]): string {
  return blocks.map(block => renderBlock(block)).join('\n\n');
}

function renderBlock(block: Block): string {
  switch (block.type) {
    case 'paragraph':
      return block.model?.text ?? '';
    case 'headline':
      return `# ${block.model?.blocks[0].model.blocks[0].model.text ?? ''}`;
    case 'subheadline':
      return `## ${block.model?.blocks[0].model.blocks[0].model.text ?? ''}`;
    case 'text':
      const thisBlock = block.model.blocks;
      const returnText = thisBlock.reduce((acc, block) => {
        return acc + `${block.model?.text}\r\r`;
      }, '');
      return `${returnText ?? ''}`;
    case 'image':
        const imgSrc = block.model.blocks[1].type === 'rawImage' ? block.model.blocks[1].model.locator : block.model.blocks[2].model.locator;
        return `![${block.model.blocks[0].model.blocks[0].model.blocks[0].model.text}](https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/${imgSrc}.webp)`;
    default:
      // console.log(block.type, block);
  }
}