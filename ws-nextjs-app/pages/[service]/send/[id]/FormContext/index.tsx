import React, {
  createContext,
  FormEvent,
  PropsWithChildren,
  useContext,
  useState,
  useCallback,
} from 'react';
import { v4 as uuid } from 'uuid';

import { useRouter } from 'next/router';
import { OK } from '#app/lib/statusCodes.const';
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
  } = useRouter();

  const [formState, setFormState] = useState(getInitialFormState(fields));
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState('0');
  // TODO: Remove lint disable once screen state switching is used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [screen, _setScreen] = useState<FormScreen>(initialScreen);
  const [submissionError, setSubmissionError] = useState<SubmissionError>(null);
  const [hasAttemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submissionID, setSubmissionID] = useState(null);
  // const [errorsOnPage, setErrorsOnPage] = useState(false); // to finish

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

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setAttemptedSubmit(true);

      const validatedFormData = await validateFormState(formState);
      setFormState(validatedFormData);

      const formInvalidErrors = Object.values(validatedFormData).filter(
        item => item.isValid === false,
      ).length;

      const formIsValid = formInvalidErrors === 0;
      // update logic to handle helment change on invalid submit errors
      // const formIsInvalid = formInvalidErrors > 0;

      if (formIsValid) {
        setSubmitted(true); // check placement
        // Reset error state
        setSubmissionError(null); // check placement

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
          const url = `https://www.bbc.com/ugc/send/${id}?said=${uuid()}`;

          const req = new XMLHttpRequest();
          req.responseType = 'json';
          req.open('POST', url, true);

          req.upload.onloadstart = () => {
            _setScreen('uploading');
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
                  _setScreen('success');
                }, 3000);
              }
              if (req.status !== OK) {
                const { message, code, status, isRecoverable } =
                  new UGCSendError(req);

                // Future logging invokation if feasible client-side
                // sendCustomMetric();
                // logger.error();

                setSubmissionError({
                  message,
                  code,
                  status,
                  isRecoverable,
                });
                console.log("I'm actually erroring");
                setTimeout(() => {
                  _setScreen('error');
                }, 3000); // to check
              }
            }
          };
          req.send(formData);
        } catch (error) {
          const { message, status } = error as UGCSendError;
          setSubmissionError({ message, status });
        }
      }
    },
    [formState],
  );

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
