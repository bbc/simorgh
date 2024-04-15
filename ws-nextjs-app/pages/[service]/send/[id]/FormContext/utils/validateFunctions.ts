import { FieldData, InvalidMessageCodes } from '../../types';

const isStringEmpty = (str: string) =>
  str == null || str.replaceAll(/\s/g, '').length <= 0;

const isValidText: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value } = data;

  let messageCode = null;
  let isValid = true;
  const isInputEmpty = isStringEmpty(value as string);

  if (required && isInputEmpty) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isValid = false;
  }

  return { ...data, isValid, messageCode };
};

const isValidEmail: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value } = data;

  let messageCode = null;
  let isValid = true;
  const isInputEmpty = isStringEmpty(value as string);
  const isValidEmailFormat =
    !isInputEmpty &&
    !!(value as string).match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]+$/g);

  if (required && isInputEmpty) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isValid = false;
  }

  if (!isInputEmpty && !isValidEmailFormat) {
    messageCode = InvalidMessageCodes.WrongEmailFormat;
    isValid = false;
  }

  return { ...data, isValid, messageCode };
};

const isValidCheck: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value = false } = data;
  let messageCode = null;

  let isValid = true;
  if (required && !(value as boolean)) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isValid = false;
  }

  return { ...data, isValid, messageCode };
};

const isValidTel: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value = '' } = data;

  let messageCode = null;
  let isValid = true;
  const isInputEmpty = isStringEmpty(value as string);
  const isValidTelFormat =
    !isInputEmpty && !!(value as string).match(/^\+?[0-9]+$/g);

  if (required && isInputEmpty) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isValid = false;
  }

  if (!isInputEmpty && !isValidTelFormat) {
    messageCode = InvalidMessageCodes.WrongTelFormat;
    isValid = false;
  }

  return { ...data, isValid, messageCode };
};

const isValidFile: (data: FieldData) => FieldData = (data: FieldData) => {
  const isValid = true;
  return { ...data, isValid };
};

const validateFunctions: Record<string, (data: FieldData) => FieldData> = {
  text: isValidText,
  email: isValidEmail,
  checkbox: isValidCheck,
  phone: isValidTel,
  textarea: isValidText,
  file: isValidFile,
};

export default validateFunctions;
