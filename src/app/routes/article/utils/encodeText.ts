type ContentType = {
  type: string;
  model: {
    text?: string;
    blocks?: ContentType[];
  };
};

const encodeText = (content: ContentType) => {
  const blocks = content.model?.blocks;
  const text = content.model?.text;

  if (text) {
    console.log('WE FOUND A TEXT!');
  }

  if (blocks) {
    for (let index = 0; index < blocks.length; index += 1) {
      encodeText(blocks[index]);
    }
  }
};

export default encodeText;
