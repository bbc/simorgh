import './russian.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/russian';

const russianTheme = {
  brandSVG,
};

export default withThemeProvider(russianTheme);
