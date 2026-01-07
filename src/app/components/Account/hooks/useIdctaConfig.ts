import { useEffect, useState } from 'react';
import appendCtaQueryParams from '../idcta/appendCtaQueryParams';
import { getIdctaConfigUrl } from '../idcta/getIdctaBaseUrl';

type UseIdctaConfigArgs = {
  ptrt?: string;
  userOrigin?: string;
  sequenceId?: string;
};

type UseIdctaConfigState = {
  signInUrl: string | null;
  registerUrl: string | null;
  isSignInAvailable: boolean;
  availability: { signin: string; refresh: string };
};

const initialState: UseIdctaConfigState = {
  signInUrl: null,
  registerUrl: null,
  isSignInAvailable: false,
  availability: { signin: '', refresh: '' },
};

// Can be used if configuration needs to be fetched on the client side.
// Currently not used in this implementation.
export default function useIdctaConfig({
  ptrt,
  userOrigin = 'simorgh',
}: UseIdctaConfigArgs = {}) {
  const [state, setState] = useState<UseIdctaConfigState>(initialState);
  const [error, setError] = useState<Error | null>(null);

  const idctaConfigUrl = getIdctaConfigUrl();

  useEffect(() => {
    if (!idctaConfigUrl) return;

    const controller = new AbortController();

    const getIdctaConfig = async () => {
      try {
        setError(null);

        const response = await fetch(idctaConfigUrl, {
          cache: 'no-store',
          credentials: 'include',
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch IDCTA config: ${response.status} ${response.statusText}`,
          );
        }

        const body = await response.json();

        const signInAvailable = body?.availability?.signin === 'GREEN';
        const unavailable = body?.unavailable_url;

        const signInHref = signInAvailable ? body?.signin_url : unavailable;
        const registerHref = signInAvailable ? body?.register_url : unavailable;

        setState({
          signInUrl: signInHref
            ? appendCtaQueryParams(signInHref, { ptrt })
            : null,
          registerUrl: registerHref
            ? appendCtaQueryParams(registerHref, { ptrt })
            : null,
          isSignInAvailable: signInAvailable,
          availability: body?.availability ?? { signin: '', refresh: '' },
        });
      } catch (e) {
        if ((e as Error)?.name === 'AbortError') return;
        setError(e as Error);
      }
    };

    getIdctaConfig();
    // eslint-disable-next-line consistent-return
    return () => controller.abort();
  }, [idctaConfigUrl, ptrt, userOrigin]);

  return { ...state, error };
}
