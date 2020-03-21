/**
 * @pathname /mundo/articles/ce42wzqr2mko
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import {
  runFooterTests,
  runHeaderTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCommonA11yTests,
  runCoreAmpTests,
} from '../../common';

describe('Given I am on a Mundo article AMP page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests();
  });

  runCoreAmpTests();
});

describe('Given I am on a Mundo article Canonical page', () => {
  describe('When I am using the website', () => {
    runCanonicalUserTests({
      imageAltText:
        'Esta imagen de prueba, copyright BBC, muestra un mapa de Francia. La imagen está en los primeros tres bloques y tiene este título.',
      imageCaptionText:
        'Esta imagen de prueba, copyright BBC, muestra un mapa de Francia. La imagen está en los primeros tres bloques y tiene este título.',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });
});

describe('Given I am on a Mundo article AMP/Canonical page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: 'Ir al contenido',
    });

    runFooterTests({
      copyrightText:
        '© 2020 BBC. La BBC no se hace responsable del contenido de sitios externos. Lee sobre nuestra postura acerca de enlaces externos.',
      brandingLink: '/mundo',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle:
        'Este artículo de prueba ha sido creado para que podamos ejecutar pruebas - BBC News Mundo',
      canonicalUrl: 'http://localhost:7080/mundo/articles/ce42wzqr2mko',
      readingDirection: 'ltr',
      language: 'es',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      ogImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      ogImageAlt: 'BBC News Mundo',
      ogLocale: 'es-005',
      ogType: 'article',
      ogUrl: 'http://localhost:7080/mundo/articles/ce42wzqr2mko',
      ogSiteName: 'BBC News Mundo',
      twitterCard: 'summary_large_image',
      twitterCreator: '@bbcmundo',
      twitterImageAlt: 'BBC News Mundo',
      twitterImageSrc:
        'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      twitterSite: '@bbcmundo',
      ogDescription:
        'Este artículo de prueba ha sido creado para que podamos ejecutar pruebas',
      ogTitle:
        'Este artículo de prueba ha sido creado para que podamos ejecutar pruebas - BBC News Mundo',
      twitterDescription:
        'Este artículo de prueba ha sido creado para que podamos ejecutar pruebas',
      twitterTitle:
        'Este artículo de prueba ha sido creado para que podamos ejecutar pruebas - BBC News Mundo',
      linkedData:
        '{"@context":"http://schema.org","@type":"Article","url":"http://localhost:7080/mundo/articles/ce42wzqr2mko","publisher":{"@type":"NewsMediaOrganization","name":"BBC News Mundo","publishingPrinciples":"https://www.bbc.com/news/help-41670342","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/mundo/articles/ce42wzqr2mko","name":"Este artículo de prueba ha sido creado para que podamos ejecutar pruebas"},"headline":"Este artículo de prueba ha sido creado para que podamos ejecutar pruebas","datePublished":"2019-10-04T10:58:46.977Z","dateModified":"2019-10-04T10:58:46.977Z","author":{"@type":"NewsMediaOrganization","name":"BBC News Mundo","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png"},"noBylinesPolicy":"https://www.bbc.com/news/help-41670342#authorexpertise"}}',
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Ir al contenido',
      headlineText: 'Este es el titular de este artículo de prueba.',
    });
  });
});
