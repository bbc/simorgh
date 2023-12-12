type ContentType = {
  type: string;
  model: {
    text?: string | number;
    blocks?: ContentType[];
  };
};

type Dictionary = Map<string, number>;

const encoder = (str: string | number, dict: Dictionary) => {
  return 123;
};

const decoder = (num: number) => {
  return '';
};

const encodeText = (content: ContentType, map: Dictionary) => {
  const blocks = content.model?.blocks;
  const text = content.model?.text;

  let encodedBlocks = null;
  let encodedText = null;

  if (text) {
    encodedText = encoder(text, map);
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
