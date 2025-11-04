import { use } from 'react';
import IndexHeading from '#psammead/psammead-heading-index/src';
import { ServiceContext } from '../../../contexts/ServiceContext';

const IndexHeadingContainer = ({ children = null, ...props }) => {
  const { script, service, dir } = use(ServiceContext);

  return (
    <IndexHeading script={script} service={service} dir={dir} {...props}>
      {children}
    </IndexHeading>
  );
};

export default IndexHeadingContainer;
