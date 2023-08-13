const fs = require('fs');
const fetch = require('node-fetch');

const services = ['mundo', 'indonesia', 'igbo'];
const timeTable = [];

let csvContents;

const fetchResponse = async link => {
  const fetchStatus = await fetch(link, { timeout: 20000 });
  return fetchStatus;
};

const collectResults = async link => {
  await fetchResponse(link).then(response => {
    const responseJson = response.json().then(json => {
      const generatedDateTime = new Date(json.generated);
      const currentDateTime = new Date();
      const timeDifference = currentDateTime - generatedDateTime;
      const minutesSinceGenerated = Math.floor(timeDifference / (1000 * 60));
      const counts = json.records
        .map(record => record.count)
        .slice(0, 10)
        .join(',');
      console.log(json);
      timeTable.push({
        link,
        generated: json.generated,
        minutesSinceGenerated,
        lastRecordTimestamp: json.lastRecordTimeStamp,
        firstRecordTimestamp: json.firstRecordTimeStamp,
        totalRecords: json.totalRecords,
        counts,
      });
      csvContents =
        'link, generated, timeSinceGenerated, lastRecordTimeStamp, firstRecordTimeStamp, totalRecords, rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9, rank10';
      console.log('timeTable.length ', timeTable.length);
      console.log('services.length ', services.length);
    });
    console.log('TIMETABLE', timeTable);
    console.log(responseJson);
  });
};

(async () => {
  const promises = [];

  services.forEach(service => {
    const mostReadUrl = `https://www.bbc.com/${service}/mostread.json`;
    const mostReadResultPromise = collectResults(mostReadUrl, service).then(
      result => {
        console.log('service', service);
        console.log('results', result);
        return result;
      },
    );
    promises.push(mostReadResultPromise);
    const mostWatchedUrl = `https://www.bbc.com/${service}/mostwatched.json`;
    const mostWatchedResultPromise = collectResults(
      mostWatchedUrl,
      service,
    ).then(result => {
      console.log('service', service);
      console.log('results', result);
      return result;
    });
    promises.push(mostWatchedResultPromise);
  });

  const results = await Promise.all(promises);

  csvContents =
    'link, generated, minutesSinceGenerated, lastRecordTimeStamp, firstRecordTimeStamp, totalRecords, rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9, rank10';
  results.forEach(result => {
    csvContents += `\n${result}`;
  });
  if (timeTable.length === services.length * 2) {
    fs.writeFileSync('./mostReadCollectionTimes.csv', csvContents);
    console.log('I AM FINISHED');
  }
})();
