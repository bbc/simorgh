import './ws.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/ws';

const wsTheme = {
  brandSVG,
};

export default withThemeProvider(wsTheme);
