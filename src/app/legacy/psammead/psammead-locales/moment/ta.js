import moment from 'moment';
import 'moment/locale/ta';

moment.updateLocale('ta', {
  postformat: null,
  relativeTime: {
    past: '%s முன்னர்',
    m: 'ஒரு நிமிடத்துக்கு',
    mm: '%d நிமிடங்களுக்கு',
    h: 'ஒரு மணி நேரத்துக்கு',
    hh: '%d மணி நேரங்களுக்கு',
  },
});
