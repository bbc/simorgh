import React, {
  createContext,
  FormEvent,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { FetchError } from '#app/models/types/fetch';
import { v4 as uuid } from 'uuid';

import { useRouter } from 'next/router';
import {
  Field,
  OnChangeHandler,
  OnChangeInputName,
  OnChangeInputValue,
} from '../types';

type SubmissionError = {
  message: string;
  status: number;
} | null;

type ContextProps = {
  formState: Record<OnChangeInputName, OnChangeInputValue | null>;
  handleChange: OnChangeHandler;
  handleSubmit: (event: FormEvent) => void;
  submissionError?: SubmissionError;
};

const FormContext = createContext({} as ContextProps);

const getInitialFormState = (
  fields: Field[],
): Record<OnChangeInputName, OnChangeInputValue | null> =>
  fields?.reduce((acc, field) => ({ ...acc, [field.id]: null }), {});

type ProviderProps = {
  fields: Field[];
};

export const FormContextProvider = ({
  fields,
  children,
}: PropsWithChildren<ProviderProps>) => {
  const {
    query: { id },
  } = useRouter();

  const [formState, setFormState] = useState(getInitialFormState(fields));
  const [submissionError, setSubmissionError] = useState<SubmissionError>(null);

  const handleChange = (name: OnChangeInputName, value: OnChangeInputValue) => {
    setFormState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Reset error state
    setSubmissionError(null);

    const validData = { surname: 'BBC TEST NAME' };

    const formData = new FormData();

    Object.entries(validData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const url = `https://www.bbc.com/ugc/send/${id}?said=${uuid()}`;

      const fetchRequest = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const response = await fetchRequest.json();

      if (!fetchRequest.ok) {
        setSubmissionError({
          message: response.message,
          status: fetchRequest.status,
        });
      }
    } catch (error: unknown) {
      const { message, status } = error as FetchError;
      setSubmissionError({ message, status });
    }
  };

  return (
    <FormContext.Provider
      value={{ formState, handleChange, handleSubmit, submissionError }}
    >
      {children}
    </FormContext.Provider>
  );
};

export function useFormContext() {
  return useContext(FormContext);
}
