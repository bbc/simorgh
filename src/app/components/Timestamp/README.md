# (package name) &middot; (badges)

## Description
Displays a timestamp, with suitable semantic markup.

## When to use this component
For displaying an isolated timestamp, separate from the other content in an article or cell.

## When not to use this component
When an date or time is to be displayed inline inside a paragraph.

## Installation
`npm install (package-name)`

## Props

| Argument   | Type   | Required | Default | Example                  |
|------------|--------|----------|---------|--------------------------|
| `datetime` | string | Yes      | N/A     | `2006-09-24T05:00-07:00` |
| `prefix`   | node   | No       | null    | `Last updated `          |
| `suffix`   | node   | No       | null    | `, over 3 months ago`    |

## Usage
```
const WrappingContainer = () => (
  <Timestamp
    datetime="2019-03-01T14:00+00:00"
    prefix="This article was first published "
    suffix="."
    >
    Friday 1 March 2019
  </Timestamp>
);
```

## Accessibility notes
The usage of the semantic `time` element within this component can result in strange behaviours when using assistive technology such as Voiceover for iOS. Specifically, it results in a "text splitting" behaviour, where any text in the prefix is read out, but the value inside the semantic `time` element require an additional swipe before being read out.

However, as we heavily encourage the use of this semantic element, and want to ensure it's usage is in line with [the W3C examples](https://www.w3.org/TR/html51/textlevel-semantics.html#the-time-element), we feel this compromise is necessary.

<!-- ## Roadmap
(what we have planned for this component) -->

<!-- ## Additional notes
(link to any relevant ADRs) -->

## Contributing

Psammead is completely open source. We are grateful for any contributions, whether they be new components, bug fixes or general improvements. Please see our primary contributing guide which can be found at [the root of the Psammead respository](https://github.com/bbc/psammead/blob/latest/CONTRIBUTING.md).

### [Code of Conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md)

We welcome feedback and help on this work. By participating in this project, you agree to abide by the [code of conduct](https://github.com/bbc/psammead/blob/latest/CODE_OF_CONDUCT.md). Please take a moment to read it.

### License

Psammead is [Apache 2.0 licensed](https://github.com/bbc/psammead/blob/latest/LICENSE).