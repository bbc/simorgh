import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import TextWithFragmentsAndUrlLinks from './index';

const simpleTextBlock = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          lang: 'en_GB',
          script: 'latin',
          text: 'Hello, I am a single text block.',
          blocks: [
            {
              type: 'fragment',
              model: {
                text: 'Hello, I am a single text block.',
                attributes: [],
                lang: 'en_GB',
                script: 'latin',
              },
            },
          ],
        },
      },
    ],
  },
};

const latinTextBlockWithLink = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          lang: 'en_GB',
          script: 'latin',
          text: 'Hello, bonjour, I am a paragraph.',
          blocks: [
            {
              type: 'fragment',
              model: {
                text: 'Hello, ',
                attributes: [],
                lang: 'en_GB',
                script: 'latin',
              },
            },
            {
              type: 'urlLink',
              model: {
                locator: '/news/articles/c0000000000o',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'bonjour',
                      attributes: ['italic'],
                      lang: 'fr',
                      script: 'latin',
                    },
                  },
                  {
                    type: 'fragment',
                    model: {
                      text: ', I am a paragraph.',
                      attributes: [],
                      lang: 'en_GB',
                      script: 'latin',
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
};

const arabicLatinTextBlockWithLink = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          lang: 'ar_AR',
          script: 'arabic',
          text: 'يمكنك قراءة الموضوع الأصلي على موقع BBC Future',
          blocks: [
            {
              type: 'fragment',
              model: {
                text: 'يمكنك قراءة',
                attributes: [],
                lang: 'ar_AR',
                script: 'arabic',
              },
            },
            {
              type: 'urlLink',
              model: {
                locator:
                  '/future/story/20180928-the-surprising-truth-about-loneliness',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'الموضوع الأصلي',
                      attributes: [],
                      lang: 'ar_AR',
                      script: 'arabic',
                    },
                  },
                ],
              },
            },
            {
              type: 'fragment',
              model: {
                text: ' على موقع ',
                attributes: [],
                lang: 'ar_AR',
                script: 'arabic',
              },
            },
            {
              type: 'urlLink',
              model: {
                locator: '/future',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'BBC Future',
                      attributes: [],
                      lang: 'en_GB',
                      script: 'latin',
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
};

const arabicLatinTextBlock = {
  type: 'text',
  model: {
    blocks: [
      {
        type: 'paragraph',
        model: {
          lang: 'ar_AR',
          script: 'arabic',
          text: 'يمكنك قراءة الموضوع الأصلي على موقع BBC Future',
          blocks: [
            {
              type: 'fragment',
              model: {
                text: 'يمكنك قراءة الموضوع الأصلي على موقع',
                attributes: [],
                lang: 'ar_AR',
                script: 'arabic',
              },
            },
            {
              type: 'fragment',
              model: {
                text: 'BBC Future',
                attributes: [],
                lang: 'en_GB',
                script: 'latin',
              },
            },
          ],
        },
      },
    ],
  },
};

storiesOf('Text with Fragments & UrlLinks', module)
  .add('default', () => <TextWithFragmentsAndUrlLinks {...simpleTextBlock} />)
  .add('typeOfPreviousBlock is also text', () => (
    <TextWithFragmentsAndUrlLinks
      {...simpleTextBlock}
      typeOfPreviousBlock="text"
    />
  ))
  .add('multiple languages, links, with single script', () => (
    <TextWithFragmentsAndUrlLinks {...latinTextBlockWithLink} />
  ))
  .add('multiple languages, links, with two scripts - latin and arabic', () => (
    <TextWithFragmentsAndUrlLinks {...arabicLatinTextBlockWithLink} />
  ))
  .add('two languages with two scripts - latin and arabic', () => (
    <TextWithFragmentsAndUrlLinks {...arabicLatinTextBlock} />
  ));
