import './afrique.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/afrique';

const afriqueTheme = {
  brandSVG,
};

export default withThemeProvider(afriqueTheme);
