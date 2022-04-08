export default function getRemoteData() {
  console.log('working');
  return fetch('https://www.bbc.com/mundo/mostread.json').then(resp =>
    resp.json(),
  );
}
