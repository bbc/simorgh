import React, { useContext } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';

const NavigationContainer = () => {
  const { script, translations, navigation, service } = useContext(
    ServiceContext,
  );
  const { currentPage, skipLinkText } = translations;

  if (!navigation || navigation.length === 0) {
    return null;
  }

  return (
    <nav script={script} skipLinkText={skipLinkText} service={service}>
      <ul>
        {nav.map((item, index) => {
          const { title, url } = item;
          const active = index === 0;

          return (
            <li
              key={title}
              url={url}
              script={script}
              active={active}
              currentPageText={currentPage}
              service={service}
            >
              {title}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationContainer;
