import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
// import MetadataContainer from '#containers/Metadata';

const IdxPage = () => {
  const { brandName, service, script, dir, lang, ...others } = useContext(
    ServiceContext,
  );
  console.log({ brandName, service, script, dir, lang, others });

  return (
    <>
      {/* <MetadataContainer
        title={header}
        lang={lang}
        description={`${header} - ${brandName}`}
        openGraphType="website"
      /> */}
      <main role="main">
        <h1 id="content">IDX Page</h1>
      </main>
    </>
  );
};

export default IdxPage;
