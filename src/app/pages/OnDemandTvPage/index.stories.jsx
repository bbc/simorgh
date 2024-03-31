import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { OnDemandTvPage } from '..';
import afrique from './fixtureData/afrique';
import pashto from './fixtureData/pashto';
import { ServiceContext } from '#app/contexts/ServiceContext';

const onDemandTvFixtures = {
  pashto,
  afrique,
};

const matchFixtures = service => ({
  params: {
    serviceId: {
      afrique: 'bbc_afrique_tv',
      pashto: 'bbc_pashto_tv',
    }[service],
  },
});

// eslint-disable-next-line react/prop-types
const Component = () => {
  const { service } = useContext(ServiceContext);

  return (
    <BrowserRouter>
      <OnDemandTvPage
        match={matchFixtures(service)}
        pageData={onDemandTvFixtures[service]}
        status={200}
        service={service}
        isAmp={false}
        loading={false}
        error=""
        pageType={MEDIA_PAGE}
      />
    </BrowserRouter>
  );
};

export default {
  Component,
  title: 'Pages/OnDemand TV Page',
  decorators: [story => <WithTimeMachine>{story()}</WithTimeMachine>],
};

export const Page = Component;
