## Description

A Byline component with all relevant article's author information.

## Props

| Name     | type     | Description                                                                              |
| -------- | -------- | ---------------------------------------------------------------------------------------- |
| blocks   | object   | byline type content                                                                      |
| children | JSX Node | used for passing the Timestamp component as a listItem on the article information region |

## Example ltr/rtl

### Without Timestamp

```javascript
const fixtureBlocks = {type: "byline", model: blocks: [...]}

<Byline blocks={fixtureBlocks}/>
```

### With Timestamp

```javascript
<Byline blocks={fixtureBlocks}>
  <Timestamp
    firstPublished={1660831432}
    lastPublished={1660831432}
    popOut={false}
  />
</Byline>
```
