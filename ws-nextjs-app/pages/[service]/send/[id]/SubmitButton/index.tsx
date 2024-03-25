import React, { FormEvent } from 'react';
import nodeLogger from '#lib/logger.node';
import { DATA_REQUEST_RECEIVED } from '#app/lib/logger.const';

const logger = nodeLogger(__filename);

export const handleSubmit = async (event: FormEvent) => {
  event.preventDefault();

  // FULL IMPLEMENTATION TO BE DONE IN LATER TICKET
  const validData = { surname: 'BBC TEST NAME' };
  const fetchRequest = await fetch('myUrl.com', {
    method: 'POST',
    body: JSON.stringify(validData),
  });

  const response = fetchRequest.status;

  // handle response
  logger.info(
    DATA_REQUEST_RECEIVED,
    `HANDLE RESPONSE HERE RESPONSE ${response}`,
  );
};

const Submit = () => {
  const translation = 'Submit';
  return <input type="submit" value={translation} />;
};

export default Submit;
