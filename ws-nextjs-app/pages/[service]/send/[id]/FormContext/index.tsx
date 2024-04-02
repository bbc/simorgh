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
import { OK } from '#app/lib/statusCodes.const';
import {
  Field,
  FieldData,
  OnChangeHandler,
  OnChangeInputName,
  OnChangeInputValue,
} from '../types';
import validateFunctions from './utils/validateFunctions';

type SubmissionError = {
  message: string;
  status: number;
} | null;

type ContextProps = {
  formState: Record<OnChangeInputName, FieldData>;
  handleChange: OnChangeHandler;
  handleSubmit: (event: FormEvent) => Promise<void>;
  submissionError?: SubmissionError;
};

const FormContext = createContext({} as ContextProps);

const getInitialFormState = (
  fields: Field[],
): Record<OnChangeInputName, FieldData> =>
  fields?.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: {
        invalid: false,
        required: field.validation.mandatory ?? false,
        value: null,
        type: field.htmlType,
        messageCode: null,
      },
    }),
    {},
  );

const validateFormState = (state: Record<OnChangeInputName, FieldData>) => {
  const validatedFormState: Record<OnChangeInputName, FieldData> = {};
  const formEntries = Object.entries(state);

  for (let i = 0; i < formEntries.length; i += 1) {
    const [key, data] = formEntries[i];
    const validateFunction = validateFunctions[data.type];

    if (validateFunction) {
      validatedFormState[key] = validateFunction(data);
    } else {
      validatedFormState[key] = data;
    }
  }

  return validatedFormState;
};

export const FormContextProvider = ({
  fields,
  children,
}: PropsWithChildren<{ fields: Field[] }>) => {
  const {
    query: { id },
  } = useRouter();

  const [formState, setFormState] = useState(getInitialFormState(fields));
  const [submissionError, setSubmissionError] = useState<SubmissionError>(null);

  const handleChange = (name: OnChangeInputName, value: OnChangeInputValue) => {
    setFormState(prevState => {
      const updatedState = { [name]: { ...prevState[name], value } };
      return { ...prevState, ...updatedState };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Reset error state
    setSubmissionError(null);

    // Validate
    setFormState(state => validateFormState(state));

    const formData = new FormData();

    // TODO: This is a mock data, we should use the formState instead
    Object.entries({ surname: 'BBC TEST NAME' }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const url = `https://www.bbc.com/ugc/send/${id}?said=${uuid()}`;

      const req = new XMLHttpRequest();
      req.open('POST', url, true);

      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status !== OK) {
            setSubmissionError({
              message: req.responseText,
              status: req.status,
            });
          }
        }
      };

      req.send(formData);
    } catch (error) {
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
