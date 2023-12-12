type ContentType = {
  type: string;
  model: {
    text?: string | number[];
    blocks?: ContentType[];
  };
};

type Dictionary = Map<string, number>;
type ClientDictionary = { [key: number]: string };

export class Counter {
  count: number;

  constructor() {
    this.count = 0;
  }

  inc() {
    this.count += 1;
  }
}

const encoder = (str: string, dict: Dictionary, counter: Counter) => {
  const text = str.split(' ');
  const numberArr = [];

  for (let i = 0; i < text.length; i += 1) {
    const word = text[i];
    const key = dict.get(word);

    if (key) {
      numberArr[i] = key;
    } else {
      const mapSize = counter.count;
      numberArr[i] = mapSize;
      dict.set(word, mapSize);
      counter.inc();
    }
  }

  return numberArr.join(',');
};

export const decoder = (str: string, dict: ClientDictionary) => {
  const text = str.split(',');
  const decoded = [];

  for (let i = 0; i < text.length; i += 1) {
    const num = Number.parseInt(text[i], 10);
    const word = dict[num];
    decoded[i] = word;
  }

  return decoded.join(' ');
};

const encodeText = (
  content: ContentType,
  map: Dictionary,
  counter: Counter,
) => {
  const blocks = content.model?.blocks;
  const text = content.model?.text;

  let encodedBlocks = null;
  let encodedText = null;

  if (text) {
    encodedText = encoder(text as string, map, counter);
  }

  if (blocks) {
    encodedBlocks = [...blocks];
    for (let index = 0; index < blocks.length; index += 1) {
      encodedBlocks[index] = encodeText(blocks[index], map, counter);
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
