import '../../fontVariants/helmet.scss';
import './palette.scss';
import '../../fontScripts/latin.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/yoruba';

const yorubaTheme = {
  brandSVG,
};

export default withThemeProvider(yorubaTheme);
