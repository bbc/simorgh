import {
  ATIProps,
  ReverbPageVars,
  ReverbUserVars,
} from '#app/components/ATIAnalytics/types';
import buildReverbParams from '#app/components/ATIAnalytics/params';

type SetBBCPageParams = {
  atiData: ATIProps;
  requestContext: Parameters<typeof buildReverbParams>[0]['requestContext'];
  serviceContext: Parameters<typeof buildReverbParams>[0]['serviceContext'];
  accountContext: Parameters<typeof buildReverbParams>[0]['accountContext'];
};

const setReverbPageValues = async ({
  pageVars,
  userVars,
}: {
  pageVars: ReverbPageVars;
  userVars: ReverbUserVars;
}) => {
  console.log('&&&&&&&&&&&&&&&&&&&&&');
  console.log('I GET HERE');
  console.log('+++++++++++++++++++++');
  console.log('pageVars - ', pageVars);
  console.log('userVars - ', userVars);
  console.log('&&&&&&&&&&&&&&&&&&&&&');

  window.bbcpage = {};

  window.bbcpage = Object.assign(window.bbcpage, {
    getName() {
      return Promise.resolve(pageVars.name);
    },
    getLanguage() {
      return Promise.resolve(pageVars?.additionalProperties?.content_language);
    },
    getDestination() {
      return Promise.resolve(pageVars.destination);
    },
    getProducer() {
      return Promise.resolve(pageVars.producer);
    },
    getSection() {
      return Promise.resolve('');
    },
    getContentId() {
      return Promise.resolve(pageVars.contentId);
    },
    getContentType() {
      return Promise.resolve(pageVars.contentType);
    },
    getEdition() {
      return Promise.resolve('');
    },
    getReferrer() {
      return Promise.resolve('');
    },
    getAdditionalProperties() {
      return Promise.resolve(pageVars.additionalProperties);
    },
    additionalProperties: {
      testDomain: 'local.ati-host.net',
      trace: '',
      customVars: '',
    },
  });

  window.bbcuser = {
    getHashedId: () => Promise.resolve(userVars.hashedId ?? null),
    isSignedIn: () => Promise.resolve(userVars.isSignedIn),
  };
};

export default ({
  atiData = {},
  requestContext,
  serviceContext,
  accountContext,
}: SetBBCPageParams) => {
  const { isSignedIn, hashedUserId: hashedId } = accountContext;

  const reverbParams = buildReverbParams({
    requestContext,
    serviceContext,
    atiData,
    isSignedIn,
    hashedId,
  });

  const {
    params: { page, user },
  } = reverbParams;

  setReverbPageValues({ pageVars: page, userVars: user });
};
