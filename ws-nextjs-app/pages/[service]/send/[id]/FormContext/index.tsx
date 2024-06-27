import React, {
  createContext,
  FormEvent,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import { useRouter } from 'next/router';
import { OK } from '#app/lib/statusCodes.const';
import getEnvironment from '#app/routes/utils/getEnvironment';
import {
  Field,
  FieldData,
  FormScreen,
  OnChangeHandler,
  OnChangeInputName,
  OnChangeInputValue,
} from '../types';
import UGCSendError from '../UGCSendError';
import validateFunctions from './utils/validateFunctions';

type SubmissionError = {
  message: string;
  code?: string;
  status: number;
  isRecoverable?: boolean;
} | null;

export type ContextProps = {
  formState: Record<OnChangeInputName, FieldData>;
  handleChange: OnChangeHandler;
  handleSubmit: (event: FormEvent) => Promise<void>;
  submissionError?: SubmissionError;
  submitted: boolean;
  hasAttemptedSubmit: boolean;
  progress: string;
  screen: FormScreen;
  submissionID: string | null;
};

export const FormContext = createContext({} as ContextProps);

const getInitialFormState = (
  fields: Field[],
): Record<OnChangeInputName, FieldData> =>
  fields?.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: {
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

const validateFormState = (state: Record<OnChangeInputName, FieldData>) => {
  const formEntries = new Map(Object.entries(state));

  formEntries.forEach((data, key, map) => {
    const validateFunction = validateFunctions[data.htmlType];
    const validatedData = validateFunction ? validateFunction(data) : data;
    map.set(key, validatedData);
  });

  return Object.fromEntries(formEntries);
};

export const FormContextProvider = ({
  initialScreen = 'form',
  fields,
  children,
}: PropsWithChildren<{ initialScreen?: FormScreen; fields: Field[] }>) => {
  const {
    query: { id },
    asPath,
  } = useRouter();

  const [formState, setFormState] = useState(getInitialFormState(fields));
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState('0');
  const [screen, setScreen] = useState<FormScreen>(initialScreen);
  const [submissionError, setSubmissionError] = useState<SubmissionError>(null);
  const [hasAttemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submissionID, setSubmissionID] = useState(null);

  const handleChange = (name: OnChangeInputName, value: OnChangeInputValue) => {
    setFormState(prevState => {
      const currState = { ...prevState[name], value };
      // As part of GEL guidelines, we should validate during user input, following an initial submit.
      const validateFunction = validateFunctions[currState.htmlType];
      const validatedData = validateFunction
        ? validateFunction(currState)
        : currState;

      const updatedState = { [name]: { ...validatedData } };
      return { ...prevState, ...updatedState };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setAttemptedSubmit(true);
    // Reset error state
    setSubmissionError(null);
    const validatedFormData = validateFormState(formState);
    setFormState(validatedFormData);

    const formInvalidErrors = Object.values(validatedFormData).filter(
      item => item.isValid === false,
    ).length;

    if (formInvalidErrors > 0) return;

    setSubmitted(true);

    const formData = new FormData();

    Object.entries(formState).forEach(([key, item]) => {
      const fieldValue = item.value;
      const isFileHtmlType = item.htmlType === 'file';

      if (fieldValue === '') return;
      if (isFileHtmlType) {
        const fileList = fieldValue as File[];

        fileList.forEach(file => {
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
      const url = `${domain}/ugc/send/${id}?said=${uuid()}`;

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
        handleSubmit,
        submissionError,
        submitted,
        progress,
        hasAttemptedSubmit,
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
