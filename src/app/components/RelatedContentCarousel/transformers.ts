interface RawBlock {
  type: string;
  model?: any;
}

interface RawRelatedContent {
  model?: {
    blocks?: RawBlock[];
  };
}

export default (rawData: RawRelatedContent) => {
  const blocks = rawData?.model?.blocks || [];

  return blocks
    .map(block => {
      if (block.type !== 'link') return null;

      const linkBlocks = block.model?.blocks || [];

      // 1. Extract the URL (from the text block -> paragraph -> urlLink)
      const textBlock = linkBlocks.find((b: RawBlock) => b.type === 'text');
      const paragraph = textBlock?.model?.blocks?.[0];
      const urlLink = paragraph?.model?.blocks?.[0]?.model;
      const title = urlLink?.text || '';
      const url = urlLink?.locator || '';

      // 2. Extract the Image Locator
      const imageBlock = linkBlocks.find((b: RawBlock) => b.type === 'image');
      const rawImage = imageBlock?.model?.blocks?.find(
        (b: RawBlock) => b.type === 'rawImage',
      )?.model;

      let image = '';
      if (rawImage?.locator) {
        // Construct the standard iChef URL used by Simorgh
        const originCode = rawImage.originCode || 'cpsprodpb';
        image = `https://ichef.bbci.co.uk/ace/standard/660/${originCode}/${rawImage.locator}`;
      }

      // 3. Generate a unique ID
      const id =
        block.model?.locator?.split(':').pop() ||
        Math.random().toString(36).substr(2, 9);

      if (!title || !url) return null;

      return {
        id,
        title,
        url,
        image,
      };
    })
    .filter(Boolean); // Remove null values
};
