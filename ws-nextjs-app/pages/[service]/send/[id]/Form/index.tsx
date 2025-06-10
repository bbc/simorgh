import React, {
  createContext,
  FormEvent,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { useRouter } from 'next/router';
import { OK } from '#app/lib/statusCodes.const';
import getEnvironment from '#app/routes/utils/getEnvironment';
import getUUID from '#app/lib/utilities/getUUID';
import {
  Field,
  FieldData,
  FileData,
  Screen,
  OnChangeHandler,
  OnChangeInputName,
  OnChangeInputValue,
  OnFocusOutHandler,
  ValidationError,
} from '../types';
import UGCSendError from '../UGCSendError';
import validateFunctions from './utils/validateFunctions';
import getValidationErrors from './utils/getValidationErrors';
import ErrorScreen from './ErrorScreen';
import FormField from './FormField';
import FormScreen from './FormScreen';
import SuccessScreen from './SuccessScreen';
import UploadingScreen from './UploadingScreen';

type SubmissionError = {
  message: string;
  code?: string;
  status: number;
  isRecoverable?: boolean;
} | null;

export type ContextProps = {
  formState: Record<OnChangeInputName, FieldData>;
  handleChange: OnChangeHandler;
  handleFocusOut: OnFocusOutHandler;
  handleSubmit: (event: FormEvent) => Promise<void>;
  submissionError?: SubmissionError;
  submitted: boolean;
  attemptedSubmitCount: number;
  validationErrors: ValidationError[] | [];
  progress: string;
  screen: Screen;
  submissionID: string | null;
};

const FormContext = createContext({} as ContextProps);

const getInitialFormState = (
  fields: Field[],
): Record<OnChangeInputName, FieldData> =>
  fields?.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: {
        ...(field.validation && field.validation),
        isValid: true,
        required: field.validation.mandatory ?? false,
        wordLimit: field.validation.wordLimit ?? undefined,
        value: field.htmlType === 'file' ? [] : '',
        htmlType: field.htmlType,
        messageCode: null,
        wasInvalid: false,
      },
    }),
    {},
  );

const validateFormStateOnSubmit = (
  state: Record<OnChangeInputName, FieldData>,
) => {
  const formEntries = new Map(Object.entries(state));

  formEntries.forEach((data, key, map) => {
    const validateFunction = validateFunctions[data.htmlType];
    const validatedData = validateFunction ? validateFunction(data) : data;
    map.set(key, validatedData);
  });

  return Object.fromEntries(formEntries);
};

const FormManager = ({
  initialScreen = 'form',
  fields,
  children,
}: PropsWithChildren<{ initialScreen?: Screen; fields: Field[] }>) => {
  const {
    query: { id },
    asPath,
  } = useRouter();

  const [formState, setFormState] = useState(getInitialFormState(fields));
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState('0');
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [submissionError, setSubmissionError] = useState<SubmissionError>(null);
  const [attemptedSubmitCount, setAttemptedSubmitCount] = useState(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );
  const [submissionID, setSubmissionID] = useState(null);

  const handleChange = (name: OnChangeInputName, value: OnChangeInputValue) => {
    const prevState = formState[name];
    const currState = { ...prevState, value };
    let validatedData = currState;

    if (currState.htmlType === 'file') {
      const validateFunction = validateFunctions.file;
      validatedData = validateFunction
        ? validateFunction(currState)
        : currState;
    }
    const updatedState = { [name]: { ...validatedData } };
    const newFormState = { ...formState, ...updatedState };
    setFormState(newFormState);

    if (currState.htmlType === 'file') {
      const validationErrorsList = getValidationErrors(newFormState);
      setValidationErrors(validationErrorsList);
    }
  };

  const handleFocusOut = (name: OnChangeInputName) => {
    const currState = formState[name];
    const validateFunction = validateFunctions[currState.htmlType];
    const validatedData = validateFunction
      ? validateFunction(currState)
      : currState;
    const updatedState = { [name]: { ...validatedData } };
    const newFormState = { ...formState, ...updatedState };

    const validationErrorsList = getValidationErrors(newFormState);
    setValidationErrors(validationErrorsList);

    setFormState(newFormState);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setAttemptedSubmitCount(prevCount => prevCount + 1);
    // Reset error state
    setSubmissionError(null);
    const validatedFormData = validateFormStateOnSubmit(formState);
    setFormState(validatedFormData);

    const validationErrorsList = getValidationErrors(validatedFormData);
    if (validationErrorsList.length > 0) {
      setValidationErrors(validationErrorsList);
      return;
    }

    setSubmitted(true);

    const formData = new FormData();

    Object.entries(formState).forEach(([key, item]) => {
      const fieldValue = item.value;
      const isFileHtmlType = item.htmlType === 'file';

      if (fieldValue === '') return;
      if (isFileHtmlType) {
        const fileList = fieldValue as FileData[];

        fileList.forEach(({ file }: FileData) => {
          formData.append(key, file);
        });
        return;
      }
      if (typeof fieldValue === 'boolean') {
        if (fieldValue) formData.append(key, 'true');
        return;
      }
      formData.append(key, fieldValue as string);
    });
    try {
      const environment = getEnvironment(asPath);
      const domain = `https://www.${environment === 'test' ? 'test.' : ''}bbc.com`;
      const url = `${domain}/ugc/send/${id}?said=${getUUID()}`;

      const req = new XMLHttpRequest();
      req.responseType = 'json';
      req.open('POST', url, true);

      req.upload.onloadstart = () => {
        setScreen('uploading');
      };

      req.upload.onprogress = e => {
        setProgress(((e.loaded / e.total) * 100).toFixed(0));
      };
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          setSubmitted(false);
          if (req.status === OK) {
            setSubmissionID(req.response.submissionId);
            setTimeout(() => {
              setScreen('success');
            }, 3000);
          }
          if (req.status !== OK) {
            const { message, code, status, isRecoverable } = new UGCSendError(
              req,
            );

            setSubmissionError({
              message,
              code,
              status,
              isRecoverable,
            });
            setTimeout(() => {
              setScreen('error');
            }, 3000);
          }
        }
      };
      req.send(formData);
    } catch (error) {
      const { message, status } = error as UGCSendError;

      setSubmissionError({ message, status });
      setTimeout(() => {
        setScreen('error');
      }, 3000);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        handleChange,
        handleFocusOut,
        handleSubmit,
        submissionError,
        submitted,
        progress,
        attemptedSubmitCount,
        validationErrors,
        screen,
        submissionID,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export function useFormContext() {
  return useContext(FormContext);
}

FormManager.ErrorScreen = ErrorScreen;
FormManager.FormField = FormField;
FormManager.FormScreen = FormScreen;
FormManager.SuccessScreen = SuccessScreen;
FormManager.UploadingScreen = UploadingScreen;
FormManager.Context = FormContext;

export default FormManager;