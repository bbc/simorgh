/* eslint-disable jsx-a11y/aria-role */
/** @jsx jsx */
/** @jsxFrag */
import { jsx } from '@emotion/react';
import React, { use, PropsWithChildren } from 'react';
import { OptimoBylineBlock } from '#app/models/types/optimo';
import { ServiceContext } from '../../contexts/ServiceContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import BylineCss from './index.styles';
import { RightChevron, LeftChevron } from '../icons';
import Text from '../Text';
import Image from '../Image';
import bylineExtractor from './utilities/bylineExtractor';

const Contributor = ({ contributorValues, isSingleContributor }) => {
  const { translations, dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';

  const {
    byline: {
      author = 'Author',
      reportingFrom = 'Reporting from',
      role = 'Role',
    } = {},
  } = translations ?? {};

  // is this enough?
  if (!contributorValues) return null;

  const { authorName, jobRole, authorImage, location, authorTopicUrl } =
    contributorValues;

  // temp
  const areMultipleContributors = !isSingleContributor;

  return (
    <ul
      css={[BylineCss.bylineList, BylineCss.bylineSection]}
      role="list"
      key={authorName}
    >
      {authorImage && (
        <li
          css={[
            // BylineCss.listItemInline,
            BylineCss.ImageWrapper,
            isRtl ? BylineCss.imageRtl : BylineCss.imageLtr,
          ]}
          role="presentation"
        >
          <Image
            css={BylineCss.imageSrc}
            src={authorImage}
            alt={authorName}
            placeholder={false}
            aspectRatio={[1, 1]}
          />
        </li>
      )}
      {/* authorName */}
      <li>
        {authorTopicUrl ? (
          <>
            <VisuallyHiddenText>{`${author}, ${authorName}`}</VisuallyHiddenText>
            <a
              css={[BylineCss.link]}
              href={authorTopicUrl}
              className="focusIndicatorReducedWidth"
            >
              <Text
                className="byline-link"
                // size="bodyCopy"
                // fontVariant="sansBold"
                css={BylineCss.author}
              >
                {authorName}
              </Text>
              {isRtl ? (
                <LeftChevron
                  className="byline-link"
                  css={BylineCss.authorChevron}
                />
              ) : (
                <RightChevron
                  className="byline-link"
                  css={BylineCss.authorChevron}
                />
              )}
            </a>
          </>
        ) : (
          <span role="text">
            <VisuallyHiddenText>{`${author}, `}</VisuallyHiddenText>
            <Text
              css={[BylineCss.author]}
              // size="bodyCopy"
              // fontVariant="sansBold"
            >
              {authorName}
            </Text>
          </span>
        )}
      </li>
      <li>
        <span role="text">
          <VisuallyHiddenText>{`${role}, `} </VisuallyHiddenText>
          <Text
            css={BylineCss.jobRole}
            // fontVariant="sansBold"
            // size="brevier"
          >
            {jobRole}
          </Text>
        </span>
      </li>
      {location ? (
        <li>
          <span
            role="text"
            css={BylineCss.location}
            aria-label={`${reportingFrom} ${location}`}
          >
            <Text
              css={BylineCss.reportingFromText}
              // size="brevier"
              // fontVariant="sansRegularItalic"
              aria-hidden="true"
            >
              {`${reportingFrom} `}{' '}
            </Text>
            <Text
              css={BylineCss.locationText}
              // size="brevier"
              // fontVariant="sansRegular"
              aria-hidden="true"
            >
              {location}
            </Text>
          </span>
        </li>
      ) : null}
    </ul>
  );
};

const Byline = ({
  blocks,
  children = null,
}: PropsWithChildren<OptimoBylineBlock['model']>) => {
  const { translations } = use(ServiceContext);
  // const isRtl = dir === 'rtl';

  const contributorValues = bylineExtractor(blocks);

  const isSingleContributor = contributorValues.length === 1;

  console.log('bylineValues PRINT', contributorValues);

  const {
    byline: {
      // author = 'Author',
      articleInformation = 'Article Information',
      // reportingFrom = 'Reporting from',
      // role = 'Role',
    } = {},
  } = translations ?? {};

  return (
    contributorValues?.[0] && (
      <section role="region" aria-labelledby="article-byline">
        <VisuallyHiddenText as="strong" id="article-byline" aria-hidden>
          {articleInformation}
        </VisuallyHiddenText>
        <ul css={BylineCss.bylineList}>
          {contributorValues.map((contributor, index) => (
            <li css={isSingleContributor && BylineCss.bylineContainer}>
              <Contributor
                contributorValues={contributor}
                isSingleContributor={isSingleContributor}
              />
            </li>
          ))}
          {/* EXPERIMENT: Article Read Time */}
          {children &&
            React.Children.map(children, (child, index) => (
              <li key={index} css={BylineCss.timestampLineBreak}>
                {child}
              </li>
            ))}
        </ul>
      </section>
    )
  );
};

export default Byline;
