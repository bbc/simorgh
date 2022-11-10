/* eslint-disable */
import moment from 'moment';

import 'moment/locale/hi';

moment.updateLocale('hi', {
  months: 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितंबर_अक्टूबर_नवंबर_दिसंबर'.split(
    '_'
  ),
  postformat: null,
});
