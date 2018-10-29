# Lib

This directory contains core files and references used across the application.

NB This is not a global styles directory. Global styles should be avoided in all cases, because of the use of Styled Components.

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
| Long Primer  | 0.9375        | 1.125           | 0.9375        | 1.125           | 0.875         | 1.125           | Image caption & Video caption & Onward journey timestamps        |
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
| Long Primer  | 15            | 18              | 15            | 18              | 14            | 18              | Image caption & Video caption & Onward journey timestamps        |
| Brevier      | 14            | 16              | 14            | 18              | 13            | 16              | Article timestamps                                               |
| Minion       | 12            | 16              | 12            | 16              | 12            | 16              | Article category                                                 |

# Layout requirements

As per the [GEL grid Guidelines](https://www.bbc.co.uk/gel/guidelines/grid) we have the following columns:

- 240px - 399px (6 column) 
- 400px - 599px (6 column)
- 600px - 1007px (6 column)
- 1008px - 1279px (8 column)
- 1280px+ (10 column)

The following is a breakdown of the article layout design for given breakpoints:

**Between 1px - 599px**

- left and right margin of 8px
- article content full width of the page EG: all columns used
- *See Figures 1 and 2*

**Between 600px - 1007px**

- left and right margin of 16px
- of 6 columns the article body content spans the central 4
- *See Figure 3*

**Between 1008px - 1279px**

- left and right margin of 16px
- the 8 columns are restricted to a width of 1008px
  EG: at a 1208px viewport the layout should be { 100px | 8 columns | 100px } where the 100px are flexible making up the difference between the 1008px columns max width and the viewport
- of 8 columns the article body content spans the central 6
- *See Figure 4*

**Above 1280px**

- left and right margin of 16px
- the 10 columns are restricted to a width of 1280px
  EG: at a 1400px viewport the layout should be { 60px | 10 columns | 60px } where the 60px are flexible making up the difference between the 1280px columns max width and the viewport
- of 10 columns the article body content spans the central 6
- *See Figure 5*

## Product requirements

We have requirements for components within the article body to go "full bleed" in which they will break out of all defined columns and fill the entire viewport. This is simple to achieve for viewports under 1008px as the columns span the entire width of the viewport, however for viewports greater than 1007px this is more complex as we need to limit the max width of the columns whilst still supporting the ability for individual components to expand outside of the max width. For details see "article layout design for given breakpoints" in Layout Requirements.

We also want flexiblity when placing components such as a single onward journey, and potentially adverts or similar, alongside the article body content. In the future the placement of this type of component will be content aware and potentially personalised. This requires another level of flexibilty.

See Figure 7 for an example of the potential layout we may have to support. 

## Problems

As we want content to go "full bleed" we cannot use max-width to define the 1008|1280px column layouts. Also as full bleed spans to the very edge of the viewport each individual component will need to know about the layout margins.

## Solution

This is where CSS grid comes in.

Using grid we can statically define the 1008|1280px column layouts while having a flexible additional column either side of the main column layout. This also reduces the need for having a grid within a grid which would cause issues where both the parent and child would need matching CSS to meet the "full bleed" requirement.

See Figure 6 or the code pen https://codepen.io/phil-lee/full/zmjaMO/

This then allows every component to be aware of the viewport width, allowing it to go "full bleed", while also being aware of the UX grid layout for rendering within the article body content.

In terms of components such as the single onward journey which need very flexible placement we are also helped out by using CSS grid because of it's ability to span across all rows and columns with simple CSS.

## Additional content

* [Investigation PR](https://github.com/BBC-News/simorgh/pull/824)
* [Layout flexibilty example](https://codepen.io/phil-lee/pen/NOMzmB)
* [Solution example detailing columns](https://codepen.io/phil-lee/full/zmjaMO/)

### Figure 1 - Article grid layout at 240px
<img width="240" alt="Screenshot showing the article layout at 240px" src="https://user-images.githubusercontent.com/7791726/47645523-327e7f00-db69-11e8-9d79-b3bb59cc5cba.png">

### Figure 2 - Article grid layout at 400px
<img width="400" alt="Screenshot showing the article layout at 400px" src="https://user-images.githubusercontent.com/7791726/47645641-8ab58100-db69-11e8-9643-a6c8686673d0.png">

### Figure 3 - Article grid layout at 600px
<img width="600" alt="Screenshot showing the article layout at 600px" src="https://user-images.githubusercontent.com/7791726/47645696-b0db2100-db69-11e8-93bc-3c600077e101.png">

### Figure 4 - Article grid layout at 1008px
<img width="1008" alt="Screenshot showing the article layout at 1008px" src="https://user-images.githubusercontent.com/7791726/47646167-fa783b80-db6a-11e8-9767-d87e61602683.png">

### Figure 5 - Article grid layout at 1280px
<img width="1280" alt="Screenshot showing the article layout at 1280px" src="https://user-images.githubusercontent.com/7791726/47646276-517e1080-db6b-11e8-8fe2-e4b83c26d2fd.png">

### Figure 6 - Screenshot highlighting the CSS Grid solution
<img width="1280" alt="Screenshot detailing the use of columns" src="https://user-images.githubusercontent.com/7791726/47646334-868a6300-db6b-11e8-972a-281e94d31491.png">

### Figure 7 - Screenshot of potential future layouts
<img width="1424" alt="Screenshot of the potential complex layouts we may support in the future" src="https://user-images.githubusercontent.com/7791726/47646694-99e9fe00-db6c-11e8-8d42-82315b5e93e8.png">
