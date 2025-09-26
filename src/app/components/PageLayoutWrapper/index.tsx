/** @jsx jsx */
/* @jsxFrag React.Fragment */

import React, { PropsWithChildren, use } from 'react';
import { jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import GlobalStyles from '#psammead/psammead-styles/src/global-styles';
import { PageTypes } from '#app/models/types/global';
import useIsPWA from '#app/hooks/useIsPWA';
import { TopStoryItem } from '../../pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import WebVitals from '../../legacy/containers/WebVitals';
import HeaderContainer from '../../legacy/containers/Header';
import FooterContainer from '../../legacy/containers/Footer';
import ManifestContainer from '../../legacy/containers/Manifest';
import ServiceWorker from '../ServiceWorker';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import fontFacesLazy from '../ThemeProvider/fontFacesLazy';
import styles from './index.styles';
import { OptimoMostReadRecord, CPSMostReadRecord } from '../MostRead/types';

type ModelType = {
  blocks?: [
    {
      type: string;
      text?: string;
      model?: ModelType;
    },
  ];
  text?: string;
};

type Props = {
  pageData: {
    metadata: {
      type: PageTypes;
      topics?: { topicName: string }[];
    };
    content?: { model?: ModelType };
    secondaryColumn?: { topStories: TopStoryItem[] };
    mostRead?: { items: (OptimoMostReadRecord | CPSMostReadRecord)[] };
  };
  status: number;
};

type wordCountType = number | undefined;

const PageLayoutWrapper = ({
  children,
  pageData,
  status,
}: PropsWithChildren<Props>) => {
  const { service } = use(ServiceContext);
  const { isLite, isAmp, nonce, cspHeader } = use(RequestContext);
  const isPWA = useIsPWA();

  const isErrorPage = ![200].includes(status) || !status;
  const pageType = pageData?.metadata?.type;
  const reportingPageType = pageType?.replace(/ /g, '');
  let wordCount: wordCountType = 0;

  if (pageType === 'article') {
    wordCount = pageData?.content?.model?.blocks
      ?.filter(block => block.type === 'text')
      ?.reduce((reducer, block) => {
        const innerBlocks = block?.model?.blocks
          ?.filter(innerBlock => innerBlock.type === 'paragraph')
          .reduce((innerReducer, p) => {
            return `${innerReducer} ${p.model?.text}`;
          }, '');

        if (!innerBlocks) return reducer;
        return reducer + innerBlocks.split(' ').length;
      }, 0);
  }

  const serviceFonts = fontFacesLazy(service, isPWA);

  const fontJs =
    isLite ||
    isAmp ||
    !serviceFonts.length ||
    process.env.JEST_WORKER_ID !== undefined
      ? ''
      : `
  				if ("FileReader" in window && "Promise" in window && "fetch" in window) {
  				const fontsForStorage = ${JSON.stringify(serviceFonts)};
                const getFont = (location) => {
                	return new Promise(function (resolve, reject) {
						fetch(location).then(function (res) {
						  return res.blob()
						}).then(function (blob) {
						  if (blob && blob.constructor.name === 'Blob') {
							  var reader = new FileReader()
							  reader.addEventListener('load', function () {
								resolve(this.result)
							  })
							  reader.readAsDataURL(blob)
						  }
						}).catch(reject)
					  })
                };
                const createStyleAndAttach = (styleInnerText) => {
                    const head = document.head || document.getElementsByTagName('head')[0];
					const fontStylePlaceholder = document.createElement('style');
					fontStylePlaceholder.innerHTML = styleInnerText;
					head.appendChild(fontStylePlaceholder);
                };
                const retrieveAndStoreFont = (font, storageKey, shouldAttachStyle) => {
                	const fontLocation = font.src ? font.src : 'https://static.files.bbci.co.uk/fonts/reith/'+ font.version + (font.subsets ? '/subsets' : '') + '/' + font.name + '.woff2';
                    window.addEventListener("load", (e) => {
                    getFont(fontLocation).then((fontContents) => {
                    	const forStorage = { base64Contents: fontContents, fontFamily: font.fontFamily, fontWeight: font.fontWeight, fontVersion: font.version };
                    	localStorage.setItem(storageKey, JSON.stringify(forStorage));
                    	if (shouldAttachStyle) {
                    		const styleInnerText = '@font-face{font-family: "' + font.fontFamily + '"; font-weight: ' + font.fontWeight + ';src:url("' + fontContents + '") format("woff2");font-display: swap;}';
                    		createStyleAndAttach(styleInnerText);
                		}
                    });
                    });
                };
                fontsForStorage.forEach(font => {
                    const storageKey = 'font-' + font.name;
                    let fontContents = localStorage.getItem(storageKey);

                    if (!fontContents) {
                        retrieveAndStoreFont(font, storageKey, true);
                    }
                    else {
                    	const { base64Contents, fontFamily, fontWeight, fontVersion } = JSON.parse(fontContents);
                    	const styleInnerText = '@font-face{font-family: "' + fontFamily + '"; font-weight: ' + fontWeight + '; src:url("' + base64Contents + '") format("woff2");font-display: swap;}';
                		createStyleAndAttach(styleInnerText);
                		if (fontVersion !== font.version) {
                			retrieveAndStoreFont(font, storageKey, false);
                		}
                    }
                });
                }
                let wrappedPageTimeStart = new Date();
                let wrappedYear = wrappedPageTimeStart.getFullYear();
                let wrappedMonth = wrappedPageTimeStart.getMonth() + 1;
                let wrappedStorageKey = 'ws_bbc_wrapped';
                let wrappedContents = {};
                let topicsStorageKey = 'ws_bbc_topics';
                let topicsContents = localStorage.getItem(topicsStorageKey) || "{}";
                topicsContents = JSON.parse(topicsContents);
                wrappedContents[wrappedYear] = {
                    'byMonth': {},
                    'pageTypeCounts': {},
                    'serviceCounts': {},
                    'topicCounts': {},
                    'duration': 0,
                    'wordCount': 0,
                };
                wrappedContents[wrappedYear].byMonth[wrappedMonth] = 0;
                let saveWrapped = () => {
                    localStorage.setItem(wrappedStorageKey, JSON.stringify(wrappedContents));
                }
                let wrappedLocalStorageContents = localStorage.getItem(wrappedStorageKey);
                if (wrappedLocalStorageContents) {
                    const wrappedLocalStorageContentsParsed = JSON.parse(wrappedLocalStorageContents);
                    if (wrappedLocalStorageContentsParsed.hasOwnProperty(wrappedYear)) {
                        wrappedContents[wrappedYear] = wrappedLocalStorageContentsParsed[wrappedYear] || wrappedContents[wrappedYear];
                        wrappedContents[wrappedYear].byMonth[wrappedMonth] = wrappedLocalStorageContentsParsed[wrappedYear].byMonth[wrappedMonth] || 0;
                    }
                }
                let wrappedContentsShortcut = wrappedContents[wrappedYear];
                let wrappedTopics = ${JSON.stringify(
                  pageData?.metadata?.topics,
                )};
                if (wrappedTopics) {
                    wrappedTopics.forEach(({ topicName, topicId }) => {
                        if (!topicsContents.${service}) topicsContents.${service} = {};
                        if (topicsContents.${service}[topicName]) {
                            topicsContents.${service}[topicName].count++;
                        }
                        else {
                            topicsContents.${service}[topicName] = {
                                'count': 1,
                                'id': topicId,
                                'path': "/${service}/topics/" + topicId
                            };
                        }
                        wrappedContentsShortcut.topicCounts[topicName] = wrappedContentsShortcut.topicCounts[topicName] ? wrappedContentsShortcut.topicCounts[topicName] + 1 : 1;
                    });
                }
                document.onvisibilitychange = () => {
                  if (document.visibilityState === "hidden") {
                    const wrappedTimeNow = new Date();
                    const wrappedDifference = wrappedTimeNow - wrappedPageTimeStart;
                    wrappedContentsShortcut.duration = wrappedContentsShortcut.duration ? wrappedContentsShortcut.duration + wrappedDifference : wrappedDifference;
                    saveWrapped();
                  }
                  else {
                    wrappedPageTimeStart = new Date();
                  }
                };
                wrappedContentsShortcut.wordCount = wrappedContentsShortcut.wordCount + ${wordCount};
                wrappedContentsShortcut.serviceCounts.${service} = wrappedContentsShortcut.serviceCounts.${service} ? wrappedContentsShortcut.serviceCounts.${service} + 1 : 1;
                wrappedContentsShortcut.pageTypeCounts.${reportingPageType} = wrappedContentsShortcut.pageTypeCounts.${reportingPageType} ? wrappedContentsShortcut.pageTypeCounts.${reportingPageType} + 1 : 1;
                wrappedContentsShortcut.byMonth[wrappedMonth] = wrappedContentsShortcut.byMonth[wrappedMonth] ? wrappedContentsShortcut.byMonth[wrappedMonth] + 1 : 1;
                wrappedContents[wrappedYear] = wrappedContentsShortcut;
                localStorage.setItem(topicsStorageKey, JSON.stringify(topicsContents));
    `;

  return (
    <>
      <Helmet
        script={[
          {
            type: 'text/javascript',
            // WIP: TBC
            innerHTML: `
                (function() {
                  if (window.__bbcScriptLoaded) return;
                  window.__bbcScriptLoaded = true;                  
                  ${fontJs}
                })();
            `,
            nonce: nonce ?? undefined,
          },
        ]}
      />

      <Helmet>
        {nonce && (
          <meta
            httpEquiv="Content-Security-Policy"
            content={cspHeader?.replace(
              ';style-src',
              ` 'unsafe-eval' a.ad216.com a.teads.tv a.videoreach.com abs.proxistore.com ac.realvu.net ad-tag.inner-active.mobi ad.afy11.net ad.as.amanad.adtdp.com ad.doublemax.net ad.mail.ru ad.nvivo.tv ad.sara.media ad.yieldlab.net ad2.apx.appier.net ad4game.com adapter.valueimpression.com ade.clmbtech.com adhese.com adn.admixer.co.kr adn.plxnt.com adnxs.com adocean.pl ads-tr.bigmining.com ads.danmarketplace.com ads.gx1as.com ads.lemmatechnologies.com ads.lfstmedia.com ads.playground.xyz ads.project-limelight.com ads.rekmob.com ads.servenobid.com ads.smartstream.tv ads.stickyadstv.com ads.tremorhub.com ads.us.e-planning.net ads04.tapsense.com ads4.admatic.com.tr adserver-us.adtech.advertising.com adserver.com adtarbostg.eywamedia.com adtech.advertising.com adtech.de adtechjp.com adtechus.com adx.adform.net adxcg.net aerserv.com agent.aralego.com amazon-adsystem.com an.facebook.com api-test.scaleout.jp api.adsnative.com api.advertly.com api.feedad.com api.outcondigital.com api.publishers.adlive.io app.readpeak.com as.innity.com as.vt.open8.com atemda.com b.admedia.com b.imonomy.com b.nativendo.de b.pubgears.com banner.hpmdnetwork.ru banner.vrtzads.com bid.contextweb.com bid.cosmoshq.com bid.essrtb.com bid.glass bid.rxrtb.bid bid.videostep.com bid.yieldmo.com bid306.rtbsrv.com bidder-api-us-east.tribeos.io bidder.7xbid.com bidder.ablida.net bidder.cleanmediaads.com bidder.criteo.com bidder.komoona.com bidder.mamrtb.com bidder.mediams.mb.softbank.jp bidder.rtk.io bidder.springserve.com bidder.videonow.ru bidding.rtbdemand.com bidfluence.azureedge.net bidtor.admanmedia.com brainlyads.com brand-server.com brightcombid.marphezis.com bs1.showheroes.com btlr.sharethrough.com buyer.dspx.tv c.deployads.com casalemedia.com cdn-cf.justpremium.com cdn.adhigh.net cdn.stickyadstv.com cdn.thoughtleadr.com colossusssp.com connect.interactiveoffers.com connected-by.connectad.io cpm.metaadserving.com creativecdn.com criteo.com d.admp.io d.adroll.com d.audiencerun.com d.socdm.com delivery.adnuntius.com delivery.clickonometrics.pl demo.reviveadservermod.com dmx.districtm.io doubleclick.net ds.uncn.jp dsp-eu-lb.rtbsolutions.pro dsp-staging.adkernel.com dsp.adotmob.com dsp.bnmla.com dsp.mgid.com dsp.xapads.com e-planning.net e.serverbid.com elb.the-ozone-project.com engine.4dsply.com engine.adglare.net engine.widespace.com exchange.bidphysics.com exchange.buzzoola.com g2.gumgum.com ghb.sync.viewdeos.com gjc.gjirafa.com global.qc.rtb.quantserve.com gov.aniview.com grid.bidswitch.net h.cedatoplayer.com hb-api.omnitagjs.com hb-rtb.ktdpublishers.com hb.1ad4good.org hb.adingo.jp hb.adtelligent.com hb.carambo.la hb.emxdgt.com hb.gammaplatform.com hb.kumma.com hb.pubnxserv.com hb.sekindo.com hb.timmedia-hb.com hb.undertone.com hbe198.hybrid.ai ht-integration.c1exchange.com ht.c1exchange.com huddledmassessupply.com ib.adnxs.com ice.360yield.com in-appadvertising.com inv-nets.admixer.net js.adx1.com krk.kargo.com lijit.com loopme.me lwadm.com mantodea.mantisadnetwork.com media.adfrontiers.com media.msg.dotomi.com mfad.inskinad.com mg-bid.optimatic.com mobile.mng-ads.com money.dailyhunt.in my.mobfox.com n1test.adspirit.de nafdigitalbidder.com nep.advangelists.com onetag-sys.com openx.net orbidder.otto.de p.ato.mx papi.mynativeplatform.com pb.ladsp.com pb.vi-serve.com pbd.bids.iqm.com pbjs.sskzlabs.com pixel.adsafeprotected.com player.mediabong.net pool.fair-trademedia.com pool.supply2.com prebid-bidder.rutarget.ru prebid.adilligo.com prebid.adnxs.com prebid.bksn.se prebid.byplay.net prebid.cliipa.com prebid.datablocks.net prebid.deepintent.com prebid.districtm.ca prebid.emoteev.io prebid.media.net prebid.mobsmart.net prebid.papyrus.global prebid.smilewanted.com prebid.technoratimedia.com prebid.vdo.ai prebid.xendiz.com predict.vmg.nyc prmbdr.featureforward.com proparm.co.jp publisher-east.mobileadtrading.com publishers.motionspots.com pubmatic.com pubs.smrtb.com r.rxthdr.com rads.recognified.net reachms.bfmio.com rec.scupio.com reload.net request.czilladx.com revsci.net rex.adequant.com rtb-filter.meazy.co rtb.adblade.com rtb.adpone.com rtb.d.adup-tech.com rtb.gambid.io rtb.mfadsrvr.com rtb.t.c4tw.net rtb.vertamedia.com rtb.vrtcal.com rtb2.automatad.com rubiconproject.com s-bid.rmp.rakuten.co.jp s-rtb-pb.send.microad.jp s.komoona.com s.seedtag.com s.sspqns.com s3.amazonaws.com sb.freeskreen.com search.spotxchange.com serve.connectignite.com servedbyadbutler.com servedbyopenx.com server.cpmstar.com server.nginad.com service.bidlab.ai service.e-volution.ai service.trafficroots.com shb.richaudience.com show.oneplanetonly.com smartadserver.com sofia.trustx.org sonobi.com ssc.33across.com ssp-nj.webtradehub.com ssp.advenuemedia.co.uk ssp.astraone.io ssp.lkqd.net ssp.otm-r.com ssp.programattik.com ssp.theadx.com ssp.toprtb.com ssp.ynxs.io stat.adfinity.pro static.adserver.pm stinger.memeglobal.com supply.decenterads.com t.visx.net tag.1rx.io tag.adkernel.com targeting.unrulymedia.com tas.rockyou.net tech.convergd.com thor.rtk.io tlx.3lift.com tmp.audiencemanager.de trends.revcontent.com udmserve.net us-central1-taphype-internal.cloudfunctions.net us-east-engine.adbund.xyz us-west-engine.adbund.xyz us-west.solortb.com web.hb.ad.cpe.dotomi.com windtalkerdisplay.hb.adp3.net www.clicktripz.com x.fidelity-media.com x.padsquad.com x.yieldlift.com y.one.impact-ad.jp yldbt.com z2.zedo.com zqtk.net ;style-src`,
            )}
          />
        )}
      </Helmet>
      <ServiceWorker />
      <ManifestContainer />
      {!isErrorPage && <WebVitals pageType={pageType} />}
      <GlobalStyles />
      <div id="main-wrapper" css={styles.wrapper}>
        <HeaderContainer
          propsForTopBarOJComponent={{
            blocks: pageData?.secondaryColumn?.topStories || [],
          }}
        />
        <div css={styles.content}>{children}</div>
        <FooterContainer />
      </div>
    </>
  );
};

export default PageLayoutWrapper;
