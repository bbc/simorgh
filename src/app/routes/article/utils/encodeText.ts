type ContentType = {
  type: string;
  model: {
    text?: string;
    blocks?: ContentType[];
  };
};

type Dictionary = {
  [key: string]: number;
};

const encodeText = (content: ContentType, map: Dictionary) => {
  const blocks = content.model?.blocks;
  const text = content.model?.text;

  let encodedBlocks = null;
  let encodedText = null;

  if (text) {
    encodedText = 'Changed Text';
  }

  if (blocks) {
    encodedBlocks = [...blocks];
    for (let index = 0; index < blocks.length; index += 1) {
      encodedBlocks[index] = encodeText(blocks[index], map);
    }
  }

  const encodedBlock = {
    ...content,
    model: {
      ...content.model,
      ...(encodedText && { text: encodedText }),
      ...(encodedBlocks && { blocks: encodedBlocks }),
    },
  };

  return encodedBlock;
};

export default encodeText;
