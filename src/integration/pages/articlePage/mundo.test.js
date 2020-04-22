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
  runCommonAmpAnalyticsTests,
  runCommonA11yTests,
  runCoreAmpTests,
  runCoreCanonicalTests,
  runPerformanceTests,
  runSnapshotTests,
} from '../../common';

describe('Given I am on a Mundo AMP Article page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests();
  });

  describe('When the application starts', () => {
    runCoreAmpTests();
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonAmpAnalyticsTests();
  });
});

describe('Given I am on a Mundo Canonical Article page', () => {
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

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'mundo' });
  });
});

describe('Given I am on a Mundo Article page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: 'Ir al contenido',
    });

    runFooterTests({
      copyrightAndExternalLinkingText:
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
      fbPages:
        '285361880228,192168680794107,9432520138,347501767628,264572343581678,303522857815,166580710064489,592266607456680,260669183761,160817274042538,236659822607,237647452933504,10150118096995434,113097918700687,143048895744759,81395234664,207150596007088,167959249906191,64040652712,190992343324,103678496456574,367167334474,160894643929209,186742265162,1526071940947174,230299653821,124158667615790,126548377386804,298318986864908,1068750829805728,228458913833525,163571453661989,660673490805047,948946275170651,485274381864409,1633841096923106,654070648098812',
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
        '{"@context":"http://schema.org","@type":"Article","url":"http://localhost:7080/mundo/articles/ce42wzqr2mko","publisher":{"@type":"NewsMediaOrganization","name":"BBC News Mundo","publishingPrinciples":"https://www.bbc.com/mundo/institucional-51359666","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/mundo/articles/ce42wzqr2mko","name":"Este artículo de prueba ha sido creado para que podamos ejecutar pruebas"},"headline":"Este artículo de prueba ha sido creado para que podamos ejecutar pruebas","datePublished":"2019-10-04T10:58:46.977Z","dateModified":"2019-10-04T10:58:46.977Z","author":{"@type":"NewsMediaOrganization","name":"BBC News Mundo","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png"},"noBylinesPolicy":"https://www.bbc.com/mundo/institucional-51359666#authorexpertise"}}',
    });
  });

  describe('When optimising the application performance', () => {
    runPerformanceTests();
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Ir al contenido',
    });
  });

  describe('When I view the source code in the browser', () => {
    runSnapshotTests();
  });
});
