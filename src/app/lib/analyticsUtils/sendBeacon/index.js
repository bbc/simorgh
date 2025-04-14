import onClient from '../../utilities/onClient';
import nodeLogger from '../../logger.node';
import { ATI_LOGGING_ERROR } from '../../logger.const';

const logger = nodeLogger(__filename);

const setReverbPageValues = async ({ pageVars, userVars }) => {
  window.bbcpage = {};

  window.bbcpage = Object.assign(window.bbcpage, {
    getName() {
      return Promise.resolve(pageVars.name);
    },
    getLanguage() {
      return Promise.resolve(pageVars.additionalProperties.content_language);
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
    getHashedId: () => null,
    isSignedIn: () => Promise.resolve(userVars.isSignedIn),
  };
};

const reverbPageViews = async ({ reverbInstance }) => {
  reverbInstance.viewEvent();
};

const reverbComponentTracking = async ({ reverbInstance, eventDetails }) => {
  const {
    eventPublisher,
    componentName,
    container,
    attribute,
    placement,
    source,
    result,
    anchorElement,
    originalEvent,
    isClick,
  } = eventDetails;

  return reverbInstance.userActionEvent(
    eventPublisher,
    componentName,
    { container, attribute, placement, source, result },
    anchorElement,
    originalEvent,
    isClick,
  );
};

const reverbHandlers = {
  pageView: reverbPageViews,
  sectionView: reverbComponentTracking,
  sectionClick: reverbComponentTracking,
};

const callReverb = async eventDetails => {
  const { eventName } = eventDetails;

  // eslint-disable-next-line no-underscore-dangle
  window.__reverb.__reverbLoadedPromise.then(
    async reverb => {
      if (reverb.isReady()) {
        await reverbHandlers[eventName]({
          reverbInstance: reverb,
          eventDetails,
        });
        return;
      }

      reverb.initialise().then(async () => {
        await reverbHandlers[eventName]({
          reverbInstance: reverb,
          eventDetails,
        });
      });
    },
    () => {
      logger.error(ATI_LOGGING_ERROR, {
        error: 'Failed to load reverb. No event sent',
      });
    },
  );
};

const sendBeacon = async (url, reverbBeaconConfig) => {
  if (onClient()) {
    try {
      if (reverbBeaconConfig) {
        const {
          params: { page, user },
          eventDetails,
        } = reverbBeaconConfig;

        await setReverbPageValues({ pageVars: page, userVars: user });

        await callReverb(eventDetails);
      } else {
        await fetch(url, { credentials: 'include' }).then(res => res.text());
      }
    } catch (error) {
      logger.error(ATI_LOGGING_ERROR, {
        error,
      });
    }
  }
};

export default sendBeacon;
