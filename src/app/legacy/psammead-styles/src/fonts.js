const baseFontUrl = 'https://gel.files.bbci.co.uk/r2.511/';

const baseUrlNotoSerifSinhala =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSerifSinhala/v1.00/';

const baseUrlTamil =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSansTamil/v1.00/';

const baseUrlMallanna =
  'https://ws-downloads.files.bbci.co.uk/fonts/Mallanna/v1.0.4/';

const baseUrlNotoSansEthiopic =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSansEthiopic/v1.901/';

const baseUrlPadauk =
  'https://ws-downloads.files.bbci.co.uk/fonts/Padauk/v2.8/';

const baseUrlNotoSerifBengali =
  'https://ws-downloads.files.bbci.co.uk/fonts/NotoSerifBengali/v1.00/';

const baseUrlBBCReithQalam =
  'https://ws-downloads.files.bbci.co.uk/fonts/ReithQalam/v1.100/';

// Reith Serif
export const F_REITH_SERIF_REGULAR = baseUrlOverride => `
  @font-face {
    font-family: "ReithSerif";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSerif_W_Rg.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSerif_W_Rg.woff") format("woff");
    font-display: optional;
  }`;

export const F_REITH_SERIF_ITALIC = baseUrlOverride => `
  @font-face {
    font-family: "ReithSerif";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSerif_W_It.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSerif_W_It.woff") format("woff");
    font-style: italic;
    font-display: optional;
  }`;

export const F_REITH_SERIF_BOLD = baseUrlOverride => `
  @font-face {
    font-family: "ReithSerif";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSerif_W_Bd.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSerif_W_Bd.woff") format("woff");
    font-weight: 700;
    font-display: optional;
  }`;

export const F_REITH_SERIF_BOLD_ITALIC = baseUrlOverride => `
  @font-face {
    font-family: "ReithSerif";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSerif_W_BdIt.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSerif_W_BdIt.woff") format("woff");
    font-weight: 700;
    font-style: italic;
    font-display: optional;
  }`;

export const F_REITH_SERIF_LIGHT = baseUrlOverride => `
  @font-face {
    font-family: "ReithSerif";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSerif_W_Lt.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSerif_W_Lt.woff") format("woff");
    font-weight: 300;
    font-display: optional;
  }`;

export const F_REITH_SERIF_LIGHT_ITALIC = baseUrlOverride => `
  @font-face {
    font-family: "ReithSerif";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSerif_W_LtIt.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSerif_W_LtIt.woff") format("woff");
    font-weight: 300;
    font-style: italic;
    font-display: optional;
  }`;

export const F_REITH_SERIF_MEDIUM = baseUrlOverride => `
  @font-face {
    font-family: "ReithSerif";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSerif_W_Md.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSerif_W_Md.woff") format("woff");
    font-weight: 500;
    font-display: optional;
  }`;

export const F_REITH_SERIF_MEDIUM_ITALIC = baseUrlOverride => `
  @font-face {
    font-family: "ReithSerif";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSerif_W_MdIt.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSerif_W_MdIt.woff") format("woff");
    font-weight: 500;
    font-style: italic;
    font-display: optional;
  }`;

export const F_REITH_SERIF_EXTRA_BOLD = baseUrlOverride => `
  @font-face {
    font-family: "ReithSerif";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSerif_W_ExBd.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSerif_W_ExBd.woff") format("woff");
    font-weight: 800;
    font-display: optional;
  }`;

export const F_REITH_SERIF_EXTRA_BOLD_ITALIC = baseUrlOverride => `
  @font-face {
    font-family: "ReithSerif";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSerif_W_ExBdIt.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSerif_W_ExBdIt.woff") format("woff");
    font-weight: 800;
    font-style: italic;
    font-display: optional;
  }`;

// Reith Sans
export const F_REITH_SANS_REGULAR = baseUrlOverride => `
  @font-face {
    font-family: "ReithSans";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSans_W_Rg.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSans_W_Rg.woff") format("woff");
    font-display: optional;
  }`;

export const F_REITH_SANS_ITALIC = baseUrlOverride => `
    @font-face {
    font-family: "ReithSans";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSans_W_It.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSans_W_It.woff") format("woff");
    font-style: italic;
    font-display: optional;
  }`;

export const F_REITH_SANS_BOLD = baseUrlOverride => `
  @font-face {
    font-family: "ReithSans";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSans_W_Bd.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSans_W_Bd.woff") format("woff");
    font-weight: 700;
    font-display: optional;
  }`;

export const F_REITH_SANS_BOLD_ITALIC = baseUrlOverride => `
  @font-face {
    font-family: "ReithSans";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSans_W_BdIt.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSans_W_BdIt.woff") format("woff");
    font-weight: 700;
    font-style: italic;
    font-display: optional;
  }`;

export const F_REITH_SANS_LIGHT = baseUrlOverride => `
  @font-face {
    font-family: "ReithSans";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSans_W_Lt.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSans_W_Lt.woff") format("woff");
    font-weight: 300;
    font-display: optional;
  }`;

export const F_REITH_SANS_LIGHT_ITALIC = baseUrlOverride => `
  @font-face {
    font-family: "ReithSans";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSans_W_LtIt.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSans_W_LtIt.woff") format("woff");
    font-weight: 300;
    font-style: italic;
    font-display: optional;
  }`;

export const F_REITH_SANS_MEDIUM = baseUrlOverride => `
  @font-face {
    font-family: "ReithSans";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSans_W_Md.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSans_W_Md.woff") format("woff");
    font-weight: 500;
    font-display: optional;
  }`;

export const F_REITH_SANS_MEDIUM_ITALIC = baseUrlOverride => `
  @font-face {
    font-family: "ReithSans";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSans_W_MdIt.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSans_W_MdIt.woff") format("woff");
    font-weight: 500;
    font-style: italic;
    font-display: optional;
  }`;

export const F_REITH_SANS_EXTRA_BOLD = baseUrlOverride => `
  @font-face {
    font-family: "ReithSans";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSans_W_ExBd.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSans_W_ExBd.woff") format("woff");
    font-weight: 800;
    font-display: optional;
  }`;

export const F_REITH_SANS_EXTRA_BOLD_ITALIC = baseUrlOverride => `
  @font-face {
    font-family: "ReithSans";
    src: url("${
      baseUrlOverride || baseFontUrl
    }BBCReithSans_W_ExBdIt.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSans_W_ExBdIt.woff") format("woff");
    font-weight: 800;
    font-style: italic;
    font-display: optional;
  }`;

// Reith Sans Condensed
export const F_REITH_SANS_CONDENSED_REGULAR = baseUrlOverride => `
  @font-face {
      font-family: "ReithSansCondensed";
      src: url("${
        baseUrlOverride || baseFontUrl
      }BBCReithSansCd_W_Rg.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSansCd_W_Rg.woff") format("woff");
      font-display: optional;
  }`;

export const F_REITH_SANS_CONDENSED_BOLD = baseUrlOverride => `
  @font-face {
      font-family: "ReithSansCondensed";
      font-weight: 700;
      src: url("${
        baseUrlOverride || baseFontUrl
      }BBCReithSansCd_W_Bd.woff2") format("woff2"), url("${
  baseUrlOverride || baseFontUrl
}BBCReithSansCd_W_Bd.woff") format("woff");
      font-display: optional;
  }`;

// Noto Serif Sinhala
export const F_NOTO_SERIF_SINHALA_REGULAR = baseUrlOverride => `
  @font-face {
    font-family: "Noto Serif Sinhala";
    font-weight: 400;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlNotoSerifSinhala
    }normal.woff2') format('woff2'), url('${
  baseUrlOverride || baseUrlNotoSerifSinhala
}normal.woff') format('woff'), url('${
  baseUrlOverride || baseUrlNotoSerifSinhala
}normal.eot') format('eot'), url('${
  baseUrlOverride || baseUrlNotoSerifSinhala
}normal.ttf') format('ttf');
    font-display: swap;
  }`;

export const F_NOTO_SERIF_SINHALA_BOLD = baseUrlOverride => `
  @font-face {
    font-family: "Noto Serif Sinhala";
    font-weight: 700;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlNotoSerifSinhala
    }bold.woff2') format('woff2'), url('${
  baseUrlOverride || baseUrlNotoSerifSinhala
}bold.woff') format('woff'), url('${
  baseUrlOverride || baseUrlNotoSerifSinhala
}bold.eot') format('eot'), url('${
  baseUrlOverride || baseUrlNotoSerifSinhala
}bold.ttf') format('ttf');
    font-display: swap;
  }
`;

// Tamil
export const F_NOTO_SANS_TAMIL_REGULAR = baseUrlOverride => `
  @font-face {
    font-family: "Noto Sans Tamil";
    font-weight: 400;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlTamil
    }normal.woff2') format('woff2'), url('${
  baseUrlOverride || baseUrlTamil
}normal.woff') format('woff'), url('${
  baseUrlOverride || baseUrlTamil
}normal.eot') format('eot'), url('${
  baseUrlOverride || baseUrlTamil
}normal.ttf') format('ttf');
    font-display: swap;
  }`;

export const F_NOTO_SANS_TAMIL_BOLD = baseUrlOverride => `
  @font-face {
    font-family: "Noto Sans Tamil";
    font-weight: 700;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlTamil
    }bold.woff2') format('woff2'), url('${
  baseUrlOverride || baseUrlTamil
}bold.woff') format('woff'), url('${
  baseUrlOverride || baseUrlTamil
}normal.eot') format('eot'), url('${
  baseUrlOverride || baseUrlTamil
}bold.ttf') format('ttf');
    font-display: swap;
  }
`;

// Mallanna
export const F_MALLANNA_REGULAR = baseUrlOverride => `
  @font-face {
    font-family: "Mallanna";
    font-weight: 400;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlMallanna
    }normal.woff') format('woff'), url('${
  baseUrlOverride || baseUrlMallanna
}normal.eot') format('eot'), url('${
  baseUrlOverride || baseUrlMallanna
}normal.ttf') format('ttf');
    font-display: swap;
  }
`;

// Noto Sans Ethiopic
export const F_NOTO_SANS_ETHIOPIC_REGULAR = baseUrlOverride => `
  @font-face {
    font-family: "Noto Sans Ethiopic";
    font-weight: 400;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlNotoSansEthiopic
    }normal.woff') format('woff'), url('${
  baseUrlOverride || baseUrlNotoSansEthiopic
}normal.eot') format('eot'), url('${
  baseUrlOverride || baseUrlNotoSansEthiopic
}normal.ttf') format('ttf');
    font-display: swap;
  }
  `;

export const F_NOTO_SANS_ETHIOPIC_BOLD = baseUrlOverride => `
  @font-face {
    font-family: "Noto Sans Ethiopic";
    font-weight: 700;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlNotoSansEthiopic
    }bold.woff') format('woff'), url('${
  baseUrlOverride || baseUrlNotoSansEthiopic
}bold.eot') format('eot'), url('${
  baseUrlOverride || baseUrlNotoSansEthiopic
}bold.ttf') format('ttf');
    font-display: swap;
  }
`;

// Padauk
export const F_PADAUK_REGULAR = baseUrlOverride => `
  @font-face {
    font-family: "Padauk";
    font-weight: 400;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlPadauk
    }normal.woff') format('woff'), url('${
  baseUrlOverride || baseUrlPadauk
}normal.eot') format('eot'), url('${
  baseUrlOverride || baseUrlPadauk
}normal.ttf') format('ttf');
    font-display: swap;
  }`;

export const F_PADAUK_BOLD = baseUrlOverride => `
  @font-face {
    font-family: "Padauk";
    font-weight: 700;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlPadauk
    }bold.woff') format('woff'), url('${
  baseUrlOverride || baseUrlPadauk
}bold.eot') format('eot'), url('${
  baseUrlOverride || baseUrlPadauk
}bold.ttf') format('ttf');
    font-display: swap;
  }
`;

// Bengali
export const F_NOTO_SERIF_BENGALI_REGULAR = baseUrlOverride => `
  @font-face {
    font-family: "Noto Serif Bengali";
    font-weight: 400;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlNotoSerifBengali
    }normal.woff2') format('woff2'), url('${
  baseUrlOverride || baseUrlNotoSerifBengali
}normal.woff') format('woff'), url('${
  baseUrlOverride || baseUrlNotoSerifBengali
}normal.eot') format('eot'), url('${
  baseUrlOverride || baseUrlNotoSerifBengali
}normal.ttf') format('ttf');
    font-display: optional;
  }`;

export const F_NOTO_SERIF_BENGALI_BOLD = baseUrlOverride => `
  @font-face {
    font-family: "Noto Serif Bengali";
    font-weight: 700;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlNotoSerifBengali
    }bold.woff2') format('woff2'), url('${
  baseUrlOverride || baseUrlNotoSerifBengali
}bold.woff') format('woff'), url('${
  baseUrlOverride || baseUrlNotoSerifBengali
}normal.eot') format('eot'), url('${
  baseUrlOverride || baseUrlNotoSerifBengali
}bold.ttf') format('ttf');
    font-display: optional;
  }
`;

// BBC Reith Qalam
export const F_REITH_QALAM_REGULAR = baseUrlOverride => `
  @font-face {
    font-family: "BBC Reith Qalam";
    font-weight: 400;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlBBCReithQalam
    }normal.woff2') format('woff2'), url('${
  baseUrlOverride || baseUrlBBCReithQalam
}normal.woff') format('woff');
    font-display: optional;
  }
`;

export const F_REITH_QALAM_BOLD = baseUrlOverride => `
  @font-face {
    font-family: "BBC Reith Qalam";
    font-weight: 700;
    font-style: normal;
    src: url('${
      baseUrlOverride || baseUrlBBCReithQalam
    }bold.woff2') format('woff2'), url('${
  baseUrlOverride || baseUrlBBCReithQalam
}bold.woff') format('woff');
    font-display: optional;
  }
`;
