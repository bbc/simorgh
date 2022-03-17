/*
 *  BBC REITH
 */
var reithFallback = "Helvetica, Arial, sans-serif;";
var reithSans = "font-family: ReithSans, ".concat(reithFallback);
var reithSerif = "font-family: ReithSerif, ".concat(reithFallback);

var getFontStyleAndWeight = function getFontStyleAndWeight(style, weight) {
  return "font-weight: ".concat(weight, ";\n   font-style: ").concat(style, ";");
};

var latinReithFontStyles = {
  sansRegular: "\n   ".concat(reithSans, "\n   ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansRegularItalic: "\n   ".concat(reithSans, "\n   ").concat(getFontStyleAndWeight('italic', 400), "\n  "),
  sansBold: "\n   ".concat(reithSans, "\n   ").concat(getFontStyleAndWeight('normal', 700), "\n  "),
  sansBoldItalic: "\n   ".concat(reithSans, "\n   ").concat(getFontStyleAndWeight('italic', 700), "\n  "),
  sansLight: "\n   ".concat(reithSans, "\n   ").concat(getFontStyleAndWeight('normal', 300), "\n  "),
  serifRegular: "\n   ".concat(reithSerif, "\n   ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  serifMedium: "\n   ".concat(reithSerif, "\n   ").concat(getFontStyleAndWeight('normal', 500), "\n  "),
  serifMediumItalic: "\n   ".concat(reithSerif, "\n   ").concat(getFontStyleAndWeight('italic', 500), "\n  "),
  serifBold: "\n    ".concat(reithSerif, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  "),
  serifLight: "\n   ".concat(reithSerif, "\n   ").concat(getFontStyleAndWeight('normal', 300), "\n  ")
};
/*
 *  HELMET
 */

var helmet = "font-family: Helmet, Freesans, Helvetica, Arial, sans-serif;";
var helmetFontStyles = {
  sansRegular: "\n    ".concat(helmet, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansRegularItalic: "\n    ".concat(helmet, "\n    ").concat(getFontStyleAndWeight('italic', 400), "\n  "),
  sansBold: "\n    ".concat(helmet, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  "),
  sansBoldItalic: "\n    ".concat(helmet, "\n    ").concat(getFontStyleAndWeight('italic', 700), "\n  ")
};
/*
 *  BBC REITH QALAM
 */

var reithQalamFallback = 'Arial, Verdana, Geneva, Helvetica, sans-serif;';
var reithQalamFontFamily = "font-family: \"BBC Reith Qalam\", ".concat(reithQalamFallback);
var reithQalamStyles = {
  sansRegular: "\n    ".concat(reithQalamFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(reithQalamFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  AMHARIC
 */

var amharicFontFamily = "font-family: \"Noto Sans Ethiopic\", Arial, Verdana, Geneva, Helvetica, sans-serif;";
var amharicStyles = {
  sansRegular: "\n    ".concat(amharicFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(amharicFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  BENGALI
 */

var bengaliFontFamily = "font-family: \"Noto Serif Bengali\", Helmet, Freesans, Helvetica, Arial, sans-serif;";
var bengaliStyles = {
  sansRegular: "\n    ".concat(bengaliFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(bengaliFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  BURMESE
 */

var burmeseFontFamily = "font-family: Padauk, Arial, Verdana, Geneva, Helvetica, sans-serif;";
var burmeseStyles = {
  sansRegular: "\n    ".concat(burmeseFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(burmeseFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  CHINESE
 */

var chineseFontFamily = "font-family: Helvetica, Arial, STHeiti, \u534E\u6587\u9ED1\u4F53, \"Microsoft YaHei\", \u5FAE\u8F6F\u96C5\u9ED1, SimSun, \u5B8B\u4F53;";
var chineseFontStyles = {
  sansRegular: "\n    ".concat(chineseFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(chineseFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  GUJARATI
 */

var gujaratiFontFamily = "font-family: \"Mukta Vaani\", Rasa, \"Noto Sans Gujarati\", \"Hind vadodara\", Shruti, Gautami, \"Gujarati Sangam MN\", \"Gujarati MT\", sans-serif;";
var gujaratiStyles = {
  sansRegular: "\n    ".concat(gujaratiFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(gujaratiFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  HINDI
 */

var hindiFontFamily = "font-family: Arial, Verdana, Geneva, Helvetica, sans-serif;";
var hindiStyles = {
  sansRegular: "\n    ".concat(hindiFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(hindiFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  JAPANESE
 */

var japaneseFontFamily = "font-family: \"Hiragino Kaku Gothic Pro\", \"\uFF8B\uFF97\u30AE\uFF89\u89D2\u30B4Pro W3\", \"MS PGothic\", \"MS UI Gothic\", Helvetica, Arial, sans-serif;";
var japaneseStyles = {
  sansRegular: "\n    ".concat(japaneseFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(japaneseFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  KOREAN
 */

var koreanFontFamily = "font-family: \"Apple SD Gothic Neo\", AppleGothic, \"Malgun Gothic\", Dotum, \"Noto Sans CJK KR\", sans-serif;";
var koreanStyles = {
  sansRegular: "\n    ".concat(koreanFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(koreanFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  MARATHI
 */

var marathiFontFamily = "font-family: \"Noto Sans Devanagari\", Hind, \"Mukta Vaani\", Gautami, \"Kohinoor Devanagari\", sans-serif;";
var marathiStyles = {
  sansRegular: "\n    ".concat(marathiFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(marathiFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  NEPALI
 */

var nepaliFontFamily = "font-family: Arial, Verdana, Geneva, Helvetica, sans-serif;";
var nepaliStyles = {
  sansRegular: "\n    ".concat(nepaliFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(nepaliFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  PUNJABI
 */

var punjabiFontFamily = "font-family: \"Noto Sans Gurmukhi\", Gautami, \"Kohinoor Gurmukhi\", sans-serif;";
var punjabiStyles = {
  sansRegular: "\n    ".concat(punjabiFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(punjabiFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  SINHALA
 */

var sinhalaFontFamily = "font-family: \"Noto Serif Sinhala\", Arial, Verdana, Geneva, Helvetica, sans-serif;";
var sinhalaStyles = {
  sansRegular: "\n    ".concat(sinhalaFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(sinhalaFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  TAMIL
 */

var tamilFontFamily = "font-family: \"Noto Sans Tamil\", Helmet, Freesans, Helvetica, Arial, sans-serif;";
var tamilStyles = {
  sansRegular: "\n    ".concat(tamilFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(tamilFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  TELUGU
 */

var teluguFontFamily = "font-family: Mallanna, \"Noto Sans Telugu\", \"Hind Guntur\", Gautami, \"Kohinoor Telugu\", sans-serif;";
var teluguStyles = {
  sansRegular: "\n    ".concat(teluguFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(teluguFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  THAI
 */

var thaiFontFamily = "font-family: Tahoma, Helmet, freesans, Helvetica, Arial, sans-serif;";
var thaiStyles = {
  sansRegular: "\n    ".concat(thaiFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(thaiFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  TIGRINYA
 */

var tigrinyaFontFamily = "font-family: \"Noto Sans Ethiopic\", Arial, Verdana, Geneva, Helvetica, sans-serif;";
var tigrinyaStyles = {
  sansRegular: "\n    ".concat(tigrinyaFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 400), "\n  "),
  sansBold: "\n    ".concat(tigrinyaFontFamily, "\n    ").concat(getFontStyleAndWeight('normal', 700), "\n  ")
};
/*
 *  OPTIMO BASE
 */

var optimoBaseFontStyles = {
  sansRegular: latinReithFontStyles.sansRegular,
  sansRegularItalic: latinReithFontStyles.sansRegularItalic,
  sansBold: latinReithFontStyles.sansBold,
  sansBoldItalic: latinReithFontStyles.sansBoldItalic,
  sansLight: latinReithFontStyles.sansLight
};
export var afaanoromoo = helmetFontStyles;
export var afrique = helmetFontStyles;
export var amharic = amharicStyles;
export var arabic = reithQalamStyles;
export var archive = latinReithFontStyles;
export var azeri = helmetFontStyles;
export var bengali = bengaliStyles;
export var burmese = burmeseStyles;
export var cymrufyw = latinReithFontStyles;
export var gahuza = helmetFontStyles;
export var gujarati = gujaratiStyles;
export var hausa = helmetFontStyles;
export var hindi = hindiStyles;
export var igbo = helmetFontStyles;
export var indonesia = helmetFontStyles;
export var japanese = japaneseStyles;
export var korean = koreanStyles;
export var kyrgyz = helmetFontStyles;
export var learningenglish = latinReithFontStyles;
export var marathi = marathiStyles;
export var mundo = latinReithFontStyles;
export var naidheachdan = latinReithFontStyles;
export var nepali = nepaliStyles;
export var news = latinReithFontStyles;
export var newsround = latinReithFontStyles;
export var optimobase = optimoBaseFontStyles;
export var pashto = reithQalamStyles;
export var persian = reithQalamStyles;
export var pidgin = helmetFontStyles;
export var portuguese = latinReithFontStyles;
export var punjabi = punjabiStyles;
export var russian = latinReithFontStyles;
export var scotland = latinReithFontStyles;
export var serbian = helmetFontStyles;
export var sinhala = sinhalaStyles;
export var somali = helmetFontStyles;
export var sport = latinReithFontStyles;
export var swahili = helmetFontStyles;
export var tamil = tamilStyles;
export var telugu = teluguStyles;
export var thai = thaiStyles;
export var tigrinya = tigrinyaStyles;
export var turkce = latinReithFontStyles;
export var ukchina = chineseFontStyles;
export var ukrainian = helmetFontStyles;
export var urdu = reithQalamStyles;
export var uzbek = helmetFontStyles;
export var vietnamese = helmetFontStyles;
export var weather = latinReithFontStyles;
export var yoruba = helmetFontStyles;
export var zhongwen = chineseFontStyles;