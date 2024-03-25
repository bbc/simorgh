import React, { FormEvent } from 'react';

export const handleSubmit = async (event: FormEvent) => {
  event.preventDefault();

  const validData = { surname: 'BBC TEST NAME' };
  const fetchRequest = await fetch('myUrl.com', {
    method: 'POST',
    body: JSON.stringify(validData),
  });

  const response = fetchRequest.json();
  // handle response
};

const Submit = () => {
  const translation = 'Submit';
  return <input type="submit" value={translation} />;
};

export default Submit;
