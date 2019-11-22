import { useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getPreferredVariant, setPreferredVariant } from '../cookies';

function usePreferredVariant() {
  const { service, variant } = useParams();
  const [preferredVariant, setPreferredVariantState] = useState(
    getPreferredVariant(service),
  );
  const { pathname } = useLocation();
  const history = useHistory();
  const setFunction = value => {
    setPreferredVariant(service, value);
    setPreferredVariantState(value);
    history.push(pathname.replace(variant, `/${value}`));
  };
  return [preferredVariant, setFunction];
}

export default usePreferredVariant;
