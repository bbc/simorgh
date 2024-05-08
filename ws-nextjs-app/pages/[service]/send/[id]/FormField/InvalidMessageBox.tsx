import React, { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { InvalidMessageCodes, InvalidMessageBoxProps } from '../types';

export default ({ id, messageCode }: InvalidMessageBoxProps) => {
  const {
    translations: { ugc = {} },
  } = useContext(ServiceContext);

  const message = ugc[messageCode ?? InvalidMessageCodes.FieldRequired];

  return (
    <div>
      <p id={id}>
        <span>❗</span>
        {message}
      </p>
    </div>
  );
};
