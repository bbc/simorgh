import '../../fontVariants/punjabi.scss';
import './palette.scss';
import '../../fontScripts/gurmukhi.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/punjabi';

const punjabiTheme = {
  brandSVG,
};

export default withThemeProvider(punjabiTheme);
