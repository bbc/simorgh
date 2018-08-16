/* eslint-disable no-unused-expressions */
import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

injectGlobal`
  ${styledNormalize}

  // Box Sizing https://bit.ly/1A91I0J
  html {
    box-sizing: border-box;
    font-size: 100%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  @font-face {
    font-display: optional;
    font-family: ReithSansNewsLight;
    font-style: normal;
    font-weight: 300;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Lt.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Lt.woff') format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSansNewsRegular;
    font-style: normal;
    font-weight: 400;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Rg.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Rg.woff') format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSansNewsMedium;
    font-style: normal;
    font-weight: 600;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Md.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Md.woff') format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSansNewsBold;
    font-style: normal;
    font-weight: 700;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Bd.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSans_W_Bd.woff') format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsLight;
    font-style: normal;
    font-weight: 300;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Lt.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Lt.woff') format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsRegular;
    font-style: normal;
    font-weight: 400;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Rg.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Rg.woff') format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsMedium;
    font-style: normal;
    font-weight: 600;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Md.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Md.woff') format('woff');
  }
  @font-face {
    font-display: optional;
    font-family: ReithSerifNewsBold;
    font-style: normal;
    font-weight: 700;
    src: url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Bd.woff2') format('woff2'), url('https://gel.files.bbci.co.uk/r2.302/BBCReithSerif_W_Bd.woff') format('woff');
  }
`;
