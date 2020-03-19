/**
 * @pathname /mundo/articles/ce42wzqr2mko
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import {
  runFooterTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCommonA11yTests,
} from '../../common';

describe('Given I am on a Mundo article amp page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests();
  });
});

describe('Given I am on a Mundo article canonical page', () => {
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

describe('Given I am on a Mundo article amp/canonical page', () => {
  describe('When I am using the website', () => {
    runFooterTests({
      copyrightText:
        '© 2020 BBC. La BBC no se hace responsable del contenido de sitios externos. Lee sobre nuestra postura acerca de enlaces externos.',
      brandingLink: '/mundo',
    });
  });

  describe('When I am a search engine', () => {
    runCommonSeoTests({
      pageTitle:
        'Este artículo de prueba ha sido creado para que podamos ejecutar pruebas - BBC News Mundo',
      canonicalUrl: 'http://localhost:7080/mundo/articles/ce42wzqr2mko',
      language: 'es',
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Ir al contenido',
      headlineText: 'Este es el titular de este artículo de prueba.',
    });
  });
});
