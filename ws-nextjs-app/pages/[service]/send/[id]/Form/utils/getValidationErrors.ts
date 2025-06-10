import { FieldData, OnChangeInputName, ValidationError } from '../../types';

const getValidationErrors = (state: Record<OnChangeInputName, FieldData>) => {
  const formEntriesNew = new Map(Object.entries(state));

  const errorList: ValidationError[] = [];

  formEntriesNew.forEach((data, key) => {
    const { isValid, messageCode } = data;
    if (isValid === false) {
      errorList.push({
        id: key,
        messageCode,
      });
    }
  });
  return errorList;
};

export default getValidationErrors;
