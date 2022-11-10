/* eslint-disable jsx-a11y/aria-role */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useContext, PropsWithChildren } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../../contexts/ServiceContext';
import VisuallyHiddenText from '../../../legacy/psammead/psammead-visually-hidden-text/src';
import BylineCss from './index.styles';
import { RightChevron, LeftChevron } from '../../../components/icons';
import Text from '../../../components/Text';
import Image from '../../../components/Image';
import buildIChefURL from '../../../lib/utilities/ichefURL';

type Props = {
  blocks: any;
};

const Byline = ({ blocks, children }: PropsWithChildren<Props>) => {
  const { translations, dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';
  const bylineBlocks = pathOr([], [0, 'model', 'blocks'], blocks);

  const authorBlock = bylineBlocks.find((block: any) => block.type === 'name');
  const jobRoleBlock = bylineBlocks.find((block: any) => block.type === 'role');
  const twitterBlock = bylineBlocks.find((block: any) => block.type === 'link');
  const locationBlock = bylineBlocks.find(
    (block: any) => block.type === 'location',
  );
  const imagesBlock = bylineBlocks.find(
    (block: any) => block.type === 'images',
  );

  const author = pathOr(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    authorBlock,
  );
  const jobRole = pathOr(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    jobRoleBlock,
  );
  const twitterText = pathOr(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    twitterBlock,
  );
  const twitterLink = pathOr(
    '',
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
    twitterBlock,
  );
  const location = pathOr(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'text'],
    locationBlock,
  );
  const locator = pathOr(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'locator'],
    imagesBlock,
  );
  const originCode = pathOr(
    '',
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'originCode'],
    imagesBlock,
  );

  let image = buildIChefURL({
    originCode,
    locator,
    resolution: 160,
    isPng: true,
  });

  if (!image.endsWith('.png')) image = '';

  const contributorBlock = pathOr([], [0], blocks);
  const authorTopicUrl = pathOr('', ['model', 'topicUrl'], contributorBlock);

  if (!(author && jobRole)) return null;

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
        {image && (
          <li
            css={[
              BylineCss.ImageWrapper,
              isRtl ? BylineCss.imageRtl : BylineCss.imageLtr,
            ]}
          >
            <Image
              css={BylineCss.imageSrc}
              src={image}
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
              >
                <Text
                  className="byline__link-text"
                  size="bodyCopy"
                  fontVariant="sansBold"
                  css={BylineCss.author}
                >
                  {author}
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
                {author}
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

Byline.defaultProps = {
  children: null,
};

export default Byline;
