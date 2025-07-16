import React, { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import fallbackTranslations from '../fallbackTranslations';

const Submit = () => {
  const {
    translations: {
      ugc: { submitButton = fallbackTranslations.submitButton } = {},
    },
  } = use(ServiceContext);

  return (
    <button className="font-sansBold text-bodyCopy mt-8 bg-service-neutral-core text-white w-full border-none outline-1 outline-transparent py-6 px-0 cursor-pointer hover:underline hover:bg-service-neutral-dark focus:underline focus:bg-service-neutral-dark" type="submit">
      {submitButton}
    </button>
  );
};

export default Submit;
