import React from 'react';
import { storiesOf } from '@storybook/react';
import featureIndexDataAfrique from '#data/afrique/cpsAssets/48465371';
import addIdsToItems from '#lib/utilities/preprocessor/rules/addIdsToItems';
import filterUnknownContentTypes from '#lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '#lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '#lib/utilities/preprocessor/rules/topstories';
import preprocess from '#lib/utilities/preprocessor';
import FeatureIndex from '.';
import WithTimeMachine from '#testHelpers/withTimeMachine';

const preprocessorRules = [
  filterUnknownContentTypes,
  addIdsToItems,
  filterEmptyGroupItems,
  applySquashTopstories,
];

const serviceDatasets = {
  afrique: featureIndexDataAfrique,
};

const stories = storiesOf('Pages|FeatureIndex', module).addDecorator(story => (
  <WithTimeMachine>{story()}</WithTimeMachine>
));

Object.keys(serviceDatasets).forEach(service => {
  stories.add(service, () => {
    const featureIndexData = preprocess(
      serviceDatasets[service],
      preprocessorRules,
    );

    const status = 200;

    return (
      <FeatureIndex
        pageData={featureIndexData}
        status={status}
        service={service}
        isAmp={false}
        loading={false}
        error={null}
        pageType="FIX"
      />
    );
  });
});
