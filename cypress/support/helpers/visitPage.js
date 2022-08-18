export default (path, pageType) => {
  const expectedContentType = 'text/html';
  const isErrorPage = pageType.includes('error');
  const expectedStatus = isErrorPage ? 404 : 200;
  const failOnStatusCode = !isErrorPage;

  cy.testResponseCodeAndType({
    path,
    responseCode: expectedStatus,
    type: expectedContentType,
  });

  // cy.intercept('https://gn-flagpoles.api.bbci.co.uk/ngas', {
  //   fixture: 'flagpoles/ngas.json',
  // });
  // cy.intercept('https://gn-flagpoles.test.api.bbci.co.uk/ngas', {
  //   fixture: 'flagpoles/ngas.json',
  // });

  // This sets a cookie to stop the CMP consent pop up from appearing when the tests
  // are run in Europe - causing test failures due to the overlay blocking elements
  // This could be brittle as it is Google's cookie format which we can't control
  cy.setCookie(
    'FCCDCF',
    '[["AKsRol_BwEkc3ASfKEKVPeyMAwqICoHzH8NxlVr-Hh0TPFtwU_P6z2pKf8yvnOIlbfkSr5BGpCtal_EyIbeetCsHtGMU9lNGJaJ06kps2FHaY4c62aUnvarsjK7MIWPNR3bVUyNhZyUjTDIlWjH0mn-itSG_3MABGA=="],null,["[[],[],[],[],null,null,true]",1620291054220],["CPFxK7bPFxK7bEsABBENBYCoAP_AAE_AAAwIGWQHgAFAAMAAqABwAEAAKgAZAA0gCIAIsATABPAC-AIEAQgAlABLACkAHsATQAnYBSIC0ALSAXUA4gB-wFkALeAXmAvcBjIDLAMsgIgAVAA4ACAAGkARABFACYAE8AL4AhABLAD2AJ3AWgBaQC6gHEAXmAywAAA","1~1843.202.780.2325.1127.505","B6F8AF01-4E2B-4982-98CF-BC6EA8B00241"],null]',
  );

  cy.visit(path, {
    failOnStatusCode,
  });
};
