import '../../fontVariants/chinese.scss';
import './palette.scss';
import '../../fontScripts/noAscOrDesc.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/ukchina';

const ukchinasimpTheme = {
  brandSVG,
};

export default withThemeProvider(ukchinasimpTheme);
