import uasApiRequest from '#app/utilities/uasApi';
import { useContext, useEffect, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
// import { filterFavouritesByService } from '#app/utilities/filterFavouritesByService';

const SavedArticlesList = () => {
  const { service } = useContext(ServiceContext);
  const [savedArticles, setSavedArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await uasApiRequest('GET', 'favourites');
        const data = await res.json();
        const filtered = data?.items.filter(
          (item: any) => item.metaData?.service === service,
        );
        setSavedArticles(filtered);
      } catch {
        setSavedArticles([]);
      }
    };

    fetchSaved();
  }, [service]);

  return (
    <>
      <h3>Saved Articles</h3>
      <ul>
        {savedArticles.map(item => (
          <a href={item.metaData.canonicalUrl} key={item.globalId}>
            <li>{item.metaData.title}</li>
          </a>
        ))}
      </ul>
    </>
  );
};

export default SavedArticlesList;
