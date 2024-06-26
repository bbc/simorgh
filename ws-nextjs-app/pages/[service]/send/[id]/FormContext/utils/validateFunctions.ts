import { FieldData, FileData, InvalidMessageCodes } from '../../types';

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

const isValidFiles: (data: FieldData) => FieldData = (data: FieldData) => {
  const { value: files, required, wasInvalid, fileTypes, min, max } = data;
  const MAX_PAYLOAD_SIZE = 1288490189;
  const RESERVED_FORM_DATA_SIZE = 10000;
  // we're making the assumption that each file chooser field is only allowed the max payload size less some for data (estimated maximum size ever needed)
  // This will break if you have 2 file choosers in the form as each will have a separate allowance which could result in the total payload being exceeded (fails on Backend) - quite an edge case though
  const TOTAL_FILES_MAX_SIZE = MAX_PAYLOAD_SIZE - RESERVED_FORM_DATA_SIZE;

  let isValid = true;
  let messageCode = null;
  let hasNestedErrorLabel = false;

  // CHECK INDIVIDUAL FILES
  const validatedFiles = (files as FileData[]).map((fileData: FileData) => {
    const { file } = fileData;
    let fileMessageCode = null;

    // Chrome interprets a wma file as video so the following checks whether this has happened and switches the video back to audio
    const fileType =
      file.type === 'video/x-ms-wma' ? 'audio/x-ms-wma' : file.type;

    if (!fileTypes?.includes(fileType)) {
      fileMessageCode = InvalidMessageCodes.WrongFileType;
      hasNestedErrorLabel = true;
      isValid = false;
    }
    if (file.size <= 0) {
      fileMessageCode = InvalidMessageCodes.FileTooSmall;
      hasNestedErrorLabel = true;
      isValid = false;
    }

    return { ...fileData, messageCode: fileMessageCode };
  });
  if (min != null && (files as FileData[])?.length < min && required) {
    isValid = false;
    messageCode = InvalidMessageCodes.NotEnoughFiles;
    hasNestedErrorLabel = false;
  }

  if (max != null && (files as FileData[])?.length > max) {
    isValid = false;
    messageCode = InvalidMessageCodes.TooManyFiles;
    hasNestedErrorLabel = false;
  }

  const totalUploadedSize = (files as FileData[]).reduce(
    (accumulated, currentValue) => accumulated + currentValue.file.size,
    0,
  );

  if (totalUploadedSize >= TOTAL_FILES_MAX_SIZE) {
    isValid = false;
    messageCode = InvalidMessageCodes.FileTooBig;
    hasNestedErrorLabel = false;
  }

  const wasInvalidUpdate = wasPreviouslyInvalidCheck(wasInvalid, isValid);

  return {
    ...data,
    value: validatedFiles,
    isValid,
    hasNestedErrorLabel,
    wasInvalid: wasInvalidUpdate,
    messageCode,
  };
};

const validateFunctions: Record<string, (data: FieldData) => FieldData> = {
  text: isValidText,
  email: isValidEmail,
  checkbox: isValidCheck,
  phone: isValidTel,
  textarea: isValidText,
  file: isValidFiles,
};

export default validateFunctions;
