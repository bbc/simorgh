import Url from 'url-parse';
import { Services, Variants } from '../../../models/types/global';

interface UrlConstructParams {
  service: Services;
  variant?: Variants;
  secondaryData?: 'topStoriesAndFeatures' | 'mostRead' | 'mostWatched';
}

const constructSecondaryDataFetchUrl = ({
  service,
  variant,
  secondaryData,
}: UrlConstructParams) => {
  const queryParameters = {
    service,
    secondaryData,
    ...(variant && {
      variant,
    }),
  };

  const fetchUrl = Url('http://localhost:3210/module/simorgh-bff?').set(
    'query',
    queryParameters,
  );

  return fetchUrl;
};

export default constructSecondaryDataFetchUrl;
