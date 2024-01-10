/** @jsx jsx */

import React, { useContext, useEffect, useState } from 'react';
import { jsx } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import Pagination from '#app/components/Pagination';
import ChartbeatAnalytics from '#app/components/ChartbeatAnalytics';
import ATIAnalytics from '#app/components/ATIAnalytics';
import { ATIData } from '#app/components/ATIAnalytics/types';
import MetadataContainer from '../../../../../src/app/components/Metadata';
import LinkedDataContainer from '../../../../../src/app/components/LinkedData';
import Stream from './Stream';
import Header from './Header';
import KeyPoints from './KeyPoints';

import styles from './styles';
import { StreamResponse } from './Post/types';
import { KeyPointsResponse } from './KeyPoints/types';

type ComponentProps = {
  pageData: {
    title: string;
    description?: string;
    isLive: boolean;
    summaryPoints: { content: KeyPointsResponse | null };
    liveTextStream: {
      content: StreamResponse | null;
      contributors: string | null;
    };
    seo: Partial<{
      seoTitle: string;
      seoDescription: string;
      datePublished: string;
      dateModified: string;
    }>;
    atiAnalytics: ATIData;
  };
};

const fakePollingFetch = () => {
  return [
    {
      typeCode: null,
      header: {
        model: {
          blocks: [
            {
              type: 'headline',
              model: {
                blocks: [
                  {
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: {
                            text: 'New post from Polling',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'New post from Polling',
                                  attributes: [],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              type: 'subheadline',
              model: {
                blocks: [
                  {
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: {
                            text: 'Another post sub headline',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'Another post sub headline',
                                  attributes: [],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      content: {
        model: {
          blocks: [
            {
              type: 'paragraph',
              model: {
                text: 'Another short form text',
                blocks: [
                  {
                    type: 'fragment',
                    model: { text: 'Another ', attributes: ['bold'] },
                  },
                  {
                    type: 'fragment',
                    model: {
                      text: 'short form text',
                      attributes: ['italic'],
                    },
                  },
                ],
              },
            },
            {
              type: 'orderedList',
              model: {
                blocks: [
                  {
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'one',
                            attributes: ['italic'],
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'two',
                            attributes: ['italic'],
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'three',
                            attributes: ['italic'],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            { type: 'paragraph', model: { text: '', blocks: [] } },
            {
              type: 'unorderedList',
              model: {
                blocks: [
                  {
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'Bullet 1',
                            attributes: ['italic'],
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'Bullet 2',
                            attributes: ['italic'],
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'listItem',
                    model: {
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'Bullet 3',
                            attributes: ['italic'],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            { type: 'paragraph', model: { text: '', blocks: [] } },
            {
              type: 'paragraph',
              model: {
                text: 'Here is a Link',
                blocks: [
                  {
                    type: 'fragment',
                    model: { text: 'Here is a ', attributes: [] },
                  },
                  {
                    type: 'urlLink',
                    model: {
                      text: 'Link',
                      locator: 'https://www.bbc.co.uk/new/pidgin',
                      blocks: [
                        {
                          type: 'fragment',
                          model: { text: 'Link', attributes: [] },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      link: null,
      urn: 'asset:1009a4c7-ef57-4d77-a0f7-3ef886baee4c',
      type: 'POST',
      options: { isBreakingNews: false },
      dates: {
        firstPublished: '2023-03-21T13:22:05+00:00',
        lastPublished: '2023-03-21T13:22:05+00:00',
        time: null,
        curated: '2023-03-21T13:22:08.502Z',
      },
      titles: [{ title: null, source: 'primary' }],
      descriptions: [{ text: null, source: 'summary' }],
      images: [
        {
          url: null,
          originalUrl: null,
          urlTemplate: null,
          altText: null,
          copyright: null,
        },
      ],
    },
  ];
};

const LivePage = ({ pageData }: ComponentProps) => {
  const [streamData, setStreamData] = useState(pageData.liveTextStream.content);

  const { lang, translations } = useContext(ServiceContext);
  const {
    title,
    description,
    seo: { seoTitle, seoDescription, datePublished, dateModified },
    isLive,
    summaryPoints: { content: keyPoints },
    liveTextStream,
    atiAnalytics,
  } = pageData;

  const { index: activePage, total: pageCount } =
    liveTextStream?.content?.data?.page || {};

  const { pageXOfY, previousPage, nextPage, page } = {
    pageXOfY: 'Page {x} of {y}',
    previousPage: 'Previous Page',
    nextPage: 'Next Page',
    page: 'Page',
    ...translations.pagination,
  };

  const showPaginatedTitle = pageCount && activePage && activePage >= 2;

  const pageSeoTitle = seoTitle || title;

  const pageTitle = showPaginatedTitle
    ? `${pageSeoTitle}, ${pageXOfY
        .replace('{x}', activePage.toString())
        .replace('{y}', pageCount.toString())}`
    : pageSeoTitle;

  const pageDescription = seoDescription || description || pageSeoTitle;

  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: Replace with real polling fetch
      const newPosts = fakePollingFetch();

      setStreamData(prevState => ({
        data: {
          results: [...newPosts, ...(prevState?.data.results ?? [])],
        },
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ATIAnalytics atiData={atiAnalytics} />
      <ChartbeatAnalytics title={pageTitle} />
      <MetadataContainer
        title={pageTitle}
        lang={lang}
        description={pageDescription}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedDataContainer
        type="NewsArticle"
        seoTitle={pageTitle}
        headline={pageTitle}
        {...(datePublished && {
          datePublished,
        })}
        {...(dateModified && {
          dateModified,
        })}
        showAuthor
      />
      <main>
        <Header
          showLiveLabel={isLive}
          title={title}
          description={description}
        />
        <div css={styles.outerGrid}>
          <div css={styles.firstSection}>
            {keyPoints && (
              <KeyPoints keyPointsContent={keyPoints.model.blocks} />
            )}
          </div>
          <div css={styles.secondSection}>
            <Stream
              streamContent={streamData}
              contributors={liveTextStream.contributors}
            />
          </div>
        </div>
        <Pagination
          activePage={activePage}
          pageCount={pageCount}
          pageXOfY={pageXOfY}
          previousPage={previousPage}
          nextPage={nextPage}
          page={page}
        />
      </main>
    </>
  );
};

export default LivePage;
