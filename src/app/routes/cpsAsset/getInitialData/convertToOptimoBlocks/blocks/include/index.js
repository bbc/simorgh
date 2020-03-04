// import 'isomorphic-fetch';

// const fetchMarkup = async url =>
//   await fetch(url, { mode: 'no-cors' })
//     .then(html => {
//       return html.text().then(text => {
//         console.log(`RESPONSE HTML`, text);
//         return text;
//       });
//     })
//     .catch(e => console.error(`HTTP Error: "${e}"`));

// const visMarkup = fetchMarkup('https://tawdriestanything.htmlpasta.com/');

// const id2Markup = fetchMarkup('https://flavourfulpress.htmlpasta.com/');

const markupToRender = {
  include: visMarkup,
  idt2: id2Markup,
};

const convertInclude = ({ tile, href, platform }) => {
  const type = href.split('/')[1];
  return {
    type: 'include',
    model: {
      type: platform,
      href,
      tile,
      html: markupToRender[type],
    },
  };
};

export default convertInclude;
