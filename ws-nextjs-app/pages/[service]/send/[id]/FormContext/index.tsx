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
  OnChangeHandler,
  OnChangeInputName,
  OnChangeInputValue,
} from '../types';

type SubmissionError = {
  message: string;
  status: number;
};

type ContextProps = {
  formState: Record<OnChangeInputName, OnChangeInputValue | null>;
  handleChange: OnChangeHandler;
  handleSubmit: (event: FormEvent) => void;
  submissionError?: SubmissionError;
};

const FormContext = createContext({} as ContextProps);

type ProviderProps = {
  initialFormState: Record<OnChangeInputName, OnChangeInputValue | null>;
};

export const FormContextProvider = ({
  initialFormState,
  children,
}: PropsWithChildren<ProviderProps>) => {
  const {
    query: { id },
  } = useRouter();

  const [formState, setFormState] = useState(initialFormState);
  const [submissionError, setSubmissionError] = useState<SubmissionError>();

  const handleChange = (name: OnChangeInputName, value: OnChangeInputValue) => {
    setFormState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const validData = { surname: 'BBC TEST NAME' };

    try {
      const url = `https://www.bbc.com/ugc/send/${id}?said=${uuid()}`;

      const fetchRequest = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(validData),
      });
      const response = await fetchRequest.json();
      console.log(fetchRequest, response);

      // handle response
    } catch (error: unknown) {
      console.log(error);
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
