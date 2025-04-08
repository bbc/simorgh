/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
const SERVICE_WORKER_CACHE = 'simorghCache_v1';

export const serviceWorkerIsAvailable = () => {
  it('Service Worker is available', () => {
    cy.window().then(win => {
      const { serviceWorker } = win.navigator;
      expect(serviceWorker).not.to.be.null;
    });
  });
};

export const serviceWorkerIsRegistered = ({ service }) => {
  it('Service Worker is registered', () => {
    cy.window().then(win => {
      win.navigator.serviceWorker.getRegistrations().then(registrations => {
        const serviceWorkerInScope = registrations.find(registration => {
          return registration.scope.endsWith(`${service}/`);
        });
        expect(serviceWorkerInScope).not.to.be.null;
      });
    });
  });
};

export const serviceWorkerCaching = () => {
  describe('Service Worker - Caching', () => {
    it('initialises a simorgh cache', () => {
      cy.window().then(win => {
        win.caches
          .keys()
          .then(keys => {
            expect(keys).to.include('simorghCache_v1');
          })
          .catch(err => console.error(err));
      });
    });

    it('simorgh cache is not empty', () => {
      cy.window().then(win => {
        win.caches
          .open(SERVICE_WORKER_CACHE)
          .then(simorghCache => {
            simorghCache
              .keys()
              .then(keys => {
                expect(
                  keys,
                  `${JSON.stringify(keys)}`,
                ).to.have.lengthOf.greaterThan(0);
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      });
    });

    const cacheableItems = ['cwr.js', 'woff2', 'moment-lib', 'frosted_promo'];

    it(`simorgh cache contains cached responses for cacheable items - ${JSON.stringify(cacheableItems)}`, () => {
      cy.window().then(win => {
        win.caches.open(SERVICE_WORKER_CACHE).then(simorghCache =>
          simorghCache
            .keys()
            .then(keys => {
              cacheableItems.forEach(cachedItem => {
                const matchingItems = keys
                  .map(({ url }) => url)
                  .flat()
                  .filter(url => url.includes(cachedItem));

                expect(
                  matchingItems,
                  `${JSON.stringify(matchingItems)}`,
                ).to.have.lengthOf.greaterThan(0);
              });
            })
            .catch(err => console.error(err)),
        );
      });
    });

    it(`simorgh cache contains only known cacheable items - ${JSON.stringify(cacheableItems)}`, () => {
      cy.window().then(win => {
        win.caches.open(SERVICE_WORKER_CACHE).then(simorghCache =>
          simorghCache.keys().then(keys => {
            const matchingCachedItems = [];
            const urls = keys.map(({ url }) => url).flat();
            cacheableItems.forEach(cachedItem => {
              const matchingItems = urls.filter(url =>
                url.includes(cachedItem),
              );
              matchingCachedItems.push(...matchingItems);
            });
            const difference = urls.filter(
              x => !matchingCachedItems.includes(x),
            );
            expect(
              difference,
              `unknown cacheable items - ${JSON.stringify(difference)}`,
            ).to.be.empty;
          }),
        );
      });
    });
  });
};
