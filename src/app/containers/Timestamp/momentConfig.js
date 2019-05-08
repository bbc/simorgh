import moment from 'moment-timezone';
import deepGet from '../../helpers/json/deepGet';

const momentConfig = config => {
  const timezone = deepGet(['timezone'], config);
  const locale = deepGet(['locale'], config);

  if (timezone) {
    moment.tz.add(timezone);
    moment.tz.setDefault(timezone.split('|')[0]);
  }

  if (locale) {
    moment.locale(locale);
  }
};

export default momentConfig;
