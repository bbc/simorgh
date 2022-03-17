"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zhongwen = exports.yoruba = exports.weather = exports.vietnamese = exports.uzbek = exports.urdu = exports.ukrainian = exports.ukchina = exports.turkce = exports.tigrinya = exports.thai = exports.telugu = exports.tamil = exports.swahili = exports.sport = exports.somali = exports.sinhala = exports.serbian = exports.scotland = exports.russian = exports.punjabi = exports.portuguese = exports.pidgin = exports.persian = exports.pashto = exports.optimobase = exports.newsround = exports.news = exports.nepali = exports.naidheachdan = exports.mundo = exports.marathi = exports.learningenglish = exports.kyrgyz = exports.korean = exports.japanese = exports.indonesia = exports.igbo = exports.hindi = exports.hausa = exports.gujarati = exports.gahuza = exports.cymrufyw = exports.burmese = exports.bengali = exports.azeri = exports.archive = exports.arabic = exports.amharic = exports.afrique = exports.afaanoromoo = void 0;

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
var afaanoromoo = helmetFontStyles;
exports.afaanoromoo = afaanoromoo;
var afrique = helmetFontStyles;
exports.afrique = afrique;
var amharic = amharicStyles;
exports.amharic = amharic;
var arabic = reithQalamStyles;
exports.arabic = arabic;
var archive = latinReithFontStyles;
exports.archive = archive;
var azeri = helmetFontStyles;
exports.azeri = azeri;
var bengali = bengaliStyles;
exports.bengali = bengali;
var burmese = burmeseStyles;
exports.burmese = burmese;
var cymrufyw = latinReithFontStyles;
exports.cymrufyw = cymrufyw;
var gahuza = helmetFontStyles;
exports.gahuza = gahuza;
var gujarati = gujaratiStyles;
exports.gujarati = gujarati;
var hausa = helmetFontStyles;
exports.hausa = hausa;
var hindi = hindiStyles;
exports.hindi = hindi;
var igbo = helmetFontStyles;
exports.igbo = igbo;
var indonesia = helmetFontStyles;
exports.indonesia = indonesia;
var japanese = japaneseStyles;
exports.japanese = japanese;
var korean = koreanStyles;
exports.korean = korean;
var kyrgyz = helmetFontStyles;
exports.kyrgyz = kyrgyz;
var learningenglish = latinReithFontStyles;
exports.learningenglish = learningenglish;
var marathi = marathiStyles;
exports.marathi = marathi;
var mundo = latinReithFontStyles;
exports.mundo = mundo;
var naidheachdan = latinReithFontStyles;
exports.naidheachdan = naidheachdan;
var nepali = nepaliStyles;
exports.nepali = nepali;
var news = latinReithFontStyles;
exports.news = news;
var newsround = latinReithFontStyles;
exports.newsround = newsround;
var optimobase = optimoBaseFontStyles;
exports.optimobase = optimobase;
var pashto = reithQalamStyles;
exports.pashto = pashto;
var persian = reithQalamStyles;
exports.persian = persian;
var pidgin = helmetFontStyles;
exports.pidgin = pidgin;
var portuguese = latinReithFontStyles;
exports.portuguese = portuguese;
var punjabi = punjabiStyles;
exports.punjabi = punjabi;
var russian = latinReithFontStyles;
exports.russian = russian;
var scotland = latinReithFontStyles;
exports.scotland = scotland;
var serbian = helmetFontStyles;
exports.serbian = serbian;
var sinhala = sinhalaStyles;
exports.sinhala = sinhala;
var somali = helmetFontStyles;
exports.somali = somali;
var sport = latinReithFontStyles;
exports.sport = sport;
var swahili = helmetFontStyles;
exports.swahili = swahili;
var tamil = tamilStyles;
exports.tamil = tamil;
var telugu = teluguStyles;
exports.telugu = telugu;
var thai = thaiStyles;
exports.thai = thai;
var tigrinya = tigrinyaStyles;
exports.tigrinya = tigrinya;
var turkce = latinReithFontStyles;
exports.turkce = turkce;
var ukchina = chineseFontStyles;
exports.ukchina = ukchina;
var ukrainian = helmetFontStyles;
exports.ukrainian = ukrainian;
var urdu = reithQalamStyles;
exports.urdu = urdu;
var uzbek = helmetFontStyles;
exports.uzbek = uzbek;
var vietnamese = helmetFontStyles;
exports.vietnamese = vietnamese;
var weather = latinReithFontStyles;
exports.weather = weather;
var yoruba = helmetFontStyles;
exports.yoruba = yoruba;
var zhongwen = chineseFontStyles;
exports.zhongwen = zhongwen;