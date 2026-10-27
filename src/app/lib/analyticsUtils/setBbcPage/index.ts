import {
  ReverbPageVars,
  ReverbUserVars,
  ReverbBeaconConfig,
} from '#app/components/ATIAnalytics/types';

type BBCPageParams = ReverbBeaconConfig['params'];

export type BBCPage = {
  getName: Promise<string | null | undefined>;
  getLanguage: Promise<string | null | undefined>;
  getDestination: Promise<string | null | undefined>;
  getProducer: Promise<string | null | undefined>;
  getSection: Promise<string>;
  getContentId: Promise<string | null | undefined>;
  getContentType: Promise<string | null | undefined>;
  getEdition: Promise<string>;
  getReferrer: Promise<string>;
  getAdditionalProperties: Promise<
    ReverbPageVars['additionalProperties'] | undefined
  >;
  additionalProperties: object;
};

export type BBCUser = {
  getHashedId: () => Promise<string | null>;
  isSignedIn: () => Promise<boolean>;
  isPersonalisationOn: () => Promise<boolean>;
};

const setReverbPageValues = async ({
  pageVars,
  userVars,
}: {
  pageVars: ReverbPageVars;
  userVars: ReverbUserVars;
}) => {
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
    isPersonalisationOn: () =>
      Promise.resolve(userVars.isPersonalisationOn ?? false),
  };
};

export default ({ page, user }: BBCPageParams) => {
  setReverbPageValues({ pageVars: page, userVars: user });
};
