# Lib

This directory contains core files and references used across the application.

The `./utilities` directory is where helpers and utiltiies used in production should be maintained, whereas non-production helpers and utilities should be stored in `../testHelpers`. Helpers nested within their containers or components is permitted, on the basis that that container or component is the only thing using said helper. If the helper needs to be used elsewhere, it should be moved to within its respective global-scope folder (`utilities` or `testHelpers`). The terms `utiltiies` and `helpers` are interchangable.

NB This is not a global styles directory. Global styles should be avoided in all cases, because of the use of Styled Components.

## Logging

Simorgh uses a library - winston - for logging. 

The logger requires `filename` as a parameter - which is written to the server log along with the timestamp e.g. `2020-04-02 18:07:09 info [server/index.jsx] ...`

To initialise the logger:

```
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);
```

There are 5 different log levels available - `error`, `warn`, `info`, `debug`, `verbose`.

The logger requires 2 parameters: `event` (string) and `message` (object). 

The event should be a constant, added to [logger.const.js](logger.const.js). When adding or updating values in this file, ensure that any relevant dashboards are also updated, as this information may be useful when investigating application issues.

The message should include detailed information, where possible, to help diagnose application issues.

Refer to [src/server/index.jsx](../../server/index.jsx) for implementation examples.

To log an error:
```
import { DATA_FETCH_ERROR } from '#lib/logger.const';

logger.error(DATA_FETCH_ERROR, {
    url: '/path/to/page',
    error: 'an error occurred fetching data from remote endpoint',
    status: 404,
});
```

The same format applies for the other log levels:
```
const message = {
    details: 'some additional information'
    status: 200,
}
```

```
logger.warn(EVENT_NAME, message);
```
```
logger.info(EVENT_NAME, message);
```
```
logger.debug(EVENT_NAME, message);
```
```
logger.verbose(EVENT_NAME, message);
```

## Typography

BBC products use the GEL guidelines for typography. See here: [http://www.bbc.co.uk/gel/guidelines/typography#type-sizes](http://www.bbc.co.uk/gel/guidelines/typography#type-sizes).
For Simorgh Articles, the typography types for groups A, B & D are used.
This is because group C, for touch devices, is not going to be implemented for the articles work, in keeping with previous projects.

Here are the font sizes and line heights in `em`s, assuming a base font size of 16px. The last column shows our usage of these types within our designs.

|              | Group A       | Group A         | Group B       | Group B         | Group D       | Group D         |                                                                  |
| :----------- | :------------ | :-------------- | :------------ | :-------------- | :------------ | :-------------- | :--------------------------------------------------------------- |
| **Type**     | **Font Size** | **Line Height** | **Font Size** | **Line Height** | **Font Size** | **Line Height** | **Article Usage**                                                |
| Canon        | 1.75          | 2               | 2             | 3.5             | 2.75          | 3               | Headline (h1)                                                    |
| Trafalgar    | 1.25          | 1.5             | 1.5           | 2.5             | 2             | 2.25            | Subheadline (h2)                                                 |
| Paragon      | 1.25          | 1.5             | 1.375         | 2               | 1.75          | 2               |                                                                  |
| Double Pica  | 1.25          | 1.5             | 1.25          | 1.875           | 1.5           | 1.75            |                                                                  |
| Great Primer | 1.125         | 1.375           | 1.125         | 1.5             | 1.25          | 1.5             | Heading for single onward journey box (e.g. More on Archaeology) |
| Body Copy    | 0.9375        | 1.25            | 1             | 1.5             | 1             | 1.375           | Body copy (p)                                                    |
| Pica         | 0.9375        | 1.25            | 1             | 1.375           | 1             | 1.25            | Headline for single onward journey                               |
| Long Primer  | 0.9375        | 1.125           | 0.9375        | 1.125           | 0.875         | 1.125           | Image caption & Video caption & onward journey timestamps        |
| Brevier      | 0.875         | 1               | 0.875         | 1.125           | 0.8125        | 1               | Article timestamps                                               |
| Minion       | 0.75          | 1               | 0.75          | 1               | 0.75          | 1               | Article category                                                 |

Here are the font sizes in `px`s:

|              | Group A       | Group A         | Group B       | Group B         | Group D       | Group D         |                                                                  |
| :----------- | :------------ | :-------------- | :------------ | :-------------- | :------------ | :-------------- | :--------------------------------------------------------------- |
| **Type**     | **Font Size** | **Line Height** | **Font Size** | **Line Height** | **Font Size** | **Line Height** | **Article Usage**                                                |
| Canon        | 28            | 32              | 32            | 36              | 44            | 48              | Headline (h1)                                                    |
| Trafalgar    | 20            | 24              | 24            | 28              | 32            | 36              | Subheadline (h2)                                                 |
| Paragon      | 20            | 24              | 22            | 26              | 28            | 32              |                                                                  |
| Double Pica  | 20            | 24              | 20            | 24              | 24            | 28              |                                                                  |
| Great Primer | 18            | 22              | 18            | 22              | 20            | 24              | Heading for single onward journey box (e.g. More on Archaeology) |
| Body Copy    | 15            | 20              | 16            | 22              | 16            | 22              | Body copy (p)                                                    |
| Pica         | 15            | 20              | 16            | 20              | 16            | 20              | Headline for single onward journey                               |
| Long Primer  | 15            | 18              | 15            | 18              | 14            | 18              | Image caption & Video caption & onward journey timestamps        |
| Brevier      | 14            | 16              | 14            | 18              | 13            | 16              | Article timestamps                                               |
| Minion       | 12            | 16              | 12            | 16              | 12            | 16              | Article category                                                 |

# Layout

## UX grid definition

As per the [GEL grid Guidelines](https://www.bbc.co.uk/gel/guidelines/grid) we have the following UX grid definition:

| Breakpoints     | Gutters | Margins | Grid width limitations |
| :-------------- | :------ | :------ | :--------------------- |
| 0px - 399px     | 8px     | 8px     | dynamic / full width   |
| 400px - 599px   | 8px     | 16px    | dynamic / full width   |
| 600px - 1007px  | 16px    | 16px    | dynamic / full width   |
| 1008px - 1280px | 16px    | 16px    | static / 1008px        |
| 1280px +        | 16px    | 16px    | static / 1280px        |

## Article layout requirements

In the article project we have requirements for items to span wider than the grid, these "full bleed" items will span the full width of the viewport effectively breaking out of the grid.

The article layout UX design has the following requirements:

| Breakpoints     | Columns | Content\* spans X columns |
| :-------------- | :------ | :------------------------ |
| 0px - 599px     | 6       | 6 of 6                    |
| 600px - 1007px  | 6       | 4 of 6                    |
| 1008px - 1280px | 8       | 6 of 8                    |
| 1280px +        | 10      | 6 of 10                   |

\* content contained within the grid, therefore not "full bleed"

## Our CSS grid implementation

Because of the above requirements we have a complex implementation of the grid mainly to support the "full bleed" component requirement.

To achieve this we have used CSS grid which allows us to define both static or responsive columns depending on the UX grid definition.

CSS Grid has the ability to add "grid-gaps" which are rendered inclusive of the grid as gaps between the columns/rows. This means we can directly use them as the gutters to match the UX grid.

Below 1008px we define all columns to be dynamic.

Above 1007px we statically define the widths of the columns due to the fact they are limited in the UX definition, which then allows us to have a dynamic column either side of the UX grid.
EG: In CSS grid values we can specific `grid-template-columns: 1fr repeat(10, minmax(0, ${staticColWidth})) 1fr;` where the `1fr`s are dynamic and the columns and `repeat()` are the static width columns.

The combination of the UX grid having margins prior to the column definitions and the product requirements for a "full bleed" component creates an interesting problem. We can't use CSS paddings or margins before the CSS grid implementation otherwise all components in the grid will be limited to the padding/margin and not able to go "full bleed". Our solution to this problem stems from the implementation of the static columns above 1007px - we can define a CSS grid that has an additional column either side of the UX defined columns so that the grid-gaps act both inbetween the columns as gutters and also outside of the grid as margins.
**NB: This implementation means at every viewport we have an additional column either side of the UX defined columns, often as a 0px column.**

Therefore to meet all requirements we implement the following CSS grid where gutters and margins are grid-gaps:

| Breakpoints     | Columns       | Gutters   | Margins   |
| :-------------- | :------------ | :-------- | :-------- |
| 0px - 399px     | 6 + 2 of 0px  | 5 of 8px  | 2 of 8px  |
| 400px - 599px   | 6 + 2 of 8px  | 5 of 8px  | 2 of 16px |
| 600px - 1007px  | 6 + 2 of 0px  | 5 of 16px | 2 of 16px |
| 1008px - 1280px | 8 + 2 of 1fr  | 7 of 16px | 2 of 16px |
| 1280px +        | 10 + 2 of 1fr | 9 of 16px | 2 of 16px |

- `6 + 2 of 0px` - is based on having a 0px column either side of UX grid so we can use CSS grid-gaps as the UX margin while allowing a grid item to be able to go "full bleed".
- `6 + 2 of 8px` - between 400px and 599px we have an 8px column either side of the UX grid so that the grid-gap (8px) and additional column (8px) combined meet the 16px UX margin.

### Nested grid usage

As of [#1680](https://github.com/bbc/simorgh/pull/1680) there are a new set of containers called `NestedGridItem`s. They occupy the same part of the grid as the corresponding `GridItemConstrained` but have an internal grid which maps to it.

<img width="1280" alt="A screenshot of nested grid items" src="https://user-images.githubusercontent.com/19362408/57520118-cdc09000-7314-11e9-8657-d5d798c0b018.png"> 
In this screenshot the external grid is a very pale blue and the internal grid of the `NestedGridItemLarge` is red.

To take advantage of this nested grid you can use the `NestedGridItem` that corresponds to the `GridItem` size you are using as a container. For example `NestedGridItemSmall` with `GridItemSmall` or `NestedGridItemLarge` with `GridItemLarge`.

`NestedGridItems` must have a `gridColumnStart` and `gridSpan` specified. `gridColumnStart` will usually be `1` (the first column of the main article content). `gridSpan` however may change across breakpoints and therefore can be specified as follows:

| grid item               | nested grid item                           | all breakpoints specified                                                                                      | some breakpoints specified                                                                |
| :---------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `gridItemSmall`         | `nestedGridItemSmall`                      | `<nestedGridItemSmall gridColumnStart="1" gridSpan={ group1: 5, group2: 3, group3: 3, group4: 3, group5: 7 }>` | `<nestedGridItemSmall gridColumnStart="1" gridSpan={ default: 3, group1: 5, group5: 7 }>` |
| `gridItemMedium`        | `nestedGridItemMedium gridColumnStart="1"` | `<nestedGridItemMedium gridColumnStart="1" gridSpan={ group3: 3, group4: 3, group5: 7 }>`                      | `<nestedGridItemMedium gridColumnStart="1" gridSpan={ default: 3, group5: 7 }>`           |  |
| `gridItemLarge`         | `nestedGridItemLarge gridColumnStart="1"`  | `<nestedGridItemLarge gridColumnStart="1" gridSpan={ group3: 5, group4: 5, group5: 10 }>`                      | `<nestedGridItemLarge gridColumnStart="1" gridSpan={ default: 5, group5: 10 }>`           |
| `gridItemLargeNoMargin` | `nestedGridItemLarge gridColumnStart="1"`  | `<nestedGridItemLarge gridColumnStart="1" gridSpan={ group3: 5, group4: 5, group5: 10 }>`                      | `<nestedGridItemLarge gridColumnStart="1" gridSpan={ default: 5, group5: 10 }>`           |

## TL;DR

- We work to a UX grid
- UX margins are exclusive of the UX column definition
- We have a requirement to allow some items to break out of the grid
- To achieve these requirement we've used CSS grid to define an additional column either side of the UX grid
- This [Codepen](https://codepen.io/phil-lee/full/MPMrzJ/) is a working demo

## Additional content

- [Investigation PR](https://github.com/bbc/simorgh/pull/824)
- [Statically defined columns for above 1280px example](https://codepen.io/phil-lee/full/zmjaMO/)

## Final note

The UX article grid is currently defined as follows:

<img width="720" alt="screen shot 2018-11-05 at 16 25 34" src="https://user-images.githubusercontent.com/7791726/48130054-402bb700-e283-11e8-92c8-b1f43c7a378e.png">

This said we currently don't have any use case, designs or required support for under 240px and therefore we are making a technical descision not to implement the single column and will have 6 columns from 0 - 1007px viewports.

### Figure 1 - Article grid layout at 375px

<img width="375" alt="Screenshot showing the article layout at 375px" src="https://user-images.githubusercontent.com/7791726/48127457-a6144080-e27b-11e8-9f8c-dc827e1ca4a0.png">

### Figure 2 - Article grid layout at 500px

<img width="500" alt="Screenshot showing the article layout at 500px" src="https://user-images.githubusercontent.com/7791726/47848281-c3519680-ddc5-11e8-91fd-ec354b179cc1.png">

### Figure 3 - Article grid layout at 600px

<img width="600" alt="Screenshot showing the article layout at 600px" src="https://user-images.githubusercontent.com/7791726/47645696-b0db2100-db69-11e8-93bc-3c600077e101.png">

### Figure 4 - Article grid layout at 1008px

<img width="1008" alt="Screenshot showing the article layout at 1008px" src="https://user-images.githubusercontent.com/7791726/47646167-fa783b80-db6a-11e8-9767-d87e61602683.png">

### Figure 5 - Article grid layout at 1280px

<img width="1280" alt="Screenshot showing the article layout at 1280px" src="https://user-images.githubusercontent.com/7791726/47646276-517e1080-db6b-11e8-8fe2-e4b83c26d2fd.png">

### Figure 6 - Very large viewport example of breakpoints

<img width="1280" alt="Example of how component should render for very wide viewports EG: 2200px" src="https://user-images.githubusercontent.com/7791726/48010164-f9b84a00-e114-11e8-9c3b-d77e8ac06696.jpg">
