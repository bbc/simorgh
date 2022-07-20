# Optimo Promos

## Description

A component following the `Compound Component` pattern to build Promo's in Optimo pages.
The Compound Component pattern can be found inside the `index.jsx` entry point with the following Primitive Components:

> ### Components in this folder:
>
> - Content
> - Heading
> - Image
> - Link
> - Lists
> - MediaIndicator
>
> ### Components outside this folders:
>
> - Timestamp
> - LiveLabel
> - Image

The entry point also wraps the Promo children in a React Context Provider, and provides the following parameters:

> - service
> - to
> - ariaLabelledBy
> - eventTrackingData
> - mediaType

## Props

| Name              | type                           | Description                                                               |
| ----------------- | ------------------------------ | ------------------------------------------------------------------------- |
| children          | node                           | The content included between the opening and closing tags of the Promo    |
| to                | string                         | The url for the Promo's link                                              |
| ariaLabelledBy    | string                         | Id used to fix a bug in TalkBack.                                         |
| mediaType         | string                         | The media type of the page Promoed                                        |
| eventTrackingData | shape({componentName: string}) | Tracking data needed for ati to track view and click of individual promos |

## A11y notes

Due to a `TalkBack` bug causing the assistive technology to read each span on separate swipes/gestures, we need to pass a unique ariaLabelledBy to fix this bug. This a11y Id is used as id for the parent span holding the Promo's text and as aria-labelledby for the parent link of the text span.
More [here](https://github.com/bbc/simorgh/issues/9652)

## Example ltr/rtl

### Promo with Image, Title/Link Wrapped in White Box, and Timestamp

```javascript
<Promo>
  <Promo
    to={assetUri}
    ariaLabelledBy={ariaLabelledBy}
    eventTrackingData={eventTrackingData}
  >
    <Promo.Image
      src={src}
      altText={altText}
      srcset={primarySrcset}
      fallbackSrcset={fallbackSrcset}
      width={width}
      height={height}
    />
    <Promo.ContentWrapper>
      <Promo.Title as="h3" script={script}>
        <Promo.Link>
          <Promo.Content headline={headline} />
        </Promo.Link>
      </Promo.Title>
      <Promo.Timestamp>{timestamp}</Promo.Timestamp>
    </Promo.ContentWrapper>
  </Promo>
</Promo>
```

### Promo with Title/Link, Livelabel, Timestamp

```javascript
<Promo>
  <Promo
    to={assetUri}
    ariaLabelledBy={ariaLabelledBy}
    eventTrackingData={eventTrackingData}
  >
    <Promo.Title as="h3" script={script}>
    <Promo.Link>
    <Promo.LiveLabel
            liveText={liveLabel}
            ariaHidden={liveLabelIsEnglish}
            offScreenText={liveLabelIsEnglish ? 'Live' : null}
            >
        <Promo.Content headline={headline} />
        <Promo.LiveLabel/>
    </Promo.Link>
    </Promo.Title>

    <Promo.Timestamp>{timestamp}</Promo.Timestamp>
  </Promo>
</Promo>
```

### Promo with Title/Link, Livelabel, MediaLabel

```javascript
<Promo>
  <Promo
    to={assetUri}
    ariaLabelledBy={ariaLabelledBy}
    eventTrackingData={eventTrackingData}
  >
    <Promo.MediaIndicator />
    <Promo.Title as="div" script={script}>
      <Promo.Link>
        <Promo.Content headline={headline} />
      </Promo.Link>
    </Promo.Title>

    <Promo.Timestamp>{timestamp}</Promo.Timestamp>
  </Promo>
</Promo>
```
