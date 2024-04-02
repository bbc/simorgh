import { FieldData, InvalidMessageCodes } from '../../types';

const isStringEmpty = (str: string) =>
  str == null || str.replaceAll(/\s/g, '').length <= 0;

const isInvalidText: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value } = data;

  let messageCode = null;
  let isInvalid = false;
  const isInputEmpty = isStringEmpty(value as string);

  if (required && isInputEmpty) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isInvalid = true;
  }

  return { ...data, invalid: isInvalid, messageCode };
};

const isInvalidEmail: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value } = data;

  let messageCode = null;
  let isInvalid = false;
  const isInputEmpty = isStringEmpty(value as string);
  const isInvalidEmailFormat =
    !isInputEmpty &&
    !(value as string).match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]+$/g);

  if (required && isInputEmpty) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isInvalid = true;
  }

  if (
    (required && isInvalidEmailFormat) ||
    (!isInputEmpty && isInvalidEmailFormat)
  ) {
    messageCode = InvalidMessageCodes.WrongEmailFormat;
    isInvalid = true;
  }

  return { ...data, invalid: isInvalid, messageCode };
};

const isInvalidCheck: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value = false } = data;
  let messageCode = null;

  const isInvalid = required && (value as boolean);
  if (isInvalid) {
    messageCode = InvalidMessageCodes.FieldRequired;
  }

  return { ...data, invalid: isInvalid, messageCode };
};

const isInvalidTel: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value = '' } = data;

  let messageCode = null;
  let isInvalid = false;
  const isInputEmpty = isStringEmpty(value as string);
  const isInvalidTelFormat =
    !isInputEmpty && !(value as string).match(/^\+?[0-9]+$/g);

  if (required && isInputEmpty) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isInvalid = true;
  }

  if (
    (required && isInvalidTelFormat) ||
    (!isInputEmpty && isInvalidTelFormat)
  ) {
    messageCode = InvalidMessageCodes.WrongTelFormat;
    isInvalid = true;
  }

  return { ...data, invalid: isInvalid, messageCode };
};

const isInvalidFile: (data: FieldData) => FieldData = (data: FieldData) => {
  const isValid = true;
  return { ...data, invalid: !isValid };
};

const validateFunctions: Record<string, (data: FieldData) => FieldData> = {
  text: isInvalidText,
  email: isInvalidEmail,
  checkbox: isInvalidCheck,
  phone: isInvalidTel,
  textarea: isInvalidText,
  file: isInvalidFile,
};

export default validateFunctions;
