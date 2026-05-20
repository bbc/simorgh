// biome-ignore-all lint/a11y/useValidAriaRole: we want this
import { use } from 'react';

import { ServiceContext } from '../../../contexts/ServiceContext';
import Image from '../../Image';
import Text from '../../Text';
import VisuallyHiddenText from '../../VisuallyHiddenText';
import BylineCss from './index.styles';

const Contributors = ({ contributorValues }) => {
  const { translations } = use(ServiceContext);

  const { byline: { author = 'Author', role = 'Role' } = {} } =
    translations ?? {};

  return (
    <>
      {contributorValues.map(contributor => {
        if (!contributor) return null;

        const { authorName, jobRole, authorImage } = contributor;

        return (
          <ul
            css={[BylineCss.list, authorImage && BylineCss.listWithImage]}
            role="list"
            key={authorName}
          >
            {authorImage && (
              <li
                css={[
                  BylineCss.imageWrapper,
                  jobRole
                    ? BylineCss.imageWithNameAndRole
                    : BylineCss.imageWithNameOnly,
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
            <li
              css={[
                BylineCss.contributorTextWrapper,
                jobRole ? BylineCss.nameAlignEnd : BylineCss.nameAlignCenter,
              ]}
            >
              <span role="text">
                <VisuallyHiddenText>{`${author}, `}</VisuallyHiddenText>
                <Text
                  css={[BylineCss.author]}
                  fontVariant="sansBold"
                  size="bodyCopy"
                >
                  {authorName}
                </Text>
              </span>
            </li>
            {jobRole && (
              <li
                css={[
                  BylineCss.contributorTextWrapper,
                  authorImage && BylineCss.roleAlignStart,
                ]}
              >
                <span role="text">
                  <VisuallyHiddenText>{`${role}, `} </VisuallyHiddenText>
                  <Text css={BylineCss.jobRole} size="brevier">
                    {jobRole}
                  </Text>
                </span>
              </li>
            )}
          </ul>
        );
      })}
    </>
  );
};

export default Contributors;
