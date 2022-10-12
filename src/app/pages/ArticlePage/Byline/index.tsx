/* eslint-disable jsx-a11y/aria-role */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useContext, PropsWithChildren } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../../contexts/ServiceContext';
import VisuallyHiddenText from '../../../legacy/psammead/psammead-visually-hidden-text/src';
import BylineCss from './index.styles';
import { RightChevron, LeftChevron } from '../../../components/icons';
import {
  getBodyCopy,
  getBrevier,
} from '../../../legacy/psammead/gel-foundations/src/typography';
import {
  getSansBold,
  getSansRegular,
  getSansRegularItalic,
} from '../../../legacy/psammead/psammead-styles/src/font-styles';
import Image from '../../../components/Image';
import buildIChefURL from '../../../lib/utilities/ichefURL';

type Props = {
  blocks: any;
};

const Byline = ({ blocks, children }: PropsWithChildren<Props>) => {
  const { service, script, translations, dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  const bylineBlocks = pathOr([], [0, 'model', 'blocks'], blocks);

  const authorBlock = bylineBlocks.find((block: any) => block.type === 'name');
  const jobRoleBlock = bylineBlocks.find((block: any) => block.type === 'role');
  const twitterBlock = bylineBlocks.find((block: any) => block.type === 'link');
  const locationBlock = bylineBlocks.find(
    (block: any) => block.type === 'location',
  );
  const imageBlock = bylineBlocks.find((block: any) => block.type === 'image');

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
    ['model', 'blocks', 0, 'model', 'locator'],
    imageBlock,
  );
  const originCode = pathOr(
    '',
    ['model', 'blocks', 0, 'model', 'originCode'],
    imageBlock,
  );
  const DEFAULT_IMAGE_RES = 160;
  let image = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_IMAGE_RES,
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

  const publishedTranslated = pathOr(
    'Published',
    ['byline', 'published'],
    translations,
  );
  const reportingFromTranslated = pathOr(
    'Reporting from',
    ['byline', 'reportingFrom'],
    translations,
  );

  return (
    <section
      css={BylineCss.bylineSection}
      role="region"
      aria-label={`${articleInformationTranslated}`}
    >
      <ul css={BylineCss.bylineList} role="list">
        {image && (
          <li
            css={
              isRtl
                ? [BylineCss.imageRtl, BylineCss.ImageWrapper]
                : [BylineCss.imageLtr, BylineCss.ImageWrapper]
            }
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
                <span
                  className="byline__link-text"
                  css={[
                    BylineCss.author,
                    getSansBold(service),
                    getBodyCopy(script),
                  ]}
                >
                  {author}
                </span>
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
              <span
                css={[
                  BylineCss.author,
                  BylineCss.authorLink,
                  getSansBold(service),
                  getBodyCopy(script),
                ]}
              >
                {author}
              </span>
            </span>
          )}
        </li>
        <li>
          <span role="text">
            <VisuallyHiddenText>{`${jobRoleTranslated}, `} </VisuallyHiddenText>
            <span
              css={[
                BylineCss.jobRole,
                getSansBold(service),
                getBrevier(script),
              ]}
            >
              {jobRole}
            </span>
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
                <span
                  className="byline__link-text"
                  css={[
                    BylineCss.twitterText,
                    getSansBold(service),
                    getBrevier(script),
                  ]}
                >{`@${twitterText}`}</span>
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
              <span
                css={[
                  BylineCss.reportingFromText,
                  getSansRegularItalic(service),
                  getBrevier(script),
                ]}
              >
                {`${reportingFromTranslated} `}{' '}
              </span>
              <span
                css={[
                  BylineCss.locationText,
                  getSansRegular(service),
                  getBrevier(script),
                ]}
              >
                {location}
              </span>
            </span>
          </li>
        ) : null}
        {children ? (
          <li css={BylineCss.timestampLineBreak} aria-labelledby="timestamp">
            <span role="text" id="timestamp">
              <VisuallyHiddenText>
                {`${publishedTranslated}, `}
              </VisuallyHiddenText>
              {children}
            </span>
          </li>
        ) : null}
      </ul>
    </section>
  );
};

Byline.defaultProps = {
  children: null,
};

export default Byline;
