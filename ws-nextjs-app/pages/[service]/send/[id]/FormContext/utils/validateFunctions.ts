import { FieldData, InvalidMessageCodes } from '../../types';

const wasPreviouslyInvalidCheck = (
  wasPreviouslyInvalid: boolean,
  isValid: boolean,
) => {
  return wasPreviouslyInvalid || !isValid;
};

const isStringEmpty = (str: string) =>
  str == null || str.replaceAll(/\s/g, '').length <= 0;

const isValidText: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value, wasPreviouslyInvalid } = data;

  let messageCode = null;
  let isValid = true;
  const isInputEmpty = isStringEmpty(value as string);

  if (required && isInputEmpty) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isValid = false;
  }

  const wasPreviouslyInvalidUpdate = wasPreviouslyInvalidCheck(
    wasPreviouslyInvalid,
    isValid,
  );

  return {
    ...data,
    isValid,
    messageCode,
    wasPreviouslyInvalid: wasPreviouslyInvalidUpdate,
  };
};

const isValidEmail: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value, wasPreviouslyInvalid } = data;

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

  const wasPreviouslyInvalidUpdate = wasPreviouslyInvalidCheck(
    wasPreviouslyInvalid,
    isValid,
  );

  return {
    ...data,
    isValid,
    messageCode,
    wasPreviouslyInvalid: wasPreviouslyInvalidUpdate,
  };
};

const isValidCheck: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value = false, wasPreviouslyInvalid } = data;
  let messageCode = null;

  let isValid = true;
  if (required && !(value as boolean)) {
    messageCode = InvalidMessageCodes.FieldRequired;
    isValid = false;
  }

  const wasPreviouslyInvalidUpdate = wasPreviouslyInvalidCheck(
    wasPreviouslyInvalid,
    isValid,
  );

  return {
    ...data,
    isValid,
    messageCode,
    wasPreviouslyInvalid: wasPreviouslyInvalidUpdate,
  };
};

const isValidTel: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value = '', wasPreviouslyInvalid } = data;

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

  const wasPreviouslyInvalidUpdate = wasPreviouslyInvalidCheck(
    wasPreviouslyInvalid,
    isValid,
  );

  return {
    ...data,
    isValid,
    messageCode,
    wasPreviouslyInvalid: wasPreviouslyInvalidUpdate,
  };
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
