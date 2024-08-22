import React from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import ScriptLink from '.';

const Component = () => (
  <ServiceContext.Provider
    value={
      {
        scriptLink: {
          text: 'Ћир',
          variant: 'cyr',
        },
      } as ServiceConfig
    }
  >
    <ScriptLink />
  </ServiceContext.Provider>
);

export default {
  title: 'Components/ScriptLink',
  component: Component,
};
