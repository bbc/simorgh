// The "producer" we report is sometimes different to the service name
// http://bbc.github.io/echo-docs/pages/reporting-piano.html#valid-producer-values
const getProducerFromServiceName = (serviceName: string | null) => {
  if (typeof serviceName !== 'string') return '';

  const replacementProducerName = {
    indonesia: 'INDONESIAN',
    turkce: 'TURKISH',
    portuguese: 'BRASIL',
    zhongwen: 'CHINESE',
    ukchina: 'UK_CHINA',
    afaanoromoo: 'AFAAN_OROMOO',
    cymrufyw: 'WALES',
    newyddion: 'WALES',
    naidheachdan: 'SCOTLAND',
  }[serviceName.toLowerCase()];

  return replacementProducerName || serviceName.toUpperCase();
};

export default getProducerFromServiceName;
