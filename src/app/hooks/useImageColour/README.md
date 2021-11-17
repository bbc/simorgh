# `useImageColour` Hook

This is a hook that returns colour information for an image provided by a URL. This is primarily designed for dynamically selecting a colour for use in styling some other element. For example, the colour behind the text in this component was chosen based on the photo above it:

![Screenshot](./screenshot.png)

## Prior Work

**Prototype Storybook**:
https://5d28eb3fe163f6002046d6fa-jmtbbocxpt.chromatic.com/?path=/story/fancy-promos--so-fancy

**Prototype Image Analyser**:
https://github.com/bbc/simorgh/blob/36307f36ea6417b0c8f405477e3490fb142877a9/src/app/components/FancyPromos/withImageAnalyser.jsx
(this is implemented as a HoC, although I think it should be a hook in our production version)

**Prototype Contrast Calculation**:
https://github.com/bbc/simorgh/blob/36307f36ea6417b0c8f405477e3490fb142877a9/src/app/components/FancyPromos/utils.js

## High Level Proposal

Third party libraries exist that could do the image analysis for us. For example, the prototype uses node-vibrant: https://github.com/Vibrant-Colors/node-vibrant

This library is also being used by the BBC Home team, so it has been battle tested, and I suggest we use it too. Whatever library we choose, we need to bring this into our application / the react ecosystem. I think the best way of doing that is a hook, as described in the "API Proposal" section below.

Additionally, our requirements include calculating the colour contrast of generated colours against input colours. For example, if a developer wants to generate a colour to be a background for text, they will want some control over the colour selection process, to ensure a colour that has a good contrast ratio to their text is selected.

Libraries also exist for that, but we could just create that ourselves to remove the dependency. Example code is in the prototype, which uses this formula from W3C: https://www.w3.org/TR/WCAG20-TECHS/G17.html

## Client Side Only

It does not seem worthwhile trying to make this run on our end.

**If we do it in advance on the server:**

- We have no obvious way to tell when a new image needs processed
- We have no obvious place to store the results of processing this image

**If we do it at runtime on the server:**

- We haven't determined the server performance impact - at minimum, we will be blocking the critical path for our server's response behind an iChef request and response
- The initial use of this will be for use within an experiment. Our experiments are currently client side - we don't have no way of knowing if the request the server is making will be for a user in the experiment

So, I'm proposing this hook only runs on client side. This will cause a colour change after the page hydrates, but it is unlikely to be an issue. Changing from a semi-transparant dark background to another semi-transparant dark background is very subtle and, when implemented as a gradual change via CSS animation, it is barely even noticeable.

## Basic Usage / API Proposal

```javascript
import useImageColours from './';

const MyComponent = () => {
  const output = useImageColours('http://placekitten.com/200/300');

  return JSON.stringify(output);
};
```

## Input

The first argument to the hook is a link to the image to be used.

- For us to be able to download the image, the server must respond with appropriate CORS headers. BBC services, including iChef, do include the required headers.
- Any image size beyond approximately 20 x 20 pixels is unnecessary. Unless a larger version of the image is being downloaded anyway for some other use, generally using a very small image will conserve bandwidth

##### `options`

The hook accepts a second, optional argument. This argument can contain various configuration options:

- `contrastColour` - A hexidecimal colour string, eg `"#ff0005"` or RGB array, eg `[255, 0, 5]`. If provided, each colour in the `colours` array returned from the hook will include a `contrast` number that compares the contrast of the generated colour to this `contrastColour`. This calculation uses the process described here: https://www.w3.org/TR/WCAG20-TECHS/G17.html
- `minimumContrast` - An integer that filters the returned colours to only those that meet this minimum contrast ratio value. Colours will be compared against the `constrastColour` above. If `contrastColour` is not provided, white (`#fff`) will be used.
- `disabled` - Hooks cannot be called conditionally (see The Rules of Hooks: https://reactjs.org/docs/hooks-rules.html). Conditionally setting this boolean to `true` will prevent it from analysing any input URLs.
- `fallbackColour` - A hexidecimal colour string, eg `"#ff0005"` or RGB array, eg `[255, 0, 5]`. This will be returned when the hook is first loading, when it has encountered an error, when `disabled` is set to true, or when it was unable to find any colours that match the `minimumContrast` value.

## Output

The hook returns an object with the following keys:

###### `colour`

An object containing the selected colour. This object has the following keys:

- `hex` - A string representing the colours hexadecimal value, eg `"#ff0005"`
- `rgb` - An array representing the colour's red, green and blue components, eg `[255, 0, 5]`
- `isFallback` - A boolean representing whether this colour was the `fallbackColour` passed in the input options
- `contrast` - A number representing the contrast ratio between this colour and the colour provided as the `contrastColour` in the input options. If that option was not provided, `constrast` will be null. This calculation uses the process described here: https://www.w3.org/TR/WCAG20-TECHS/G17.html

###### `isLoading`

A boolean that will be true if the hook is currently analysing an image. Note that changing the URL passed to the hook when this value is `true` will have no effect.

###### `error`

Will be null if no error has occured, or an error string if something has gone wrong. See the section on Error Handling below.

## Advanced Usage

```javascript
import styled from '@emotion/styled';
import { C_GHOST, C_EBON } from '@bbc/psammead';
import useImageAnalyser from './';

const MyElement = styled.div`
  color: ${C_EBON};
  background: ${props => props.background.hex};
`;

const MyComponent = () => {
  const analyseImages = useToggle('image-analysis');
  const options = {
    minimumContrast: 7,
    contrastColour: C_EBON,
    fallbackColour: C_GHOST,
    disabled: !analyseImages,
  };
  const { colour } = useImageAnalyser(
    'http://placekitten.com/200/300',
    options,
  );

  return <MyElement background={colour}>Hello World</MyElement>;
};
```

## Graceful Fallbacks and Error Handling

This technique is not possible on every browser we support, therefore we need to be mindful of error handling and graceful fallbacks.

When we encounter issues, it will still return an object as described above. The differences are that `colours` will be an array containing one item - the `fallbackColour`, or black if `fallbackColour` was not provided.

Additionally, the object will have an `error` key, with one of several possible error constants

- `NO_WEBWORKER_SUPPORT` - The browser does not support web workers, which is required for this hook.
- `NO_CANVAS_SUPPORT` - The browser does not support canvas, which is required for this hook.
- `NO_ACCESS` - The hook was unable to access the provided image. This is generally due to the response not being a `200`, or not including `CORS` headers.
- `NO_COLOURS` - The hook was unable to generate a colour palette for this image. Known edge cases where this can occur include single pixel images, and images that are entirely white.

These error codes are available on a named export called `errors`:

```javascript
import useImageColours, { errors } from './';

const MyComponent = () => {
  const { error } = useImageColours('http://placekitten.com/200/300');
  if (error === errors.NO_ACCESS) {
    //
  }
};
```
