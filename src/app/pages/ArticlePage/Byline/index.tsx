/* eslint-disable jsx-a11y/aria-role */
import React, { useContext, PropsWithChildren } from 'react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../../contexts/ServiceContext';
import VisuallyHiddenText from '../../../legacy/psammead/psammead-visually-hidden-text/src';
import {
  Author,
  JobRole,
  BylineList,
  LineBreak,
  AuthorChavron,
  TwitterChavron,
  TwitterLink,
} from './index.styles';

type Props = {
  blocks: any;
};

const Byline = ({ blocks, children }: PropsWithChildren<Props>) => {
  const { script, service, translations } = useContext(ServiceContext) as {
    script: any;
    service: string;
    translations: any;
  };

  const bylineBlocks = pathOr([], [0, 'model', 'blocks'], blocks);

  const authorBlock = bylineBlocks.find((block: any) => block.type === 'name');
  const jobRoleBlock = bylineBlocks.find((block: any) => block.type === 'role');
  const twitterBlock = bylineBlocks.find((block: any) => block.type === 'link');

  console.log(twitterBlock);

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
    <section role="region" aria-labelledby="article-byline">
      <VisuallyHiddenText id="article-byline">
        {articleInformationTranslated}
      </VisuallyHiddenText>
      <BylineList role="list">
        <li>
          {twitterLink ? (
            <a href={twitterLink}>
              <VisuallyHiddenText>{`${authorTranslated}, `}</VisuallyHiddenText>
              <Author script={script} service={service}>
                {author}
              </Author>
              <AuthorChavron />
            </a>
          ) : (
            <span role="text">
              <VisuallyHiddenText>{`${authorTranslated}, `}</VisuallyHiddenText>
              <Author script={script} service={service}>
                {author}
              </Author>
            </span>
          )}
        </li>
        <li>
          <span role="text">
            <VisuallyHiddenText>{`${jobRoleTranslated}, `} </VisuallyHiddenText>
            <JobRole script={script} service={service}>
              {jobRole}
            </JobRole>
          </span>
        </li>
        {twitterLink ? (
          <li>
            <a href={twitterLink}>
              <span role="text">
                <VisuallyHiddenText>{`Twitter, `} </VisuallyHiddenText>
                <TwitterLink script={script} service={service}>
                  {`@${twitterText}`}
                </TwitterLink>
                <TwitterChavron />
              </span>
            </a>
          </li>
        ) : null}
        <LineBreak aria-hidden />
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
      </BylineList>
    </section>
  );
};

Byline.defaultProps = {
  children: null,
};

export default Byline;
