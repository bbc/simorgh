# CurationMessageBanner

An applied compound component that renders a `MessageBanner` within a labelled `<section>` landmark, used on curation-based pages (e.g. Topic pages, Home pages). It maps a curation item whose `visualStyle` is `BANNER` into the shared `MessageBanner` compound component, adding a semantic `<h2>` heading and a surrounding `region` landmark for accessibility.

## Props

| Name               | Type                | Required | Description                                                                    |
| ------------------ | ------------------- | -------- | ------------------------------------------------------------------------------ |
| `id`               | `string`            | Yes      | Unique identifier used as the heading `id`, section `aria-labelledby` and `data-testid` |
| `heading`          | `string`            | Yes      | The `<h2>` title of the banner                                                 |
| `description`      | `string`            | No       | Subtext rendered as a paragraph inside the banner                              |
| `link`             | `string`            | Yes      | Href for the call-to-action link                                               |
| `linkText`         | `string`            | Yes      | Visible text for the call-to-action link                                       |
| `image`            | `string`            | No       | Image URL containing a `{width}` placeholder for responsive srcset generation  |
| `eventTrackingData`| `EventTrackingData` | No       | Analytics tracking data passed through to the `MessageBanner`                  |

## A11y notes

- The `<section>` uses `role="region"` with `aria-labelledby` pointing to the `<h2>` heading, creating a named landmark that screen reader users can navigate to directly.
- The heading is always rendered at `<h2>` level, assuming it sits within a `<h1>`-titled page.
- The banner image is decorative (`alt=""`).

## Usage

```tsx
<CurationMessageBanner
  id="follow-us-banner"
  heading="Follow BBC News Kyrgyz on social media"
  description="Get the latest news delivered directly to your feed."
  link="https://www.bbc.com/kyrgyz"
  linkText="Follow us"
  image="https://ichef.bbci.co.uk/ace/ws/{width}/example.png"
  eventTrackingData={eventTrackingData}
/>
```

### RTL usage

The component inherits direction from the surrounding page context and requires no additional configuration.

## Component hierarchy

- **Compound component**: `MessageBanner` (`src/app/components/MessageBanner`)
- **Applied compound component** (this component): `CurationMessageBanner`
