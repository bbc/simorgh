/* eslint-disable jsx-a11y/aria-role */
import { Children, use, PropsWithChildren } from 'react';
import { OptimoBylineBlock } from '#app/models/types/optimo';
import { ServiceContext } from '../../contexts/ServiceContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import BylineCss from './index.styles';
import { RightChevron, LeftChevron } from '../icons';
import Text from '../Text';
import Image from '../Image';
import bylineExtractor from './utilities/bylineExtractor';

const Comma = () => {
  return (
    <span aria-hidden="true" css={BylineCss.comma}>
      ,{' '}
    </span>
  );
};

const Contributors = ({ contributorValues, isSingleContributor }) => {
  const { translations, dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';

  const {
    byline: {
      author = 'Author',
      reportingFrom = 'Reporting from',
      role = 'Role',
    } = {},
  } = translations ?? {};

  const hasMultipleContributors = !isSingleContributor;

  const lastContributorIndex = contributorValues.length - 1;

  return (
    <>
      {contributorValues.map((contributor, index) => {
        if (!contributor) return null;

        const { authorName, jobRole, authorImage, location, authorTopicUrl } =
          contributor;

        return (
          <ul
            css={[
              BylineCss.list,
              hasMultipleContributors && BylineCss.displayInline,
            ]}
            role="list"
            key={authorName}
          >
            {authorImage && isSingleContributor && (
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
            <li css={hasMultipleContributors && BylineCss.displayInline}>
              {authorTopicUrl ? (
                <>
                  <VisuallyHiddenText>{`${author}, `}</VisuallyHiddenText>
                  <a
                    css={[
                      BylineCss.link,
                      isSingleContributor
                        ? BylineCss.linkSingleContributor
                        : BylineCss.linkMultipleContributor,
                    ]}
                    href={authorTopicUrl}
                    className="focusIndicatorReducedWidth"
                  >
                    <Text
                      className="byline-link"
                      size="bodyCopy"
                      fontVariant="sansBold"
                      css={[
                        BylineCss.author,
                        isSingleContributor &&
                          BylineCss.authorSingleContributor,
                      ]}
                    >
                      {authorName}
                    </Text>
                    {isSingleContributor &&
                      (isRtl ? (
                        <LeftChevron
                          className="byline-link"
                          css={BylineCss.authorChevron}
                        />
                      ) : (
                        <RightChevron
                          className="byline-link"
                          css={BylineCss.authorChevron}
                        />
                      ))}
                  </a>
                </>
              ) : (
                <span role="text">
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
              )}
              {hasMultipleContributors && <Comma />}
            </li>
            {jobRole ? (
              <li css={BylineCss.displayInline}>
                <span role="text">
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
                {(location && <Comma />) ||
                  (hasMultipleContributors &&
                    index !== lastContributorIndex && <Comma />)}
              </li>
            ) : null}
            {location ? (
              <li css={BylineCss.displayInline}>
                <span role="text">
                  <VisuallyHiddenText>
                    {`${reportingFrom}, `}{' '}
                  </VisuallyHiddenText>
                  <Text
                    css={[BylineCss.locationText]}
                    {...(isSingleContributor
                      ? { size: 'brevier' }
                      : { size: 'bodyCopy' })}
                  >
                    {location}
                  </Text>
                </span>
                {hasMultipleContributors && index !== lastContributorIndex && (
                  <Comma />
                )}
              </li>
            ) : null}
          </ul>
        );
      })}
    </>
  );
};

const Byline = ({
  blocks,
  children = null,
}: PropsWithChildren<OptimoBylineBlock['model']>) => {
  const { translations } = use(ServiceContext);

  const contributorValues = bylineExtractor(blocks);

  const isSingleContributor = contributorValues.length === 1;

  const { byline: { articleInformation = 'Article Information' } = {} } =
    translations ?? {};

  return (
    contributorValues?.[0] && (
      <section
        role="region"
        aria-labelledby="article-byline"
        data-testid="byline"
      >
        <VisuallyHiddenText as="strong" id="article-byline" aria-hidden>
          {articleInformation}
        </VisuallyHiddenText>
        <ul css={BylineCss.list}>
          <li
            css={[
              BylineCss.bylineContainer,
              isSingleContributor && BylineCss.bylineContainerSingleContributor,
            ]}
          >
            <Contributors
              contributorValues={contributorValues}
              isSingleContributor={isSingleContributor}
            />
          </li>
          {/* EXPERIMENT: Article Read Time */}
          {children &&
            Children.map(children, (child, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>{child}</li>
            ))}
        </ul>
      </section>
    )
  );
};

export default Byline;
