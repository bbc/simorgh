/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { use } from 'react';
import path from 'ramda/src/path';
import filterForBlockType from '#lib/utilities/blockHandlers';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import LiveLabel from '../../LiveLabel';
import { ServiceContext } from '../../../contexts/ServiceContext';

const Promo = ({ block, experimentVariant, clickTracker }) => {
  const { script, service, serviceDatetimeLocale } = use(ServiceContext);
  let title;
  let href;
  let textBlock;
  let aresLinkBlock;
  let timestamp;
  let isLive;

  switch (experimentVariant) {
    case 'top-bar-top-stories':
    case 'read-more-a-and-top-stories': {
      const overtypedHeadline = block?.headlines?.overtyped ?? '';
      const mainHeadline = block?.headlines?.headline ?? '';
      const headlineBlockText =
        block?.headlines?.promoHeadline?.blocks?.[0]?.model?.blocks?.[0]?.model
          ?.text ?? '';
      const name = block?.name ?? '';

      title =
        overtypedHeadline ||
        mainHeadline ||
        headlineBlockText ||
        name ||
        block.headline ||
        '';

      const canonicalUrl = block?.locators?.canonicalUrl ?? '';
      const assetUri = block?.locators?.assetUri ?? '';
      const uri = block?.uri ?? '';

      href =
        canonicalUrl ||
        assetUri ||
        uri ||
        (block.destinationUrl
          ? `https://www.bbc.com${block.destinationUrl}`
          : '');
      isLive = block.isLive;
      break;
    }
    default:
      textBlock = filterForBlockType(block?.model?.blocks || {}, 'text');
      aresLinkBlock = filterForBlockType(
        block?.model?.blocks || {},
        'aresLink',
      );
      timestamp = path(
        ['model', 'blocks', '0', 'model', 'timestamp'],
        aresLinkBlock,
      );
      href =
        path(
          ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'locator'],
          textBlock,
        ) || '';
      title =
        path(
          ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
          textBlock,
        ) || '';
      break;
  }

  const isOperaMini = useOperaMiniDetection();

  const WrapperPromoBox = isOperaMini ? OperaPromoBox : PromoBox;

  return (
    <WrapperPromoBox experimentVariant={experimentVariant}>
      <StyledLink
        href={href}
        service={service}
        script={script}
        {...clickTracker}
        experimentVariant={experimentVariant}
      >
        {isLive && <LiveLabel />}
        {title}
      </StyledLink>
      {timestamp && !experimentVariant && (
        <TimeStamp
          serviceDatetimeLocale={serviceDatetimeLocale}
          data-testid="timestamp"
        >
          {timestamp}
        </TimeStamp>
      )}
    </WrapperPromoBox>
  );
};

export default Promo;
