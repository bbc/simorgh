import { FieldData, OnChangeInputName } from '../../types';

type FieldError = {
  id: string;
  messageCode: string;
};

const getErrorList = (state: Record<OnChangeInputName, FieldData>) => {
  const formEntriesNew = new Map(Object.entries(state));

  const errorList: FieldError[] = [];

  formEntriesNew.forEach((data, key) => {
    const { isValid, messageCode } = data;
    if (isValid === false) {
      errorList.push({ id: key, messageCode: messageCode as string });
    }
  });
  return errorList;
};

export default getErrorList;
