import '../../fontVariants/korean.scss';
import './palette.scss';
import '../../fontScripts/noAscOrDesc.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/korean';

const koreanTheme = {
  brandSVG,
};

export default withThemeProvider(koreanTheme);
