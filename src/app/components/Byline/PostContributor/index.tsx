/* eslint-disable jsx-a11y/aria-role */
import { use } from 'react';
import { ServiceContext } from '../../../contexts/ServiceContext';
import BylineCss from './index.styles';
import Text from '../../Text';
import Image from '../../Image';
import VisuallyHiddenText from '../../VisuallyHiddenText';

const Contributors = ({ contributorValues, isSingleContributor }) => {
  const { translations, dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';

  const { byline: { author = 'Author', role = 'Role' } = {} } =
    translations ?? {};

  return (
    <>
      {contributorValues.map(contributor => {
        if (!contributor) return null;

        const { authorName, jobRole, authorImage } = contributor;

        return (
          <ul
            css={[BylineCss.list, BylineCss.displayFlex]}
            role="list"
            key={authorName}
          >
            {authorImage && (
              <li
                css={[
                  BylineCss.ImageWrapper,
                  isRtl ? BylineCss.imageRtl : BylineCss.imageLtr,
                ]}
              >
                <Image
                  css={BylineCss.imageSrc}
                  src={authorImage}
                  alt=""
                  placeholder={false}
                  aspectRatio={[1, 1]}
                />
              </li>
            )}
            <li css={BylineCss.displayInline}>
              <span role="text" css={BylineCss.displayBlock}>
                <VisuallyHiddenText>{`${author}, `}</VisuallyHiddenText>
                <Text
                  css={[
                    BylineCss.author,
                    isSingleContributor && BylineCss.authorSingleContributor,
                  ]}
                  fontVariant="sansBold"
                  size="bodyCopy"
                >
                  {authorName}
                </Text>
              </span>
              <span role="text" css={BylineCss.displayBlock}>
                <VisuallyHiddenText>{`${role}, `} </VisuallyHiddenText>
                <Text
                  css={BylineCss.jobRole}
                  {...(isSingleContributor
                    ? { size: 'brevier' }
                    : { size: 'bodyCopy' })}
                >
                  {jobRole}
                </Text>
              </span>
            </li>
          </ul>
        );
      })}
    </>
  );
};

export default Contributors;
