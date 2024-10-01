/* eslint-disable jsx-a11y/aria-role */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useContext, PropsWithChildren } from 'react';
import pathOr from 'ramda/src/pathOr';
import { OptimoBylineBlock } from '#app/models/types/optimo';
import { ServiceContext } from '../../contexts/ServiceContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import BylineCss from './index.styles';
import { RightChevron, LeftChevron } from '../icons';
import Text from '../Text';
import Image from '../Image';
import bylineExtractor from './utilities/bylineExtractor';

const Byline = ({
  blocks,
  children = null,
}: PropsWithChildren<OptimoBylineBlock['model']>) => {
  const { translations, dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  const bylineValues = bylineExtractor(blocks);

  if (!bylineValues) return null;

  const {
    authorName,
    jobRole,
    twitterText,
    twitterLink,
    authorImage,
    location,
    authorTopicUrl,
  } = bylineValues;

  const authorTranslated = pathOr('Author', ['byline', 'author'], translations);
  const articleInformationTranslated = pathOr(
    'Article information',
    ['byline', 'articleInformation'],
    translations,
  );
  const jobRoleTranslated = pathOr('Role', ['byline', 'role'], translations);

  const reportingFromTranslated = pathOr(
    'Reporting from',
    ['byline', 'reportingFrom'],
    translations,
  );
  return (
    <section
      css={BylineCss.bylineSection}
      role="region"
      aria-labelledby="article-byline"
    >
      <VisuallyHiddenText as="strong" id="article-byline" aria-hidden>
        {articleInformationTranslated}
      </VisuallyHiddenText>
      <ul css={BylineCss.bylineList} role="list">
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
        <li>
          {authorTopicUrl ? (
            <React.Fragment>
              <VisuallyHiddenText>{`${authorTranslated}, `}</VisuallyHiddenText>
              <a
                css={[BylineCss.link, BylineCss.authorLink]}
                href={authorTopicUrl}
                className="focusIndicatorReducedWidth"
              >
                <Text
                  className="byline__link-text"
                  size="bodyCopy"
                  fontVariant="sansBold"
                  css={BylineCss.author}
                >
                  {authorName}
                </Text>
                {isRtl ? (
                  <LeftChevron css={BylineCss.authorChevron} />
                ) : (
                  <RightChevron css={BylineCss.authorChevron} />
                )}
              </a>
            </React.Fragment>
          ) : (
            <span role="text">
              <VisuallyHiddenText>{`${authorTranslated}, `}</VisuallyHiddenText>
              <Text
                css={[BylineCss.author, BylineCss.authorLink]}
                size="bodyCopy"
                fontVariant="sansBold"
              >
                {authorName}
              </Text>
            </span>
          )}
        </li>
        <li>
          <span role="text">
            <VisuallyHiddenText>{`${jobRoleTranslated}, `} </VisuallyHiddenText>
            <Text css={BylineCss.jobRole} fontVariant="sansBold" size="brevier">
              {jobRole}
            </Text>
          </span>
        </li>
        {twitterLink ? (
          <li>
            <a
              css={[BylineCss.link, BylineCss.twitterLink]}
              className="focusIndicatorReducedWidth"
              href={twitterLink}
              aria-labelledby="byline-twitter-link"
            >
              <span role="text" id="byline-twitter-link">
                <VisuallyHiddenText lang="en-GB">
                  {`Twitter, `}
                </VisuallyHiddenText>
                <Text
                  className="byline__link-text"
                  css={BylineCss.twitterText}
                  size="brevier"
                  fontVariant="sansBold"
                >{`@${twitterText}`}</Text>
                {isRtl ? (
                  <LeftChevron css={BylineCss.twitterChevron} />
                ) : (
                  <RightChevron css={BylineCss.twitterChevron} />
                )}
              </span>
            </a>
          </li>
        ) : null}
        {location ? (
          <li>
            <span role="text" css={BylineCss.location}>
              <Text
                css={BylineCss.reportingFromText}
                size="brevier"
                fontVariant="sansRegularItalic"
              >
                {`${reportingFromTranslated} `}{' '}
              </Text>
              <Text
                css={BylineCss.locationText}
                size="brevier"
                fontVariant="sansRegular"
              >
                {location}
              </Text>
            </span>
          </li>
        ) : null}
        {children ? (
          <li css={BylineCss.timestampLineBreak}>{children}</li>
        ) : null}
      </ul>
    </section>
  );
};

export default Byline;
