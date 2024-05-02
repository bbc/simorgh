const fs = require('fs');
const { Agent } = require('https');
const fetch = require('node-fetch');
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

const fetchWithCert = async (url, options) => {
  const cert = fs.readFileSync(
    process.env.CERT_CHAIN_PATH || '/etc/pki/tls/certs/client.crt',
  );
  const ca = fs.readFileSync(
    process.env.CA_PATH || '/etc/pki/tls/certs/ca-bundle.crt',
  );
  const key = fs.readFileSync(
    process.env.KEY_PATH || '/etc/pki/tls/private/client.key',
  );
  const agent = new Agent({ cert, ca, key });
  return fetch(url, { agent, ...options });
};

const timeTable = [];

let csvContents;

const collectResults = async (link, service, type) => {
  await fetchWithCert(link).then(response => {
    if (response.ok) {
      response.json().then(json => {
        const jsondata = json.hasOwnProperty('data') ? json.data : json;
        if (!(json.hasOwnProperty('status') && json.status === '404')) {
          if (!jsondata || !jsondata.hasOwnProperty('generated')) {
            console.log('json where no data', jsondata);
          }
          const generatedDateTime = new Date(jsondata.generated);
          const currentDateTime = new Date();
          const timeDifference = currentDateTime - generatedDateTime;
          const minutesSinceGenerated = Math.floor(
            timeDifference / (1000 * 60),
          );
          const records = jsondata.hasOwnProperty('items')
            ? jsondata.items
            : jsondata.records;
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
            collectionTimeWindowInMinutes:
              (new Date(jsondata.lastRecordTimeStamp) -
                new Date(jsondata.firstRecordTimeStamp)) /
              (1000 * 60),
            totalRecords: jsondata.totalRecords,
            counts,
          };

          timeTable.push(timeData);

          if (timeTable.length === (services.length - badServices.length) * 2) {
            csvContents =
              'service, type, link, generated, timeSinceGenerated, lastRecordTimeStamp, firstRecordTimeStamp, Collection Time Window in Minutes, totalRecords, rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9, rank10';
            timeTable.sort((a, b) => {
              if (a.service > b.service) {
                return 1;
              }
              else if (a.service < b.service) {
                return -1;
              }
              else if (a.type < b.type) {
                return -1;
              }
              else if (a.type > b.type) {
                return 1;
              }
              return 0;
            }).forEach(result => {
              csvContents += `\n${result.service},${result.type},${result.link},${result.generated},${result.minutesSinceGenerated},${result.lastRecordTimestamp},${result.firstRecordTimestamp},${result.collectionTimeWindowInMinutes},${result.totalRecords},${result.counts}`;
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
    .forEach((service, i) => {
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
