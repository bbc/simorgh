import React from 'react';
import { string } from 'prop-types';
import ErrorMain from '../ErrorMain';
import PageWrapper from '../PageWrapper';
import FooterContainer from '../Footer';

const WithError = Component => {
  return function WithErrorComponent({ error, ...props }) {
    if (!error) return <Component {...props} />;
    return (
      <PageWrapper>
        <ErrorMain status={500} />
        <FooterContainer />
      </PageWrapper>
    );
  };
};

WithError.propTypes = {
  error: string,
};

WithError.defaultProps = {
  error: true,
};

export default WithError;
