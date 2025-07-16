/* eslint-disable jsx-a11y/aria-role */
import React, { use, PropsWithChildren } from 'react';
import { OptimoBylineBlock } from '#app/models/types/optimo';
import { ServiceContext } from '../../contexts/ServiceContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { RightChevron, LeftChevron } from '../icons';
import Text from '../Text';
import Image from '../Image';
import bylineExtractor from './utilities/bylineExtractor';

const Byline = ({
  blocks,
  children = null,
}: PropsWithChildren<OptimoBylineBlock['model']>) => {
  const { translations, dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';

  const bylineValues = bylineExtractor(blocks);

  const {
    byline: {
      author = 'Author',
      articleInformation = 'Article Information',
      reportingFrom = 'Reporting from',
      role = 'Role',
    } = {},
  } = translations ?? {};

  const contributors =
    bylineValues.length === 0
      ? null
      : bylineValues?.map(values => {
          if (!values) return null;

          const {
            authorName,
            jobRole,
            twitterText,
            twitterLink,
            authorImage,
            location,
            authorTopicUrl,
          } = values;

          return (
            <ul
              className="list-none p-0 m-0 grid pl-full mr-full mb-full group-1:grid-cols-2 group-2:flex group-2:flex-wrap group-2:pl-double group-3:mr-double group-3:mb-0 group-4:pl-0"
              role="list"
              key={authorName}
            >
              {authorImage && (
                <li
                  className={`inline-flex items-end justify-center w-[5rem] h-[3.75rem] bg-grey-7 overflow-visible ${isRtl ? 'float-right my-[1.5625rem] mr-0 ml-2' : 'float-left my-[1.5625rem] mr-2 ml-0'}`}
                  role="presentation"
                >
                  <Image
                    className="w-[5rem] h-[5rem]"
                    src={authorImage}
                    alt={authorName}
                    placeholder={false}
                    aspectRatio={[1, 1]}
                  />
                </li>
              )}
              <li>
                {authorTopicUrl ? (
                  <>
                    <VisuallyHiddenText>{`${author}, ${authorName}`}</VisuallyHiddenText>
                    <a
                      className="inline-block no-underline pr-[2.75rem] hover:underline focus:underline focusIndicatorReducedWidth"
                      href={authorTopicUrl}
                    >
                      <Text
                        className="byline-link text-grey-10 dark:text-grey-2 inline-block align-middle"
                        size="bodyCopy"
                        fontVariant="sansBold"
                      >
                        {authorName}
                      </Text>
                      {isRtl ? (
                        <LeftChevron
                          className="byline-link align-middle mx-half text-grey-10 dark:text-grey-2 fill-current w-[1.5rem] h-[1.5rem] hover:text-postbox focus:text-postbox"
                        />
                      ) : (
                        <RightChevron
                          className="byline-link align-middle mx-half text-grey-10 dark:text-grey-2 fill-current w-[1.5rem] h-[1.5rem] hover:text-postbox focus:text-postbox"
                        />
                      )}
                    </a>
                  </>
                ) : (
                  <span role="text">
                    <VisuallyHiddenText>{`${author}, `}</VisuallyHiddenText>
                    <Text
                      className="text-grey-10 dark:text-grey-2 inline-block align-middle"
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
                  <VisuallyHiddenText>{`${role}, `} </VisuallyHiddenText>
                  <Text
                    className="text-grey-6 dark:text-grey-2"
                    fontVariant="sansBold"
                    size="brevier"
                  >
                    {jobRole}
                  </Text>
                </span>
              </li>
              {twitterLink ? (
                <li>
                  <a
                    className="inline-block no-underline pr-[2.75rem] pb-[1.375rem] pt-1 hover:underline focus:underline focusIndicatorReducedWidth"
                    href={twitterLink}
                    aria-labelledby="byline-twitter-link"
                  >
                    <span role="text" id="byline-twitter-link">
                      <VisuallyHiddenText lang="en-GB">{`X, `}</VisuallyHiddenText>
                      <Text
                        className="byline__link-text text-postbox inline-block align-middle"
                        size="brevier"
                        fontVariant="sansBold"
                      >{`@${twitterText}`}</Text>
                      {isRtl ? (
                        <LeftChevron className="align-middle mx-half text-postbox fill-current w-full h-full" />
                      ) : (
                        <RightChevron className="align-middle mx-half text-postbox fill-current w-full h-full" />
                      )}
                    </span>
                  </a>
                </li>
              ) : null}
              {location ? (
                <li>
                  <span
                    role="text"
                    className="m-0 block clear-both"
                    aria-label={`${reportingFrom} ${location}`}
                  >
                    <Text
                      className="text-shadow dark:text-grey-2"
                      size="brevier"
                      fontVariant="sansRegularItalic"
                      aria-hidden="true"
                    >
                      {`${reportingFrom} `}{' '}
                    </Text>
                    <Text
                      className="text-shadow dark:text-grey-2 block pt-1"
                      size="brevier"
                      fontVariant="sansRegular"
                      aria-hidden="true"
                    >
                      {location}
                    </Text>
                  </span>
                </li>
              ) : null}
            </ul>
          );
        });

  return (
    contributors?.[0] && (
      <section role="region" aria-labelledby="article-byline">
        <VisuallyHiddenText as="strong" id="article-byline" aria-hidden>
          {articleInformation}
        </VisuallyHiddenText>
        <ul className="list-none p-0 m-0">
          <li className="grid pl-full group-1:grid-cols-2 group-2:flex group-2:flex-wrap group-2:pl-double group-4:pl-0">{contributors}</li>
          {children && (
            <li className="before:content-[''] before:border-t-[0.125rem] before:border-grey-5 before:w-[2.5rem] before:block before:my-double before:mx-full group-2:before:mx-double group-4:before:mx-0">
              {children}
            </li>
          )}
        </ul>
      </section>
    )
  );
};

export default Byline;
