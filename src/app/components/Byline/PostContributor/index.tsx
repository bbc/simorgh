/* eslint-disable jsx-a11y/aria-role */
import { use } from 'react';
import { ServiceContext } from '../../../contexts/ServiceContext';
import BylineCss from './index.styles';
import Text from '../../Text';
import Image from '../../Image';
import VisuallyHiddenText from '../../VisuallyHiddenText';

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
              <li css={[BylineCss.imageWrapper]}>
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
                authorImage && BylineCss.nameAlignEnd,
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
