const fs = require('fs');
const fsPromises = require('fs/promises');
const { Agent } = require('undici');
const { createSecureContext } = require('tls');
const allServices = require('../cypress/support/config/settings')();

const badServices = [
  'scotland',
  'newsround',
  'cymrufyw',
  'naidheachdan',
  'ukchinaSimp',
  'ukchinaTrad',
  'ukrainianRu',
];

const servicesWithVariants = ['zhongwen', 'serbian'];

const services = Object.keys(allServices);

console.log('services', services);

const loadCerts = ({ caPath, certChainPath, keyPath }) =>
  Promise.all([
    fsPromises.readFile(caPath, 'UTF-8'),
    fsPromises.readFile(certChainPath, 'UTF-8'),
    fsPromises.readFile(keyPath, 'UTF-8'),
  ]);

const fetchWithCert = async (url, options) => {
  const caPath = process.env.CA_PATH || '/etc/pki/tls/certs/ca-bundle.crt';
  const certChainPath =
    process.env.CERT_CHAIN_PATH || '/etc/pki/tls/certs/client.crt';
  const keyPath = process.env.KEY_PATH || '/etc/pki/tls/private/client.key';

  const [ca, certChain, key] = await loadCerts({
    caPath,
    certChainPath,
    keyPath,
  });

  return fetch(url, {
    dispatcher: new Agent({
      connect: {
        secureContext: createSecureContext({
          cert: certChain,
          key,
          ca,
        }),
      },
    }),
    ...options,
  });
};
const timeTable = [];

let csvContents;

const collectResults = async (link, service, type) => {
  await fetchWithCert(link).then(response => {
    if (response.ok) {
      response.json().then(json => {
        const jsondata = 'data' in json ? json.data : json;
        if (!('status' in json && json.status === '404')) {
          if (!jsondata || !('generated' in jsondata)) {
            console.log('json where no data', jsondata);
          }
          const generatedDateTime = new Date(jsondata.generated);
          const currentDateTime = new Date();
          const timeDifference = currentDateTime - generatedDateTime;
          const minutesSinceGenerated = Math.floor(
            timeDifference / (1000 * 60),
          );
          const records =
            'items' in jsondata ? jsondata.items : jsondata.records;
          const counts = records
            .map(record => record.count)
            .slice(0, 10)
            .join(',');

          const timeData = {
            service,
            type,
            link,
            generated: jsondata.generated,
            minutesSinceGenerated,
            lastRecordTimestamp: jsondata.lastRecordTimeStamp,
            firstRecordTimestamp: jsondata.firstRecordTimeStamp,
            sequence:
              (new Date(jsondata.lastRecordTimeStamp) -
                new Date(jsondata.firstRecordTimeStamp)) /
              (1000 * 60),
            totalRecords: jsondata.totalRecords,
            counts,
          };

          timeTable.push(timeData);

          if (timeTable.length === (services.length - badServices.length) * 2) {
            csvContents =
              'service, type, link, generated, timeSinceGenerated, lastRecordTimeStamp, firstRecordTimeStamp, sequence, totalRecords, rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9, rank10';
            timeTable
              .sort((a, b) => {
                if (a.service > b.service) {
                  return 1;
                }
                if (a.service < b.service) {
                  return -1;
                }
                if (a.type < b.type) {
                  return -1;
                }
                if (a.type > b.type) {
                  return 1;
                }
                return 0;
              })
              .forEach(result => {
                csvContents += `\n${result.service},${result.type},${result.link},${result.generated},${result.minutesSinceGenerated},${result.lastRecordTimestamp},${result.firstRecordTimestamp},${result.sequence},${result.totalRecords},${result.counts}`;
              });
            fs.writeFileSync('./mostReadCollectionTimes.csv', csvContents);
          }
        }
      });
    }
  });
};

(async () => {
  const promises = [];

  services
    .filter(service => !badServices.includes(service))
    .forEach(service => {
      let serviceToCall = service;
      if (servicesWithVariants.some(variant => service.includes(variant))) {
        serviceToCall = service.replace(/([A-Z])/, '_$1').toLowerCase();
      }
      const mostReadUrl = `https://onward-journeys.api.bbci.co.uk/api/most/read/${serviceToCall}`;
      const mostReadResultPromise = collectResults(
        mostReadUrl,
        service,
        'read',
      ).then(result => {
        console.log(service, 'most read done');
        return result;
      });
      promises.push(mostReadResultPromise);
      const mostWatchedUrl = `https://onward-journeys.api.bbci.co.uk/api/most/watched/${serviceToCall}`;
      const mostWatchedResultPromise = collectResults(
        mostWatchedUrl,
        service,
        'watched',
      ).then(result => {
        console.log(service, 'most watched done');
        return result;
      });
      promises.push(mostWatchedResultPromise);
    });

  await Promise.all(promises);
})();
