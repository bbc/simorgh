# REMs vs EMs for spacing
REMs and EMs can be used for spacing (padding/margins/line height). We chose REMs on the basis of clarity and no perceptible difference in rendering.

## REMs
The REM unit represents a size relative to the root element (e.g., the `font-size` of `<html>`). Combined with the root element's font-size, a REM represents the root element's initial value. 

### Advantages
Spacing will be global across Simorgh

Ease of understanding: When we create a constant expressed in REMs (e.g. `export const GEL_SPACING = '0.5rem'`) that value, or values based of that value, stay constant, which adds simplicity from a developer perspective.

```
// assumes the root font size is 16px, which is a common browser default

export const GEL_SPACING = '0.5rem'; // 8px
export const GEL_SPACING_DBL = GEL_SPACING * 2; // 16px 
export const GEL_SPACING_QUAD = GEL_SPACING * 4; // 32px
```

REMs offer an easy transition from our current code base's use of pixels for padding.

### Disadvantages
REMs are not supported in IE8: https://caniuse.com/#search=REMs, but REMs are used on our production sites. IE8 is not a supported browser. However, spacing doesn't appear to break in IE8 when REMs are used: 

Pixels for padding:
![latest-px-win7-ie8](https://user-images.githubusercontent.com/916416/43953551-46638fea-9c91-11e8-851a-ef74c2cee458.PNG)

REMs for padding
![rems-win7-ie8](https://user-images.githubusercontent.com/916416/43953553-46899366-9c91-11e8-8335-a0c833a4c5c9.PNG)


<hr/>

## EMs
"Represents the calculated font-size of the element. If used on the font-size property itself, it represents the inherited font-size of the element."(MDN)

### Advantages
EMs allow for more modularity of components, because spacing will be relative to local font-size. 

### Disadvantages
Potential complexity of understanding due to nesting components, depending on how font size is implemented. It's harder to immediately understand what the current font size is that the EM is relative to: 
```
    <style>
        .parent {
            font-size: 16px;
        }

        h1 {
            font-size: 2em;
        }

        .child {
            font-size: 0.75em; /* 12px */
            padding-bottom: 1em; /* 12px - confusing! because it's relative to the current font-size, 
            0.5em, which is 12px. */
        }

    </style>

    <div class="parent">
        <h1>I am a heading and I should be 32px</h1>
        <div class="child">
            I am the child and I should be 12px
        </div>
    </div>

```

## a11y
* Both are resizable. 
* Both are used in production.
* Both require a default font-size set in a resizable unit. An example implementation would be `font-size: 100%` on the `html` element. If, as authors, we provide a resizable default font-size alongside using REMs/EMs for spacing, we give user agents the ability to resize spacing. 

## Further reading: 
<ul>
    <li>https://developer.mozilla.org/en-US/docs/Web/CSS/length</li>
    <li>https://engageinteractive.co.uk/blog/em-vs-rem-vs-px</li>
    <li>https://zellwk.com/blog/rem-vs-em/</li>
</ul>

This spike arises from https://github.com/bbc-news/simorgh/issues/407.
