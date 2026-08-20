import './trad.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/ukchina';

const ukchinatradTheme = {
  brandSVG,
};

export default withThemeProvider(ukchinatradTheme);
