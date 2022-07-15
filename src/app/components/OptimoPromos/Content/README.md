# Promo Content

## Description

This is a promo component that takes in key features of the promo's content and returns a Title node that follows accessibiity criteria.

## Props

| Name           | type    | Description                                     |
| -------------- | ------- | ----------------------------------------------- |
| a11yId         | string  | Unique identifier used to fix a bug in TalkBack |
| mediaType      | string  | The media type of the pages Promoed             |
| mediaDuration  | string  | Media duration in `ISO 8601` format             |
| headline       | string  | Promo's title                                   |
| isPhotoGallery | boolean | Is the page promoed a photogallery?             |

## Example ltr/rtl

### Title only example

```javascript
<Content a11yId="uniqueId" headline="This it the promo title" />
```

Node Returned:

```html
<span id="uniqueId">This it the promo title</span>
```

### mediaType example

```javascript
<Content
  a11yId="uniqueId"
  mediaType="video"
  mediaDuration="PT20S"
  headline="This it the promo title"
/>
```

Node Returned:

```html
<span role="text" id="uniqueId">
  <span aria-hidden="true">Video, </span>
  <span>This it the promo title</span>
  <span arria-hidden="true">, Duration, 00,20</span>
</span>
```

### Photogallery example

```javascript
<Content a11yId="uniqueId" headline="This it the promo title" isPhotoGallery />
```

Node Returned:

```html
<span role="text" id="uniqueId">
  <span aria-hidden="true">Photogallery, </span>
  <span>This it the promo title</span>
</span>
```
