const defaultTranslations = {
  s: '{x} second',
  ss: '{x} seconds',
  m: '{x} minute',
  mm: '{x} minutes',
  h: '{x} hour',
  hh: '{x} hours',
};

const humanize = (labels, key, num) => {
  if (num === 1) {
    return `${labels[key].replace('{x}', num)} `;
  }
  if (num > 1) {
    return `${labels[key.repeat(2)].replace('{x}', num)} `;
  }
  return '';
};

const describeDuration = (duration, translations = defaultTranslations) => {
  const hrs = humanize(translations, 'h', Math.floor(duration.asHours()));
  const mins = humanize(translations, 'm', duration.minutes());
  const sec = humanize(translations, 's', duration.seconds());

  const out = hrs + mins + sec;
  return out.trim();
};

export default describeDuration;
