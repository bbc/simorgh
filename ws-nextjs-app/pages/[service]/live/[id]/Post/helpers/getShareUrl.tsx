/** @jsx jsx */

// could this logic sit in the BFF and be passed through?
// is there a chance the POST asset ID will change? Ask the live team.
const getShareURL = ({ urn, scroll }: { urn: string; scroll: boolean }) => {
  // hard-coded for the spike.
  // replace this with URL builder. Maybe like those in src/app/lib/utilities/getUrlHelpers
  const myURL = `http://localhost:7081/pidgin/live/c07zr0zwjnnt`;
  const cleanedURN = urn.split(':').pop();
  const shareURL = scroll
    ? `${myURL}?post=asset%3A${cleanedURN}`
    : `${myURL}?post=asset%3A${cleanedURN}#post`;

  return shareURL;
};

export default getShareURL;
