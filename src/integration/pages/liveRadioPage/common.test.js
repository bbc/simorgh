import {
  // runFooterTests,
  runCommonSeoTests,
  runCommonA11yTests,
} from '../../common';

export default ({ pageUrl, jsonData, serviceConfig }) => {
  runCommonSeoTests({
    pageUrl,
    pageTitle: `${jsonData.promo.name} - ${serviceConfig.brandName}`,
  });

  // getTextBySpecial not currently working :(
  // runFooterTests({
  //   pageUrl,
  //   copyrightText: serviceConfig.footer.copyrightText,
  //   brandingText: serviceConfig.serviceLocalizedName,
  //   brandingLink: `/${serviceConfig.service}`,
  // });

  runCommonA11yTests({ pageUrl });
};
