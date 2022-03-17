import React from 'react';
import { Helmet } from 'react-helmet';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';
import { CanonicalSocialEmbed, AmpSocialEmbed } from './index';
import fixtures from './fixtures';

storiesOf('Components/SocialEmbed/Canonical', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(withServicesKnob())
  .add(
    'Default',
    ({ service }) => {
      const fixture = select('Fixture', fixtures, fixtures.twitter);
      const caption =
        fixture.source === 'youtube'
          ? {
              textPrefixVisuallyHidden: 'Video caption, ',
              text: 'Warning: Third party content may contain adverts',
            }
          : null;

      return (
        <CanonicalSocialEmbed
          provider={fixture.source}
          oEmbed={fixture.embed.oembed}
          skipLink={{
            text: 'Skip %provider_name% content',
            endTextId: 'skip-%provider%-content',
            endTextVisuallyHidden: 'End of %provider_name% content',
          }}
          fallback={{
            text: "Sorry but we're having trouble displaying this content",
            linkText: 'View content on %provider_name%',
            linkTextSuffixVisuallyHidden: ', external',
            linkHref: 'https://www.bbc.co.uk',
            warningText:
              'Warning: BBC is not responsible for third party content',
          }}
          service={service}
          caption={caption}
        />
      );
    },
    {
      notes,
    },
  )
  .add(
    'Unsupported Provider',
    ({ service }) => {
      return (
        <CanonicalSocialEmbed
          provider="unsupported"
          oEmbed={{ html: "<p>This won't be seen.</p>" }}
          skipLink={{
            text: 'Skip %provider_name% content',
            endTextId: 'skip-%provider%-content',
            endTextVisuallyHidden: 'End of %provider_name% content',
          }}
          fallback={{
            text: "Sorry but we're having trouble displaying this content",
            linkText: 'View content on %provider_name%',
            linkTextSuffixVisuallyHidden: ', external',
            linkHref: 'https://www.bbc.co.uk',
            warningText:
              'Warning: BBC is not responsible for third party content',
          }}
          service={service}
        />
      );
    },
    {
      notes,
    },
  )
  .add(
    'Empty Embed Response',
    ({ service }) => {
      const fixture = select('Fixture', fixtures, fixtures.twitter);
      const caption =
        fixture.source === 'youtube'
          ? {
              textPrefixVisuallyHidden: 'Video caption, ',
              text: 'Warning: Third party content may contain adverts',
            }
          : null;

      return (
        <CanonicalSocialEmbed
          provider={fixture.source}
          skipLink={{
            text: 'Skip %provider_name% content',
            endTextId: 'skip-%provider%-content',
            endTextVisuallyHidden: 'End of %provider_name% content',
          }}
          fallback={{
            text: "Sorry but we're having trouble displaying this content",
            linkText: 'View content on %provider_name%',
            linkTextSuffixVisuallyHidden: ', external',
            linkHref: 'https://www.bbc.co.uk',
            warningText:
              'Warning: BBC is not responsible for third party content',
          }}
          service={service}
          caption={caption}
        />
      );
    },
    {
      notes,
    },
  );

storiesOf('Components/SocialEmbed/AMP', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .addDecorator(withServicesKnob())
  .addDecorator(story => (
    <>
      <Helmet htmlAttributes={{ amp: true }}>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        <link rel="canonical" href="https://www.bbc.co.uk/news" />
        <script async src="https://cdn.ampproject.org/v0.js" />
      </Helmet>
      {story()}
    </>
  ))
  .add(
    'Default',
    ({ service }) => {
      const fixture = select('Fixture', fixtures, fixtures.twitter);
      const caption =
        fixture.source === 'youtube'
          ? {
              textPrefixVisuallyHidden: 'Video caption, ',
              text: 'Warning: Third party content may contain adverts',
            }
          : null;

      return (
        <AmpSocialEmbed
          provider={fixture.source}
          id={fixture.id}
          skipLink={{
            text: 'Skip %provider_name% content',
            endTextId: 'skip-%provider%-content',
            endTextVisuallyHidden: 'End of %provider_name% content',
          }}
          fallback={{
            text: "Sorry but we're having trouble displaying this content",
            linkText: 'View content on %provider_name%',
            linkTextSuffixVisuallyHidden: ', external',
            linkHref: 'https://www.bbc.co.uk',
            warningText:
              'Warning: BBC is not responsible for third party content',
          }}
          service={service}
          caption={caption}
        />
      );
    },
    {
      notes,
    },
  )
  .add(
    'Unsupported Provider',
    ({ service }) => {
      return (
        <AmpSocialEmbed
          provider="unsupported"
          id="thiswontbeused"
          skipLink={{
            text: 'Skip %provider_name% content',
            endTextId: 'skip-%provider%-content',
            endTextVisuallyHidden: 'End of %provider_name% content',
          }}
          fallback={{
            text: "Sorry but we're having trouble displaying this content",
            linkText: 'View content on %provider_name%',
            linkTextSuffixVisuallyHidden: ', external',
            linkHref: 'https://www.bbc.co.uk',
            warningText:
              'Warning: BBC is not responsible for third party content',
          }}
          service={service}
        />
      );
    },
    {
      notes,
    },
  );
