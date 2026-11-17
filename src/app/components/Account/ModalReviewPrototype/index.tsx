import { MouseEvent, use, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import Text from '#app/components/Text';
import InlineLink from '#app/components/InlineLink';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import ArticlePage from '#app/pages/ArticlePage/ArticlePage';
import { articleDataNews } from '#app/pages/ArticlePage/fixtureData';
import { blockContainingText, singleTextBlock } from '#app/models/blocks';
import consentBannerStyles from '#app/components/EmbedConsentBanner/ConsentBanner.styles';
import OriginalModal from './OriginalModal';
import { prototypeCopy, PrototypeContext } from './translations';
import styles from './index.styles';

const articleData = {
  ...articleDataNews,
  content: {
    ...articleDataNews.content,
    model: {
      ...articleDataNews.content.model,
      blocks: [
        blockContainingText(
          'headline',
          'How neighbours are bringing more green spaces to their streets',
          'prototype-headline',
        ),
        {
          ...singleTextBlock(
            'Small spaces between homes and buildings can help bring people closer to nature. In some neighbourhoods, residents are working together to plant flowers and trees in overlooked corners.',
          ),
          id: 'prototype-paragraph-1',
        },
        {
          ...singleTextBlock(
            'These projects give local people a chance to choose what grows and share responsibility for looking after it. They can also offer neighbours a reason to meet and learn from one another.',
          ),
          id: 'prototype-paragraph-2',
        },
        {
          ...singleTextBlock(
            'Every space has different needs. Before starting, volunteers consider how much sunlight and water is available, as well as which plants are suited to the area.',
          ),
          id: 'prototype-paragraph-3',
        },
      ],
    },
  },
};

const ModalReviewPrototype = ({ example }: { example: PrototypeContext }) => {
  const [context, setContext] = useState<PrototypeContext | null>(null);
  const [inlineHost, setInlineHost] = useState<HTMLElement | null>(null);
  const [inlineUnavailable, setInlineUnavailable] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const service = use(ServiceContext);
  const modalTranslations = service.translations.accountSignInModal;
  const prototypeService = useMemo(
    () => ({
      ...service,
      translations: {
        ...service.translations,
        accountSignInModal: modalTranslations
          ? { ...modalTranslations, ...prototypeCopy }
          : undefined,
      },
    }),
    [service, modalTranslations],
  );

  useEffect(() => {
    if (example !== 'inline') return undefined;
    const paragraph = articleRef.current?.querySelector('main p');
    const paragraphContainer = paragraph?.parentElement;
    if (!paragraphContainer) {
      setInlineUnavailable(true);
      return undefined;
    }

    const host = document.createElement('div');
    paragraphContainer.insertAdjacentElement('afterend', host);
    setInlineHost(host);

    return () => {
      host.remove();
    };
  }, [example, modalTranslations]);

  const openArticleLink = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setContext('articleLink');
  };

  if (!modalTranslations) {
    return <p>Sign-in modal translations are unavailable for this service.</p>;
  }

  return (
    <ServiceContext.Provider value={prototypeService}>
      <PageLayoutWrapper
        pageData={{ metadata: { type: 'article' } }}
        status={200}
      >
        <div ref={articleRef}>
          <ArticlePage pageData={articleData} />
        </div>
        {inlineHost &&
          createPortal(
            <aside
              aria-label="Inline sign-in example"
              css={styles.inlinePrompt}
            >
              <Paragraph>
                Enjoying this story? If you like,{' '}
                <InlineLink
                  to="/example-register"
                  text="sign in or register"
                  onClick={event => {
                    event.preventDefault();
                    setContext('inline');
                  }}
                />{' '}
                to get more from BBC News. You can keep reading either way.
              </Paragraph>
            </aside>,
            inlineHost,
          )}
        <aside aria-label="Temporary sign-in examples" css={styles.examples}>
          <div css={styles.notice}>
            <Paragraph>
              Temporary demonstration: this sample article and sign-in prompt
              are for testing only.
            </Paragraph>
            {inlineUnavailable && (
              <Paragraph>
                The inline example could not be placed in the article.
              </Paragraph>
            )}
          </div>
          {example === 'articleLink' && (
            <section
              aria-labelledby="related-stories-heading"
              css={styles.panel}
            >
              <Heading
                level={2}
                size="greatPrimer"
                id="related-stories-heading"
              >
                Related story example
              </Heading>
              <Paragraph css={styles.description}>
                Try a sign-in prompt when a reader selects an article link.
              </Paragraph>
              <InlineLink
                to="/example-article"
                text="Open another article"
                fontVariant="sansBold"
                size="pica"
                onClick={openArticleLink}
              />
            </section>
          )}
          {example === 'articleBottom' && (
            <section
              aria-labelledby="end-of-article-heading"
              css={styles.panel}
            >
              <Heading level={2} size="greatPrimer" id="end-of-article-heading">
                End of article example
              </Heading>
              <Paragraph css={styles.description}>
                Try a different sign-in prompt after reading.
              </Paragraph>
              <button
                type="button"
                css={consentBannerStyles.button}
                onClick={() => setContext('articleBottom')}
              >
                <Text fontVariant="sansBold" css={{ color: 'inherit' }}>
                  Discover more
                </Text>
              </button>
            </section>
          )}
        </aside>
        {context && (
          <OriginalModal context={context} onClose={() => setContext(null)} />
        )}
      </PageLayoutWrapper>
    </ServiceContext.Provider>
  );
};

export default ModalReviewPrototype;
