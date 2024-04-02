import { FieldData } from '../../types';

const isStringEmpty = (str: string) =>
  str == null || str.replaceAll(/\s/g, '').length <= 0;

const isInvalidText: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value } = data;

  let invalidMessage = '';
  let isInvalid = false;
  const isInputEmpty = isStringEmpty(value as string);

  if (required && isInputEmpty) {
    invalidMessage = 'This field is required.';
    isInvalid = true;
  }

  return { ...data, invalid: isInvalid, invalidMessage };
};

const isInvalidEmail: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value } = data;

  let invalidMessage = '';
  let isInvalid = false;
  const isInputEmpty = isStringEmpty(value as string);
  const isInvalidEmailFormat =
    !isInputEmpty &&
    !(value as string).match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]+$/g);

  if (required && isInputEmpty) {
    invalidMessage = 'This field is required.';
    isInvalid = true;
  }

  if (
    (required && isInvalidEmailFormat) ||
    (!isInputEmpty && isInvalidEmailFormat)
  ) {
    invalidMessage = 'Wrong email format.';
    isInvalid = true;
  }

  return { ...data, invalid: isInvalid, invalidMessage };
};

const isInvalidCheck: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value = false } = data;
  let invalidMessage = '';

  const isInvalid = required && (value as boolean);
  if (isInvalid) {
    invalidMessage = 'This field is required.';
  }

  return { ...data, invalid: isInvalid, invalidMessage };
};

const isInvalidTel: (data: FieldData) => FieldData = (data: FieldData) => {
  const { required, value = '' } = data;

  let invalidMessage = '';
  let isInvalid = false;
  const isInputEmpty = isStringEmpty(value as string);
  const isInvalidTelFormat =
    !isInputEmpty && !(value as string).match(/^\+?[0-9]+$/g);

  if (required && isInputEmpty) {
    invalidMessage = 'This field is required.';
    isInvalid = true;
  }

  if (
    (required && isInvalidTelFormat) ||
    (!isInputEmpty && isInvalidTelFormat)
  ) {
    invalidMessage = 'Wrong telephone format.';
    isInvalid = true;
  }

  return { ...data, invalid: isInvalid, invalidMessage };
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
