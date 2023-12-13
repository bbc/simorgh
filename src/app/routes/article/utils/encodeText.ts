type ContentType = {
  type: string;
  model: {
    text?: string | number[];
    blocks?: ContentType[];
  };
};

type Dictionary = Map<string, number>;
type ClientDictionary = { [key: number]: string };
type EscapeDictionary = { [key: string]: string };

export class Counter {
  count: number;

  constructor() {
    this.count = 0;
  }

  inc() {
    this.count += 1;
  }
}

const commonStrings: EscapeDictionary = {
  '<script': '~a~',
  '/script>': '~b~',
  '<html': '~c~',
  '/html>': '~d~',
  '<div': '~e~',
  '/div>': '~f~',
  'name=': '~g~',
  'content=': '~h~',
  'class=': '~i~',
  'id=': '~j~',
  'data-chunk=': '~k~',
  'type=': '~l~',
  'crossorigin="anonymous"': '~m~',
  'role=': '~n~',
};

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

export const reverseKeyValues = (dict: EscapeDictionary) => {
  const clientArray: EscapeDictionary = {};
  const objKeys = Object.keys(dict);

  for (let i = 0; i < objKeys.length; i += 1) {
    const key = objKeys[i];
    const value = dict[key];
    clientArray[value] = key;
  }
  return clientArray;
};

export const sendToClient = (
  encoded: number[],
  dictionary: ClientDictionary,
) => `<script>
console.log("DECODING...")
const dictClient = ${JSON.stringify(dictionary)}
const escapedStr = ${JSON.stringify(reverseKeyValues(commonStrings))}

const doc = [${encoded}]

const decoder = (text, dict) => {

  const decoded = [];

  for (let i = 0; i < text.length; i += 1) {
      const num = Number.parseInt(text[i], 10);
      const word = dict[num];
      decoded[i] = word;
  }

  const preText = decoded.join(' ');
  let joined = preText;
  const objKeys = Object.keys(escapedStr);

  for (let i = 0; i < objKeys.length; i += 1) {
      const key = objKeys[i];
      const value = escapedStr[key];
      joined = joined.replaceAll(key, value);
  }

  return joined;
}

const decodedDoc = decoder(doc, dictClient)
document.documentElement.innerHTML = decodedDoc

</script>`;

export const encoderV2 = (str: string, dict: Dictionary, counter: Counter) => {
  // let text = str.split(' ');

  let preText = str;

  const objKeys = Object.keys(commonStrings);
  for (let i = 0; i < objKeys.length; i += 1) {
    const key = objKeys[i];
    const value = commonStrings[key];
    preText = preText.replaceAll(key, value);
  }

  const text = preText.split(' ');
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

  return numberArr.toString();
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

export const createClientDictionary = (dict: Dictionary) => {
  const clientArray: ClientDictionary = {};
  dict.forEach((value, key) => {
    clientArray[value] = key;
  });
  return clientArray;
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

export const decodeBlock = (content: ContentType, map: ClientDictionary) => {
  const blocks = content.model?.blocks;
  const text = content.model?.text;

  let encodedBlocks = null;
  let encodedText = null;
  if (text) {
    encodedText = decoder(text as string, map);
  }

  if (blocks) {
    encodedBlocks = [...blocks];
    for (let index = 0; index < blocks.length; index += 1) {
      encodedBlocks[index] = decodeBlock(blocks[index], map);
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
