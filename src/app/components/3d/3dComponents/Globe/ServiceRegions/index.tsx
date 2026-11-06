import { use } from 'react';
import CallToActionLink from '#app/components/CallToActionLink';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.module.scss';

type Props = {
  selectedRegionId: string | null;
};

const ServiceRegions = ({ selectedRegionId }: Props) => {
  const { translations, collapsibleNavigation } = use(ServiceContext);
  const copy = translations.serviceDiscovery;
  const region = collapsibleNavigation?.find(
    section => section.id === selectedRegionId && section.links?.length,
  );

  if (!copy) return null;

  return (
    <section className={styles.panel}>
      <Heading className={styles.title} level={2}>
        {region?.title ?? copy.title}
      </Heading>

      {region ? (
        <ul className={styles.list}>
          {region.links?.map(link => (
            <li
              key={link.id}
              lang={link.lang}
              translate={link.disableTranslation ? 'no' : undefined}
            >
              <CallToActionLink
                url={link.href}
                size="pica"
                fontVariant="sansRegular"
                className={styles.link}
              >
                <CallToActionLink.Text
                  className={styles.linkText}
                  shouldUnderlineOnHoverFocus
                >
                  {/* bdi isolates the label's text direction from surrounding content. */}
                  <bdi>{link.label}</bdi>
                </CallToActionLink.Text>
              </CallToActionLink>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <Paragraph className={styles.intro}>{copy.intro}</Paragraph>
          <CallToActionLink url={copy.learnMoreUrl} className={styles.cta}>
            <CallToActionLink.ButtonLikeWrapper className={styles.ctaInner}>
              <CallToActionLink.Text
                className={styles.ctaText}
                shouldUnderlineOnHoverFocus
              >
                {copy.learnMoreLabel}
                <CallToActionLink.Chevron />
              </CallToActionLink.Text>
            </CallToActionLink.ButtonLikeWrapper>
          </CallToActionLink>
        </>
      )}
    </section>
  );
};

export default ServiceRegions;
