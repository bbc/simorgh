import { PropsWithChildren, use, useEffect, useRef } from 'react';
import useToggle from '#app/hooks/useToggle';
import { RequestContext } from '../../../contexts/RequestContext';
import styles from './index.styles';

type Props = {
  embeddableContent: string;
};

const EmbedHtml = ({ embeddableContent }: PropsWithChildren<Props>) => {
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const { isLite } = use(RequestContext);
  const { enabled: electionBannerEnabled }: { enabled: boolean | null } =
    useToggle('electionBanner');

  useEffect(() => {
    if (!embedContainerRef.current || !embeddableContent || isLite) {
      return;
    }

    const container = embedContainerRef.current;
    const insertedScriptClassName = 'simorgh-embed-script';

    container
      .querySelectorAll(`script:not(.${insertedScriptClassName})`)
      .forEach(currentScript => {
        const script = currentScript as HTMLScriptElement;

        const scriptElement = document.createElement('script');
        scriptElement.className = insertedScriptClassName;

        Array.from(script.attributes).forEach(({ name, value }) => {
          scriptElement.setAttribute(name, value);
        });

        if (!script.hasAttribute('async')) {
          scriptElement.async = false;
        }

        if (script.textContent?.trim()) {
          scriptElement.text = script.textContent;
        }

        script.replaceWith(scriptElement);
      });
  }, [embeddableContent, isLite]);

  if (!embeddableContent) return null;

  if (isLite) return null;

  // TODO: Remove this logic after the US Elections
  const isUSElectionBanner = embeddableContent.includes(
    '2024-us-presidential-election-banner',
  );

  // TODO: Remove this logic after the US Elections
  if (isUSElectionBanner && !electionBannerEnabled) return null;

  return (
    <div
      ref={embedContainerRef}
      css={[
        styles.embedDiv,
        isUSElectionBanner && styles.electionBannerOverrides,
      ]}
      suppressHydrationWarning
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: embeddableContent }}
      data-testid="embed"
    />
  );
};

export default EmbedHtml;
