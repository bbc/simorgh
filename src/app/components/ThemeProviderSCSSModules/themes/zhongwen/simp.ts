import './simp.module.scss';
import withThemeProvider from '#app/components/ThemeProviderSCSSModules/withThemeProvider';
import brandSVG from '../../chameleonLogos/zhongwen';

const zhongwensimpTheme = {
  brandSVG,
};

export default withThemeProvider(zhongwensimpTheme);
