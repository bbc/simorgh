import React, { FormEvent } from 'react';

export const handleSubmit = (event: FormEvent) => {
  event.preventDefault();
};

const Submit = () => <input type="submit" />;

export default Submit;
