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
import {
  Field,
  FieldData,
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

type ContextProps = {
  formState: Record<OnChangeInputName, FieldData>;
  setFormState: React.Dispatch<React.SetStateAction<Record<string, FieldData>>>;
  handleChange: OnChangeHandler;
  handleSubmit: (event: FormEvent) => Promise<void>;
  submissionError?: SubmissionError;
  submitted: boolean;
  progress: string;
};

const FormContext = createContext({} as ContextProps);

const getInitialFormState = (
  fields: Field[],
): Record<OnChangeInputName, FieldData> =>
  fields?.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: {
        isValid: true,
        required: field.validation.mandatory ?? false,
        value: '',
        htmlType: field.htmlType,
        messageCode: null,
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
  fields,
  children,
}: PropsWithChildren<{ fields: Field[] }>) => {
  const {
    query: { id },
  } = useRouter();

  const [formState, setFormState] = useState(getInitialFormState(fields));
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState('0');
  const [submissionError, setSubmissionError] = useState<SubmissionError>(null);

  const handleChange = (name: OnChangeInputName, value: OnChangeInputValue) => {
    setFormState(prevState => {
      const updatedState = { [name]: { ...prevState[name], value } };
      return { ...prevState, ...updatedState };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    // Reset error state
    setSubmissionError(null);

    // Validate
    setFormState(state => validateFormState(state));

    const formData = new FormData();

    Object.entries(formState).forEach(([key, item]) => {
      const fieldValue = item.value;

      if (fieldValue === '') return;
      // TODO Need to Change this
      if (fieldValue instanceof FileList) {
        const fileList = fieldValue;
        const fileListLength = fileList.length;

        for (let fileIndex = 0; fileIndex < fileListLength; fileIndex += 1) {
          const file = fileList.item(fileIndex);
          if (file) formData.append(key, file);
        }
        return;
      }
      if (typeof fieldValue === 'boolean') {
        if (fieldValue) formData.append(key, 'true');
        return;
      }
      formData.append(key, fieldValue);
    });

    try {
      const url = `https://www.bbc.com/ugc/send/${id}?said=${uuid()}`;

      const req = new XMLHttpRequest();
      req.open('POST', url, true);

      req.upload.onprogress = e => {
        setProgress(((e.loaded / e.total) * 100).toFixed(0));
      };

      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          setSubmitted(false);
          if (req.status !== OK) {
            const { message, code, status, isRecoverable } = new UGCSendError(
              req,
            );

            // Future logging invokation if feasible client-side
            // sendCustomMetric();
            // logger.error();

            setSubmissionError({
              message,
              code,
              status,
              isRecoverable,
            });
          }
        }
      };

      req.send(formData);
    } catch (error) {
      const { message, status } = error as UGCSendError;
      setSubmissionError({ message, status });
    }
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        setFormState,
        handleChange,
        handleSubmit,
        submissionError,
        submitted,
        progress,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export function useFormContext() {
  return useContext(FormContext);
}
