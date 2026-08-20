import './persian.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/persian';

const persianTheme = {
  brandSVG,
};

export default withThemeProvider(persianTheme);
