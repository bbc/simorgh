import { use } from 'react';
import IndexHeading from '#psammead/psammead-heading-index/src';
import { ServiceContext } from '../../../contexts/ServiceContext';

const IndexHeadingContainer = ({ children = null, ...props }) => {
  const { dir } = use(ServiceContext);

  return (
    <IndexHeading tabIndex={-1} dir={dir} {...props}>
      {children}
    </IndexHeading>
  );
};

export default IndexHeadingContainer;
