import buildReverbComponentTrackingModel from '.';

describe('buildReverbComponentTrackingModel', () => {
  const input = {
    pageIdentifier: 'mundo.page',
    producerName: 'MUNDO',
    statsDestination: 'statsDestination',
    componentName: 'top-stories',
    campaignID: '1234',
    format: 'format',
    type: 'view',
    advertiserID: 'advertiserID',
    url: 'http://localhost',
  };

  it('should return the correct Reverb component view tracking model', () => {
    const reverbComponentTrackingModel =
      buildReverbComponentTrackingModel(input);

    const pageParams = {
      destination: 'statsDestination',
      name: 'mundo.page',
      producer: 'MUNDO',
      additionalProperties: {
        type: 'AT',
      },
    };

    expect(reverbComponentTrackingModel.params.page).toEqual(pageParams);
  });

  it('should return the correct event details for the Reverb component view tracking model', () => {
    const reverbComponentViewTrackingModel =
      buildReverbComponentTrackingModel(input);

    expect(reverbComponentViewTrackingModel.eventDetails).toEqual({
      eventName: 'sectionView',
      eventPublisher: 'impression',
      componentName: 'top-stories',
      container: '1234',
      attribute: 'top-stories',
      metadata: 'format',
      placement: 'mundo.page',
      source: 'advertiserID',
      result: 'http://localhost',
      isClick: false,
    });
  });

  it('should return the correct Reverb component click tracking model', () => {
    const reverbComponentClickTrackingModel = buildReverbComponentTrackingModel(
      {
        ...input,
        type: 'click',
      },
    );

    const pageParams = {
      destination: 'statsDestination',
      name: 'mundo.page',
      producer: 'MUNDO',
      additionalProperties: {
        type: 'AT',
      },
    };

    expect(reverbComponentClickTrackingModel.params.page).toEqual(pageParams);
  });

  it('should return the correct event details for the Reverb component click tracking model', () => {
    const reverbComponentClickTrackingModel = buildReverbComponentTrackingModel(
      {
        ...input,
        type: 'click',
      },
    );

    expect(reverbComponentClickTrackingModel.eventDetails).toEqual({
      eventName: 'sectionClick',
      eventPublisher: 'click',
      componentName: 'top-stories',
      container: '1234',
      attribute: 'top-stories',
      metadata: 'format',
      placement: 'mundo.page',
      source: 'advertiserID',
      result: 'http://localhost',
      isClick: true,
    });
  });

  it('should return the correct Reverb user object configuration', () => {
    const reverbComponentTrackingModel =
      buildReverbComponentTrackingModel(input);

    expect(reverbComponentTrackingModel.params.user).toEqual({
      isSignedIn: false,
    });
  });
});
