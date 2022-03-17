var baseFontUrl = 'https://gel.files.bbci.co.uk/r2.511/';
var baseUrlNotoSerifSinhala = 'https://ws-downloads.files.bbci.co.uk/fonts/NotoSerifSinhala/v1.00/';
var baseUrlTamil = 'https://ws-downloads.files.bbci.co.uk/fonts/NotoSansTamil/v1.00/';
var baseUrlMallanna = 'https://ws-downloads.files.bbci.co.uk/fonts/Mallanna/v1.0.4/';
var baseUrlNotoSansEthiopic = 'https://ws-downloads.files.bbci.co.uk/fonts/NotoSansEthiopic/v1.901/';
var baseUrlPadauk = 'https://ws-downloads.files.bbci.co.uk/fonts/Padauk/v2.8/';
var baseUrlNotoSerifBengali = 'https://ws-downloads.files.bbci.co.uk/fonts/NotoSerifBengali/v1.00/';
var baseUrlBBCReithQalam = 'https://ws-downloads.files.bbci.co.uk/fonts/ReithQalam/v1.100/'; // Reith Serif

export var F_REITH_SERIF_REGULAR = function F_REITH_SERIF_REGULAR(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSerif\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_Rg.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_Rg.woff\") format(\"woff\");\n    font-display: optional;\n  }");
};
export var F_REITH_SERIF_ITALIC = function F_REITH_SERIF_ITALIC(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSerif\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_It.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_It.woff\") format(\"woff\");\n    font-style: italic;\n    font-display: optional;\n  }");
};
export var F_REITH_SERIF_BOLD = function F_REITH_SERIF_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSerif\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_Bd.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_Bd.woff\") format(\"woff\");\n    font-weight: 700;\n    font-display: optional;\n  }");
};
export var F_REITH_SERIF_BOLD_ITALIC = function F_REITH_SERIF_BOLD_ITALIC(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSerif\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_BdIt.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_BdIt.woff\") format(\"woff\");\n    font-weight: 700;\n    font-style: italic;\n    font-display: optional;\n  }");
};
export var F_REITH_SERIF_LIGHT = function F_REITH_SERIF_LIGHT(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSerif\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_Lt.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_Lt.woff\") format(\"woff\");\n    font-weight: 300;\n    font-display: optional;\n  }");
};
export var F_REITH_SERIF_LIGHT_ITALIC = function F_REITH_SERIF_LIGHT_ITALIC(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSerif\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_LtIt.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_LtIt.woff\") format(\"woff\");\n    font-weight: 300;\n    font-style: italic;\n    font-display: optional;\n  }");
};
export var F_REITH_SERIF_MEDIUM = function F_REITH_SERIF_MEDIUM(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSerif\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_Md.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_Md.woff\") format(\"woff\");\n    font-weight: 500;\n    font-display: optional;\n  }");
};
export var F_REITH_SERIF_MEDIUM_ITALIC = function F_REITH_SERIF_MEDIUM_ITALIC(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSerif\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_MdIt.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_MdIt.woff\") format(\"woff\");\n    font-weight: 500;\n    font-style: italic;\n    font-display: optional;\n  }");
};
export var F_REITH_SERIF_EXTRA_BOLD = function F_REITH_SERIF_EXTRA_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSerif\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_ExBd.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_ExBd.woff\") format(\"woff\");\n    font-weight: 800;\n    font-display: optional;\n  }");
};
export var F_REITH_SERIF_EXTRA_BOLD_ITALIC = function F_REITH_SERIF_EXTRA_BOLD_ITALIC(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSerif\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_ExBdIt.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSerif_W_ExBdIt.woff\") format(\"woff\");\n    font-weight: 800;\n    font-style: italic;\n    font-display: optional;\n  }");
}; // Reith Sans

export var F_REITH_SANS_REGULAR = function F_REITH_SANS_REGULAR(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSans\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_Rg.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_Rg.woff\") format(\"woff\");\n    font-display: optional;\n  }");
};
export var F_REITH_SANS_ITALIC = function F_REITH_SANS_ITALIC(baseUrlOverride) {
  return "\n    @font-face {\n    font-family: \"ReithSans\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_It.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_It.woff\") format(\"woff\");\n    font-style: italic;\n    font-display: optional;\n  }");
};
export var F_REITH_SANS_BOLD = function F_REITH_SANS_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSans\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_Bd.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_Bd.woff\") format(\"woff\");\n    font-weight: 700;\n    font-display: optional;\n  }");
};
export var F_REITH_SANS_BOLD_ITALIC = function F_REITH_SANS_BOLD_ITALIC(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSans\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_BdIt.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_BdIt.woff\") format(\"woff\");\n    font-weight: 700;\n    font-style: italic;\n    font-display: optional;\n  }");
};
export var F_REITH_SANS_LIGHT = function F_REITH_SANS_LIGHT(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSans\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_Lt.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_Lt.woff\") format(\"woff\");\n    font-weight: 300;\n    font-display: optional;\n  }");
};
export var F_REITH_SANS_LIGHT_ITALIC = function F_REITH_SANS_LIGHT_ITALIC(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSans\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_LtIt.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_LtIt.woff\") format(\"woff\");\n    font-weight: 300;\n    font-style: italic;\n    font-display: optional;\n  }");
};
export var F_REITH_SANS_MEDIUM = function F_REITH_SANS_MEDIUM(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSans\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_Md.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_Md.woff\") format(\"woff\");\n    font-weight: 500;\n    font-display: optional;\n  }");
};
export var F_REITH_SANS_MEDIUM_ITALIC = function F_REITH_SANS_MEDIUM_ITALIC(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSans\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_MdIt.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_MdIt.woff\") format(\"woff\");\n    font-weight: 500;\n    font-style: italic;\n    font-display: optional;\n  }");
};
export var F_REITH_SANS_EXTRA_BOLD = function F_REITH_SANS_EXTRA_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSans\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_ExBd.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_ExBd.woff\") format(\"woff\");\n    font-weight: 800;\n    font-display: optional;\n  }");
};
export var F_REITH_SANS_EXTRA_BOLD_ITALIC = function F_REITH_SANS_EXTRA_BOLD_ITALIC(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"ReithSans\";\n    src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_ExBdIt.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSans_W_ExBdIt.woff\") format(\"woff\");\n    font-weight: 800;\n    font-style: italic;\n    font-display: optional;\n  }");
}; // Reith Sans Condensed

export var F_REITH_SANS_CONDENSED_REGULAR = function F_REITH_SANS_CONDENSED_REGULAR(baseUrlOverride) {
  return "\n  @font-face {\n      font-family: \"ReithSansCondensed\";\n      src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSansCd_W_Rg.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSansCd_W_Rg.woff\") format(\"woff\");\n      font-display: optional;\n  }");
};
export var F_REITH_SANS_CONDENSED_BOLD = function F_REITH_SANS_CONDENSED_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n      font-family: \"ReithSansCondensed\";\n      font-weight: 700;\n      src: url(\"".concat(baseUrlOverride || baseFontUrl, "BBCReithSansCd_W_Bd.woff2\") format(\"woff2\"), url(\"").concat(baseUrlOverride || baseFontUrl, "BBCReithSansCd_W_Bd.woff\") format(\"woff\");\n      font-display: optional;\n  }");
}; // Noto Serif Sinhala

export var F_NOTO_SERIF_SINHALA_REGULAR = function F_NOTO_SERIF_SINHALA_REGULAR(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Noto Serif Sinhala\";\n    font-weight: 400;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlNotoSerifSinhala, "normal.woff2') format('woff2'), url('").concat(baseUrlOverride || baseUrlNotoSerifSinhala, "normal.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlNotoSerifSinhala, "normal.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlNotoSerifSinhala, "normal.ttf') format('ttf');\n    font-display: swap;\n  }");
};
export var F_NOTO_SERIF_SINHALA_BOLD = function F_NOTO_SERIF_SINHALA_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Noto Serif Sinhala\";\n    font-weight: 700;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlNotoSerifSinhala, "bold.woff2') format('woff2'), url('").concat(baseUrlOverride || baseUrlNotoSerifSinhala, "bold.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlNotoSerifSinhala, "bold.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlNotoSerifSinhala, "bold.ttf') format('ttf');\n    font-display: swap;\n  }\n");
}; // Tamil

export var F_NOTO_SANS_TAMIL_REGULAR = function F_NOTO_SANS_TAMIL_REGULAR(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Noto Sans Tamil\";\n    font-weight: 400;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlTamil, "normal.woff2') format('woff2'), url('").concat(baseUrlOverride || baseUrlTamil, "normal.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlTamil, "normal.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlTamil, "normal.ttf') format('ttf');\n    font-display: swap;\n  }");
};
export var F_NOTO_SANS_TAMIL_BOLD = function F_NOTO_SANS_TAMIL_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Noto Sans Tamil\";\n    font-weight: 700;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlTamil, "bold.woff2') format('woff2'), url('").concat(baseUrlOverride || baseUrlTamil, "bold.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlTamil, "normal.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlTamil, "bold.ttf') format('ttf');\n    font-display: swap;\n  }\n");
}; // Mallanna

export var F_MALLANNA_REGULAR = function F_MALLANNA_REGULAR(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Mallanna\";\n    font-weight: 400;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlMallanna, "normal.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlMallanna, "normal.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlMallanna, "normal.ttf') format('ttf');\n    font-display: swap;\n  }\n");
}; // Noto Sans Ethiopic

export var F_NOTO_SANS_ETHIOPIC_REGULAR = function F_NOTO_SANS_ETHIOPIC_REGULAR(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Noto Sans Ethiopic\";\n    font-weight: 400;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlNotoSansEthiopic, "normal.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlNotoSansEthiopic, "normal.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlNotoSansEthiopic, "normal.ttf') format('ttf');\n    font-display: swap;\n  }\n  ");
};
export var F_NOTO_SANS_ETHIOPIC_BOLD = function F_NOTO_SANS_ETHIOPIC_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Noto Sans Ethiopic\";\n    font-weight: 700;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlNotoSansEthiopic, "bold.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlNotoSansEthiopic, "bold.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlNotoSansEthiopic, "bold.ttf') format('ttf');\n    font-display: swap;\n  }\n");
}; // Padauk

export var F_PADAUK_REGULAR = function F_PADAUK_REGULAR(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Padauk\";\n    font-weight: 400;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlPadauk, "normal.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlPadauk, "normal.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlPadauk, "normal.ttf') format('ttf');\n    font-display: swap;\n  }");
};
export var F_PADAUK_BOLD = function F_PADAUK_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Padauk\";\n    font-weight: 700;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlPadauk, "bold.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlPadauk, "bold.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlPadauk, "bold.ttf') format('ttf');\n    font-display: swap;\n  }\n");
}; // Bengali

export var F_NOTO_SERIF_BENGALI_REGULAR = function F_NOTO_SERIF_BENGALI_REGULAR(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Noto Serif Bengali\";\n    font-weight: 400;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlNotoSerifBengali, "normal.woff2') format('woff2'), url('").concat(baseUrlOverride || baseUrlNotoSerifBengali, "normal.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlNotoSerifBengali, "normal.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlNotoSerifBengali, "normal.ttf') format('ttf');\n    font-display: optional;\n  }");
};
export var F_NOTO_SERIF_BENGALI_BOLD = function F_NOTO_SERIF_BENGALI_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"Noto Serif Bengali\";\n    font-weight: 700;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlNotoSerifBengali, "bold.woff2') format('woff2'), url('").concat(baseUrlOverride || baseUrlNotoSerifBengali, "bold.woff') format('woff'), url('").concat(baseUrlOverride || baseUrlNotoSerifBengali, "normal.eot') format('eot'), url('").concat(baseUrlOverride || baseUrlNotoSerifBengali, "bold.ttf') format('ttf');\n    font-display: optional;\n  }\n");
}; // BBC Reith Qalam

export var F_REITH_QALAM_REGULAR = function F_REITH_QALAM_REGULAR(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"BBC Reith Qalam\";\n    font-weight: 400;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlBBCReithQalam, "normal.woff2') format('woff2'), url('").concat(baseUrlOverride || baseUrlBBCReithQalam, "normal.woff') format('woff');\n    font-display: optional;\n  }\n");
};
export var F_REITH_QALAM_BOLD = function F_REITH_QALAM_BOLD(baseUrlOverride) {
  return "\n  @font-face {\n    font-family: \"BBC Reith Qalam\";\n    font-weight: 700;\n    font-style: normal;\n    src: url('".concat(baseUrlOverride || baseUrlBBCReithQalam, "bold.woff2') format('woff2'), url('").concat(baseUrlOverride || baseUrlBBCReithQalam, "bold.woff') format('woff');\n    font-display: optional;\n  }\n");
};