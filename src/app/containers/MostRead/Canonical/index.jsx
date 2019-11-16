import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
// import MostReadList from '/Users/phank01/BBC/git/simorgh/node_modules/@bbc/psammead-most-read/dist/list.js';
const CanonicalMostRead = ({ endpoint, script }) => {
  const [promos, setPromo] = useState([]);
  const [data, setData] = useState({});

  const handleResponse = async response => {
    const mostReadData = await response.json();
    setPromo(mostReadData.records.slice(0, 10));
    setData(mostReadData);

    // let testing = [];
    // mostReadData.records.slice(0, 10).forEach(promo => {
    //   testing.push({
    //     title: promo.promo.headlines.headline,
    //     link: 'bbc.co.uk',
    //   });
    // });
    // setPromo(testing);
  };

  useEffect(() => {
    const fetchMostReadData = pathname =>
      fetch(pathname, { mode: 'no-cors' })
        .then(handleResponse)
        .catch(error => console.log(error)); // eslint-disable-line no-console

    fetchMostReadData(endpoint);
  }, [endpoint]);

  return (
    <div>
      {/* <MostReadList items={promos} service="news" script={script} dir="ltr" /> */}

      <p>Last Updated: {data.lastRecordTimeStamp}</p>
      {promos.map(promo => (
        <ul key={promo.id}>
          <li>{promo.promo.timestamp}</li>
          <li>{promo.promo.headlines.headline}</li>
          <li>{promo.promo.locators.assetUri}</li>
        </ul>
      ))}
    </div>
  );
};

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
};

export default CanonicalMostRead;
