import { createContext } from 'react';

interface ContextProps {
  size?: string;
  fontVariant?: string;
}

const CallToActionLinkContext = createContext({} as ContextProps);
export default CallToActionLinkContext;
