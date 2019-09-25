import React, { useContext } from 'react';
import { element, string } from 'prop-types';
import { dataPropType } from '../../../models/propTypes/data';
import ErrorMain from '../../ErrorMain';
import { ServiceContext } from '../../../contexts/ServiceContext';
import shouldRender from './shouldRender';

const WithData = Component => {
  const DataContainer = ({ data, ...props }) => {
    const { service } = props;
    const { passportHomes } = useContext(ServiceContext) || {};
    const {
      hasData200StatusAndCorrectService,
      status,
      pageData,
    } = shouldRender(data, service, passportHomes);

    if (hasData200StatusAndCorrectService) {
      return <Component pageData={pageData} {...props} />;
    }

    return <ErrorMain status={status} />;
  };

  DataContainer.propTypes = {
    data: dataPropType,
    service: string,
  };

  DataContainer.defaultProps = {
    data: null,
    service: 'default',
  };

  return DataContainer;
};

WithData.propTypes = {
  Component: element,
};

export default WithData;
