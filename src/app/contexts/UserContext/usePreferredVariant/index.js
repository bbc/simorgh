import { useState, useCallback } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getPreferredVariant, setPreferredVariant } from '../cookies';

function usePreferredVariant() {
  const { service, variant } = useParams();
  const [preferredVariant, setPreferredVariantState] = useState(
    getPreferredVariant(service),
  );
  const { pathname } = useLocation();
  const history = useHistory();

  const setFunction = useCallback(
    value => {
      setPreferredVariant(service, value);
      setPreferredVariantState(value);
      history.push(pathname.replace(variant, `/${value}`));
    },
    [service, variant, pathname, history],
  );

  return [preferredVariant, setFunction];
}

export default usePreferredVariant;
