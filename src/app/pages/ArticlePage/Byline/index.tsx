/* eslint-disable jsx-a11y/aria-role */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useContext, PropsWithChildren } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../../contexts/ServiceContext';
import VisuallyHiddenText from '../../../legacy/psammead/psammead-visually-hidden-text/src';
import BylineCss from './index.styles';
import { RightChevron } from '../../../components/icons';
import {
  getBodyCopy,
  getBrevier,
} from '../../../legacy/psammead/gel-foundations/src/typography';
import { getSansBold } from '../../../legacy/psammead/psammead-styles/src/font-styles';

type Props = {
  blocks: any;
};

const Byline = ({ blocks, children }: PropsWithChildren<Props>) => {
  const { service, script, translations } = useContext(ServiceContext) as {
    service: any;
    script: any;
    translations: any;
  };

  const bylineBlocks = pathOr([], [0, 'model', 'blocks'], blocks);

  const authorBlock = bylineBlocks.find((block: any) => block.type === 'name');
  const jobRoleBlock = bylineBlocks.find((block: any) => block.type === 'role');
  const twitterBlock = bylineBlocks.find((block: any) => block.type === 'link');

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

  if (!(author && jobRole)) return null;

  const authorTranslated = pathOr('Author', ['byline', 'author'], translations);
  const jobRoleTranslated = pathOr('Role', ['byline', 'role'], translations);
  const publishedTranslated = pathOr(
    'Published',
    ['byline', 'published'],
    translations,
  );

  const articleInformationTranslated = pathOr(
    'Article information',
    ['byline', 'articleInformation'],
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
        <li>
          {twitterLink ? (
            <React.Fragment>
              <VisuallyHiddenText>{`${authorTranslated}, `}</VisuallyHiddenText>
              <a css={BylineCss.authorLink} href={twitterLink}>
                <span
                  css={[
                    BylineCss.author,
                    getSansBold(service),
                    getBodyCopy(script),
                  ]}
                >
                  {author}
                </span>
                <RightChevron css={BylineCss.authorChevron} />
              </a>
            </React.Fragment>
          ) : (
            <span role="text">
              <VisuallyHiddenText>{`${authorTranslated}, `}</VisuallyHiddenText>
              <span
                css={[
                  BylineCss.author,
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
            <a css={BylineCss.twitterLink} href={twitterLink}>
              <span role="text">
                <VisuallyHiddenText lang="en-GB">
                  {`Twitter, `}
                </VisuallyHiddenText>
                <span
                  css={[
                    BylineCss.twitterText,
                    getSansBold(service),
                    getBrevier(script),
                  ]}
                >{`@${twitterText}`}</span>
                <RightChevron css={BylineCss.twitterChevron} />
              </span>
            </a>
          </li>
        ) : null}
        <hr css={BylineCss.lineBreak} aria-hidden />
        {children ? (
          <li>
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
