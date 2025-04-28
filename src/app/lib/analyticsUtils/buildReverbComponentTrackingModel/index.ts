import { CLICK_EVENT, VIEW_EVENT } from '../analytics.const';
import { ComponentTrackingProps } from '../types';

export default ({
  pageIdentifier,
  producerName,
  statsDestination,
  componentName,
  campaignID,
  format,
  type,
  advertiserID,
  url,
}: ComponentTrackingProps) => {
  const eventDetails = {
    eventName: type === VIEW_EVENT ? 'sectionView' : 'sectionClick',
    eventPublisher: type === CLICK_EVENT ? 'click' : 'impression',
    componentName,
    container: campaignID,
    attribute: componentName,
    metadata: format,
    placement: pageIdentifier,
    source: advertiserID,
    result: url,
    isClick: type === CLICK_EVENT,
  };

  return {
    params: {
      page: {
        destination: statsDestination,
        name: pageIdentifier,
        producer: producerName,
        additionalProperties: {
          type: 'AT',
        },
      },
      user: {
        isSignedIn: false,
      },
    },
    eventDetails,
  };
};
