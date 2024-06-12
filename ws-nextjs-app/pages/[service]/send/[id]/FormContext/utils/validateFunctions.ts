import { FieldData, InvalidMessageCodes } from '../../types';

const wasPreviouslyInvalidCheck = (wasInvalid: boolean, isValid: boolean) => {
  return wasInvalid || !isValid;
};

const isStringEmpty = (str: string) =>
  str == null || str.replaceAll(/\s/g, '').length <= 0;

const isValidText: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value, wasInvalid } = data;

  let messageCode = null;
  let isValid = true;
  const isInputEmpty = isStringEmpty(value as string);

  if (required && isInputEmpty) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isValid = false;
  }

  const wasInvalidUpdate = wasPreviouslyInvalidCheck(wasInvalid, isValid);

  return {
    ...data,
    isValid,
    messageCode,
    wasInvalid: wasInvalidUpdate,
  };
};

const isValidEmail: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value, wasInvalid } = data;

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

  const wasInvalidUpdate = wasPreviouslyInvalidCheck(wasInvalid, isValid);

  return {
    ...data,
    isValid,
    messageCode,
    wasInvalid: wasInvalidUpdate,
  };
};

const isValidCheck: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value = false, wasInvalid } = data;
  let messageCode = null;

  let isValid = true;
  if (required && !(value as boolean)) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isValid = false;
  }

  const wasInvalidUpdate = wasPreviouslyInvalidCheck(wasInvalid, isValid);

  return {
    ...data,
    isValid,
    messageCode,
    wasInvalid: wasInvalidUpdate,
  };
};

const isValidTel: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value = '', wasInvalid } = data;

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

  const wasInvalidUpdate = wasPreviouslyInvalidCheck(wasInvalid, isValid);

  return {
    ...data,
    isValid,
    messageCode,
    wasInvalid: wasInvalidUpdate,
  };
};

const isValidFile: (data: FieldData) => FieldData = (data: FieldData) => {
  const { value, required, wasInvalid } = data;

  let isValid = true;
  if ((value as File[])?.length === 0 && required) isValid = false;

  const wasInvalidUpdate = wasPreviouslyInvalidCheck(wasInvalid, isValid);

  return { ...data, isValid, wasInvalid: wasInvalidUpdate };
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
