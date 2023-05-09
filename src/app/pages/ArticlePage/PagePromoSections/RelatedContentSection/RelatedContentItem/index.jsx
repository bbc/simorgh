import React, { useContext, forwardRef } from 'react';
import { shape, string } from 'prop-types';
import path from 'ramda/src/path';
import { createSrcsets } from '#lib/utilities/srcSet';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import Promo from '#components/OptimoPromos';
import isEmpty from 'ramda/src/isEmpty';
import { ServiceContext } from '../../../../../contexts/ServiceContext';
import { RequestContext } from '../../../../../contexts/RequestContext';
import {
  TitleWithContent,
  StyledRelatedContentWrapper,
  StyledRelatedContentWrapperAmp,
} from './index.styles';

const RelatedContentItem = forwardRef(
  ({ item, ariaLabelledBy, eventTrackingData }, viewRef) => {
    const { script, service } = useContext(ServiceContext);
    const { isAmp } = useContext(RequestContext);

    if (!item || isEmpty(item)) return null;

    const headline = path(
      ['model', 'blocks', 1, 'model', 'blocks', 0, 'model', 'text'],
      item,
    );

    const headlineAmp = path(
      ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
      item,
    );

    const assetUri = path(
      [
        'model',
        'blocks',
        1,
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'locator',
      ],
      item,
    );
    const assetUriAmp = path(
      [
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'locator',
      ],
      item,
    );

    const DEFAULT_IMAGE_RES = 660;
    const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
    const locator = path(
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'locator'],
      item,
    );

    const originCode = path(
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'originCode'],
      item,
    );
    const altText = path(
      [
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'text',
      ],
      item,
    );

    const width = path(
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'width'],
      item,
    );

    const height = path(
      ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'height'],
      item,
    );

    const { primarySrcset, fallbackSrcset } = createSrcsets({
      originCode,
      locator,
      originalImageWidth: width,
      imageResolutions,
    });

    const src = buildIChefURL({
      originCode,
      locator,
      resolution: DEFAULT_IMAGE_RES,
    });

    const timestamp = path(
      ['model', 'blocks', 2, 'model', 'blocks', 0, 'model', 'timestamp'],
      item,
    );

    const titleTag = timestamp ? 'h3' : 'div';

    const titleHasContent = titleTag === 'h3';

    const Title = titleHasContent ? TitleWithContent : Promo.Title;

    let Wrapper;
    let uri;
    if (isAmp && service === 'naidheachdan') {
      Wrapper = StyledRelatedContentWrapperAmp;
      uri = assetUriAmp;
    } else {
      Wrapper = StyledRelatedContentWrapper;
      uri = assetUri;
    }

    return (
      <Wrapper ref={viewRef}>
        <Promo
          to={uri}
          ariaLabelledBy={ariaLabelledBy}
          eventTrackingData={eventTrackingData}
        >
          {locator ? (
            <Promo.Image
              isAmp={isAmp}
              src={src}
              altText={altText}
              srcset={primarySrcset}
              fallbackSrcset={fallbackSrcset}
              width={width}
              height={height}
            />
          ) : null}
          <Promo.ContentWrapper>
            <Title as={titleTag} script={script}>
              <Promo.Link>
                <Promo.Content
                  headline={
                    isAmp && service === 'naidheachdan' ? headlineAmp : headline
                  }
                />
              </Promo.Link>
            </Title>
            <Promo.Timestamp>{timestamp}</Promo.Timestamp>
          </Promo.ContentWrapper>
        </Promo>
      </Wrapper>
    );
  },
);

RelatedContentItem.propTypes = {
  item: shape({}).isRequired,
  ariaLabelledBy: string.isRequired,
  eventTrackingData: shape({ block: shape({ componentName: string }) }),
};

RelatedContentItem.defaultProps = { eventTrackingData: null };

export default RelatedContentItem;
