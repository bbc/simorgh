import './simp.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/ukchina';

const ukchinasimpTheme = {
  brandSVG,
};

export default withThemeProvider(ukchinasimpTheme);
