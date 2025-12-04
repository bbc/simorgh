import { use } from 'react';
import ErrorPage from '#pages/ErrorPage/ErrorPage';
import shouldRender from '#nextjs/pages/[service]/[articles]/shouldRender';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const WithData = Component => {
  const DataContainer = ({ pageData = null, status, ...props }) => {
    const { service = 'news' } = props;
    const { passportHomes } = use(ServiceContext) || {};
    const { hasRequestSucceeded, status: statusCode } = shouldRender(
      { pageData, status },
      service,
      passportHomes,
    );

    if (hasRequestSucceeded) {
      return <Component pageData={pageData} {...props} />;
    }

    return <ErrorPage errorCode={statusCode} />;
  };

  return DataContainer;
};

export default WithData;
