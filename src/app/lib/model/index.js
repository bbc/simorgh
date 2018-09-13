import createMetadata from './metadata';

const createDataModel = data => {
  const { content, metadata: rawMetaData, promo } = data;
  const { blocks } = content.model;
  const metadata = createMetadata(rawMetaData, promo);

  return { blocks, metadata };
};

export default createDataModel;
