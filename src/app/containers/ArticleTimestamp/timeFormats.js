// 2019-03-22
export const formatDateNumeric = 'YYYY-MM-DD';

const longDatetimeLocales = ['ja', 'ko', 'zh-cn'];

// 22 March 2019
export const formatDate = (datetimeLocale) => {
  if (longDatetimeLocales.includes(datetimeLocale)) {
    return 'LL';
  }
  return 'D MMMM YYYY';
};

// 22 March 2019, 17:05 BST
export const formatDateAndTime = (datetimeLocale) => {
  if (longDatetimeLocales.includes(datetimeLocale)) {
    return 'LLL';
  }
  return 'D MMMM YYYY, HH:mm z';
};
