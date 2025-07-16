import React, { use, PropsWithChildren } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import { GridItemLarge } from '../../legacy/components/Grid';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import useToggle from '../../hooks/useToggle';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import Text from '../Text';
import InlineLink from '../InlineLink';

type Props = {
  increasePaddingOnDesktop?: boolean;
};

interface Disclaimer {
  text: string;
  url: string;
  isExternal: boolean;
}

const DisclaimerComponent = ({
  increasePaddingOnDesktop,
}: PropsWithChildren<Props>) => {
  const { disclaimer, translations } = use(ServiceContext);
  const { pageType } = use(RequestContext);
  const { enabled } = useToggle('disclaimer');

  const shouldShow = enabled && disclaimer && !isEmpty(disclaimer);

  if (!shouldShow) return null;

  const infoBannerLabelTranslation =
    translations?.infoBannerLabel || 'Information';

  const bannerClasses = `p-0 ${increasePaddingOnDesktop ? 'group-4:px-quintuple' : ''}`;
  const innerClasses = `bg-grey-3 block text-grey-10 mb-triple p-double border-[0.1875rem] border-transparent leading-[1.4] group-3-max:leading-[1.4] group-4:mb-quadruple ${pageType === ARTICLE_PAGE ? 'mt-full group-4:mt-double' : ''}`;

  return (
    <GridItemLarge>
      <section
        className={bannerClasses}
        role="region"
        aria-label={infoBannerLabelTranslation}
      >
        <Text
          className={innerClasses}
          size="longPrimer"
          fontVariant="sansRegular"
          as="strong"
        >
          {disclaimer &&
            Object.values(disclaimer).map(para => {
              const linkText: string = (para as Disclaimer).text;
              const linkUrl: string = (para as Disclaimer).url;
              return linkUrl ? (
                <InlineLink
                  className="text-grey-10 border-b border-grey-10 visited:text-grey-6 visited:border-grey-6 hover:border-b-2 hover:border-postbox hover:text-postbox focus:border-b-2 focus:border-postbox focus:text-postbox focusIndicatorReducedWidth"
                  key={linkText}
                  text={linkText}
                  to={linkUrl}
                />
              ) : (
                (para as string)
              );
            })}
        </Text>
      </section>
    </GridItemLarge>
  );
};

export default DisclaimerComponent;
