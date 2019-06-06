import React from 'react';
import FrontPageMain from '.';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import frontPageDataIgbo from '../../../../data/prod/igbo/frontpage';
import frontPageDataPidgin from '../../../../data/prod/pidgin/frontpage';
import frontPageDataYoruba from '../../../../data/prod/yoruba/frontpage';

describe('FrontPageMain', () => {
  shouldShallowMatchSnapshot(
    'should render a igbo frontpage correctly',
    <ServiceContextProvider service="igbo">
      <FrontPageMain frontPageData={frontPageDataIgbo} />
    </ServiceContextProvider>,
  );

  shouldShallowMatchSnapshot(
    'should render a pidgin frontpage correctly',
    <ServiceContextProvider service="pidgin">
      <FrontPageMain frontPageData={frontPageDataPidgin} />
    </ServiceContextProvider>,
  );

  shouldShallowMatchSnapshot(
    'should render a yoruba frontpage correctly',
    <ServiceContextProvider service="yoruba">
      <FrontPageMain frontPageData={frontPageDataYoruba} />
    </ServiceContextProvider>,
  );
});
