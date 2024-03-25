import React, {
  createContext,
  FormEvent,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import {
  OnChangeHandler,
  OnChangeInputName,
  OnChangeInputValue,
} from '../types';

type ContextProps = {
  formState: Record<OnChangeInputName, OnChangeInputValue | null>;
  handleChange: OnChangeHandler;
  handleSubmit: (event: FormEvent) => void;
};

const FormContext = createContext({} as ContextProps);

type ProviderProps = {
  initialFormState: Record<OnChangeInputName, OnChangeInputValue | null>;
};

export const FormContextProvider = ({
  initialFormState,
  children,
}: PropsWithChildren<ProviderProps>) => {
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (name: OnChangeInputName, value: OnChangeInputValue) => {
    setFormState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log(formState);

    const validData = { surname: 'BBC TEST NAME' };
    const fetchRequest = await fetch('myUrl.com', {
      method: 'POST',
      body: JSON.stringify(validData),
    });

    const response = fetchRequest.json();
    // handle response
  };

  return (
    <FormContext.Provider value={{ formState, handleChange, handleSubmit }}>
      {children}
    </FormContext.Provider>
  );
};

export function useFormContext() {
  return useContext(FormContext);
}
