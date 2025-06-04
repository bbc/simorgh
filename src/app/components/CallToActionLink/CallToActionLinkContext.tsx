import { createContext } from 'react';
import { GelFontSize, FontVariant } from '../../models/types/theming';

interface ContextProps {
  size?: GelFontSize;
  fontVariant?: FontVariant;
}

const CallToActionLinkContext = createContext({} as ContextProps);
export default CallToActionLinkContext;
