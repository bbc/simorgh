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

  // temp
  const areMultipleContributors = !isSingleContributor;

  // to do, build out a function that works out what commas to show etc
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
              BylineCss.bylineList,
              BylineCss.bylineSection,
              areMultipleContributors && BylineCss.listItemInline,
            ]}
            role="list"
            key={authorName}
          >
            {/* temporary check for isSingleContributor - this will be cleaned by BFF */}
            {authorImage && isSingleContributor && (
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
            <li css={areMultipleContributors && BylineCss.listItemInline}>
              {authorTopicUrl ? (
                <>
                  <VisuallyHiddenText>{`${author}, ${authorName}`}</VisuallyHiddenText>
                  <a
                    css={[
                      BylineCss.link,
                      isSingleContributor && BylineCss.linkSingleContributor,
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
                    size="bodyCopy"
                    fontVariant="sansBold"
                  >
                    {authorName}
                  </Text>
                </span>
              )}
              {areMultipleContributors && (
                <span aria-hidden="true" css={BylineCss.comma}>
                  ,{' '}
                </span>
              )}
            </li>
            <li css={BylineCss.listItemInline}>
              <span role="text">
                <VisuallyHiddenText>{`${role}, `} </VisuallyHiddenText>
                <Text
                  css={BylineCss.jobRole}
                  // fontVariant="sansBold"
                  fontVariant="sansRegular"
                  size="bodyCopy"
                  // size="brevier"
                >
                  {jobRole}
                </Text>
              </span>
              {areMultipleContributors && (
                <span aria-hidden="true" css={BylineCss.comma}>
                  ,{' '}
                </span>
              )}
              {/* // to do - neaten logic */}
              {isSingleContributor && location && (
                <span aria-hidden="true" css={BylineCss.comma}>
                  ,{' '}
                </span>
              )}
            </li>
            {location ? (
              <li css={BylineCss.listItemInline}>
                <span
                  role="text"
                  css={isSingleContributor && BylineCss.location}
                  aria-label={`${reportingFrom} ${location}`}
                >
                  {/* to do */}
                  {/* {isSingleContributor && (
                    <Text
                      css={BylineCss.reportingFromText}
                      size="brevier"
                      fontVariant="sansRegularItalic"
                      aria-hidden="true"
                    >
                      {`${reportingFrom} `}{' '}
                    </Text>
                  )} */}
                  <Text
                    css={[
                      BylineCss.locationText,
                      isSingleContributor &&
                        BylineCss.locationTextForSingleContributor,
                    ]}
                    // size="brevier"
                    size="bodyCopy"
                    fontVariant="sansRegular"
                    aria-hidden="true"
                  >
                    {location}
                  </Text>
                </span>
                {areMultipleContributors && index !== lastContributorIndex && (
                  <span css={BylineCss.comma} aria-hidden="true">
                    ,{' '}
                  </span>
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
            React.Children.map(children, (child, index) => (
              <li key={index}>{child}</li>
            ))}
        </ul>
      </section>
    )
  );
};

export default Byline;
