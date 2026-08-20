import './afaanoromoo.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/afaanoromoo';

const afaanoromooTheme = {
  brandSVG,
};

export default withThemeProvider(afaanoromooTheme);
