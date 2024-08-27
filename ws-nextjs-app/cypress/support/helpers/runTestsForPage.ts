import config from '../config/settings';

import pageVisit from '../../e2e/livePage/pageVisit';

type ServiceConfig = {
  pageTypes: Record<string, { id: string; path: string }>;
};

export default ({ pageType, ...args }) => {
  //   const config = {
  //     pidgin: {
  //       name: 'pidgin',
  //       pageTypes: {
  //         live: { id: 'c7p765ynk9qt', path: '/pidgin/live/c7p765ynk9qt' },
  //       },
  //     },
  //     somali: {
  //       name: 'somali',
  //       pageTypes: {
  //         send: {
  //           id: 'u130092370',
  //           path: '/somali/send/u130092370',
  //         },
  //       },
  //     },
  //     russian: {
  //       name: 'russian',
  //       pageTypes: {
  //         avEmbeds: {
  //           id: 'media-38886884',
  //           path: '/russian/av-embeds/media-38886884',
  //         },
  //       },
  //     },
  //   };
  const settings = config();
  Object.keys(settings)
    .filter(service => settings[service].pageTypes[pageType] !== null)
    .forEach(service => {
      const { path } = settings[service].pageTypes[pageType];
      console.log('SERVICE', service);
      console.log('PATH', path);
      console.log('YO', settings[service].pageTypes[pageType]);
      const testArgs = {
        service,
        pageType,
      };

      before(() => {
        cy.visit(path);
      });

      //   for (let i = 0; i < args.length; i += 1) {
      //     args[i](testArgs);
      //   }
      pageVisit();
    });
};
