import './trad.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/zhongwen';

const zhongwentradTheme = {
  brandSVG,
};

export default withThemeProvider(zhongwentradTheme);
