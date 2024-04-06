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
  OnChangeHandler,
  OnChangeInputName,
  OnChangeInputValue,
} from '../types';
import UGCSendError from '../UGCSendError';

type SubmissionError = {
  message: string;
  code?: string;
  status: number;
  isRecoverable?: boolean;
} | null;

type ContextProps = {
  formState: Record<OnChangeInputName, OnChangeInputValue | null>;
  handleChange: OnChangeHandler;
  handleSubmit: (event: FormEvent) => Promise<void>;
  submissionError?: SubmissionError;
  submitted: boolean;
  progress: string;
};

const FormContext = createContext({} as ContextProps);

const getInitialFormState = (
  fields: Field[],
): Record<OnChangeInputName, OnChangeInputValue | null> =>
  fields?.reduce((acc, field) => ({ ...acc, [field.id]: null }), {});

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

  const isHTML = (req: XMLHttpRequest) => {
    const contentType = req.getResponseHeader('Content-Type');
    return contentType?.match(/text\/html/);
  };

  const handleError = (req: XMLHttpRequest) => {
    const { response, status } = req;
    const { message, code } =
      response && !isHTML(req)
        ? JSON.parse(response)
        : {
            message: 'Unable to reach the pertinent service to submit data',
            code: 'UNKNOWN_SUBMISSION_ERROR',
          };

    return new UGCSendError({ message, code, status });
  };

  const handleChange = (name: OnChangeInputName, value: OnChangeInputValue) => {
    setFormState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    // Reset error state
    setSubmissionError(null);

    const formData = new FormData();

    Object.entries(formState).forEach(([key, value]) => {
      if (value === null) return;
      if (value instanceof FileList) {
        const fileList = value;
        const fileListLength = fileList.length;

        for (let fileIndex = 0; fileIndex < fileListLength; fileIndex += 1) {
          const file = fileList.item(fileIndex);
          if (file) formData.append(key, file);
        }

        return;
      }
      formData.append(key, value);
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
            const { message, code, status, isRecoverable } = handleError(req);

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
