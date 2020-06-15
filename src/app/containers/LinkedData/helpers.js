/* eslint-disable import/prefer-default-export */
export const cleanLinkedData = linkedData => {
  const { thumbnailUrl, publisher, ...data } = linkedData;

  switch (linkedData['@type']) {
    case 'RadioChannel':
      return data;
    default:
      return { ...linkedData };
  }
};
