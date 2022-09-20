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
  const image = pathOr(
    '',
    ['model', 'blocks', 0, 'model', 'locator'],
    imageBlock,
  );

  if (!(author && jobRole)) return null;

  const authorTranslated = pathOr('Author', ['byline', 'author'], translations);
  const articleInformationTranslated = pathOr(
    'Article information',
    ['byline', 'articleInformation'],
    translations,
  );
  const jobRoleTranslated = pathOr('Role', ['byline', 'role'], translations);
  const imageTranslated = pathOr(
    'List item, image',
    ['byline', 'listItemImage'],
    translations,
  );
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
      aria-labelledby="article-byline"
    >
      <VisuallyHiddenText id="article-byline" aria-hidden>
        {articleInformationTranslated}
      </VisuallyHiddenText>
      <ul css={BylineCss.bylineList} role="list">
        {image ? (
          <React.Fragment>
            {isRtl ? (
              <li css={BylineCss.imageRtl}>
                <img
                  css={BylineCss.imageSource}
                  src={image}
                  alt={imageTranslated}
                />
              </li>
            ) : (
              <li css={BylineCss.imageLtr}>
                <img
                  css={BylineCss.imageSource}
                  src={image}
                  alt={imageTranslated}
                />
              </li>
            )}
          </React.Fragment>
        ) : null}
        <li>
          {twitterLink ? (
            <React.Fragment>
              <VisuallyHiddenText>{`${authorTranslated}, `}</VisuallyHiddenText>
              <a
                css={[BylineCss.link, BylineCss.authorLink]}
                href={twitterLink}
              >
                <strong
                  className="byline__link-text"
                  css={[
                    BylineCss.author,
                    getSansBold(service),
                    getBodyCopy(script),
                  ]}
                >
                  {author}
                </strong>
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
              <strong
                css={[
                  BylineCss.author,
                  getSansBold(service),
                  getBodyCopy(script),
                ]}
              >
                {author}
              </strong>
            </span>
          )}
        </li>
        <li>
          <span role="text">
            <VisuallyHiddenText>{`${jobRoleTranslated}, `} </VisuallyHiddenText>
            <strong
              css={[
                BylineCss.jobRole,
                getSansBold(service),
                getBrevier(script),
              ]}
            >
              {jobRole}
            </strong>
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
            <span css={BylineCss.location}>
              <span
                css={[
                  BylineCss.reportingFromText,
                  getSansRegularItalic(service),
                  getBrevier(script),
                ]}
              >
                {reportingFromTranslated}
              </span>
              <VisuallyHiddenText> </VisuallyHiddenText>
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
          <li css={BylineCss.timestampLineBreak}>
            <span role="text">
              <VisuallyHiddenText>
                {`${publishedTranslated}, `}{' '}
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
