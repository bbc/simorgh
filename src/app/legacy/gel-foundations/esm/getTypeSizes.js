import { MEDIA_QUERY_TYPOGRAPHY } from './breakpoints';

var getTypeSizes = function getTypeSizes(typographyName, importedScript) {
  var typographyStyle = importedScript[typographyName];
  var GROUP_A_FONT_SIZE_PX = typographyStyle.groupA.fontSize;
  var GROUP_A_FONT_SIZE = "".concat(GROUP_A_FONT_SIZE_PX / 16, "rem");
  var GROUP_A_LINE_HEIGHT_PX = typographyStyle.groupA.lineHeight;
  var GROUP_A_LINE_HEIGHT = "".concat(GROUP_A_LINE_HEIGHT_PX / 16, "rem");
  var GROUP_B_FONT_SIZE_PX = typographyStyle.groupB.fontSize;
  var GROUP_B_FONT_SIZE = "".concat(GROUP_B_FONT_SIZE_PX / 16, "rem");
  var GROUP_B_LINE_HEIGHT_PX = typographyStyle.groupB.lineHeight;
  var GROUP_B_LINE_HEIGHT = "".concat(GROUP_B_LINE_HEIGHT_PX / 16, "rem");
  var GROUP_D_FONT_SIZE_PX = typographyStyle.groupD.fontSize;
  var GROUP_D_FONT_SIZE = "".concat(GROUP_D_FONT_SIZE_PX / 16, "rem");
  var GROUP_D_LINE_HEIGHT_PX = typographyStyle.groupD.lineHeight;
  var GROUP_D_LINE_HEIGHT = "".concat(GROUP_D_LINE_HEIGHT_PX / 16, "rem");
  return "\n    font-size: ".concat(GROUP_A_FONT_SIZE, ";\n    line-height: ").concat(GROUP_A_LINE_HEIGHT, ";\n\n    ").concat(MEDIA_QUERY_TYPOGRAPHY.SMART_PHONE_ONLY, " {\n      font-size: ").concat(GROUP_B_FONT_SIZE, ";\n      line-height: ").concat(GROUP_B_LINE_HEIGHT, ";\n    }\n\n    ").concat(MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER, " {\n      font-size: ").concat(GROUP_D_FONT_SIZE, ";\n      line-height: ").concat(GROUP_D_LINE_HEIGHT, ";\n    }\n  ");
};

export default getTypeSizes;