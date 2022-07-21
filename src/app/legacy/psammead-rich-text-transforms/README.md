# `rich-text-transforms`

This libary provides two functions, one that takes candyXML, and one that takes
a string. Both return rich text as structured JSON. The structured JSON uses the
format that Optimo have opted for, see BBC confluence `cps/Optimo+Client+Text+Blocks` for more details.

## Supported block types

The Optimo format consists of an array of nested ‘blocks’, where a block has a
“type” (such as paragraph), and “model”. The model can contain fields such as
‘text’, attributes on that text - such as ‘bold’. The model can also contain an
array of child blocks.

There are many types of block available.

Currently, this library only supports the following block types:

- paragraph
- text
- urlLink
- fragment

## Installation

```jsx
npm install #legacy/psammead-locales --save
```

## Usage

### `candyXmlToRichText`

```
const { candyXmlToRichText } = require("#legacy/psammead-rich-text-transforms/src")

const xml = `
<body>
  <paragraph>
    Read more:
      <link>
        <caption>foo</caption>
        <url href="https://example.com/foo"/>
      </link> bar <bold>baz</bold>
  </paragraph>
</body>
`

candyXmlToRichText(xml)
```

```json
 {
  "type": "text",
    "model": {
      "blocks": [
      {
        "type": "paragraph",
        "model": {
          "text": "Read more: foo bar baz",
          "blocks": [
            {
              "type": "fragment",
              "model": {
                "text": "Read more: ",
                "attributes": []
              }
            },
          {
            "type": "urlLink",
            "model": {
              "text": "foo",
              "locator": "https://example.com/foo",
              "blocks": [
                {
                  "type": "fragment",
                  "model": {
                    "text": "foo",
                    "attributes": []
                  }
                }
              ]
            }
          },
          {
            "type": "fragment",
            "model": {
              "text": " bar ",
              "attributes": []
            }
          },
          {
            "type": "fragment",
            "model": {
              "text": "baz",
              "attributes": [
                "bold"
              ]
            }
          }
        ]
      }
    }
  ]
}
```

### `stringToRichText`

```
const stringToRichText = require("#legacy/psammead-rich-text-transforms/src")

const string = "Hello world"

stringToRichText(string)
```

```json
{
  "type": "text",
  "model": {
    "blocks": [
      {
        "type": "paragraph",
        "model": {
          "text": "Hello world",
          "blocks": [
            {
              "type": "fragment",
              "model": {
                "text": "Hello world",
                "attributes": []
              }
            }
          ]
        }
      }
    ]
  }
}
```

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).
