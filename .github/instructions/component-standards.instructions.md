---
description: "Component Standards"
applyTo: "./src/app/components"
---
# Component Standards

## Rules
- Write self-documenting code. Try to avoid comments by using descriptive variable / function names, split functionality into smaller functions.
- We use React.
- We use Emotion for styling and we use the object styles syntax.
- Components should:
  - Be functional components
  - Use typed props
  - Avoid internal side effects

## Coding Best Practices
- Don't have lots of logic in your tests, prefer to test the output of a function rather than the implementation.
- Follow the KISS principle (Keep it Simple Stupid).
- Resuse our existing `./src/app/components/Heading`, `./src/app/components/Paragraph`, `./src/app/components/Text`, `./src/app/components/Image`, `./src/app/components/InlineLink` components as opposed to the native React alternatives. 

## Testing
- Use jest.
- For React component tests, import from `src/app/components/react-testing-library-with-providers.tsx` (not raw `@testing-library/react`) so required contexts are present.
- Avoid repeating test cases and use `it.each([])()` where possible. 

## Folder structure and examples
Each React component should have its own folder, and each folder should contain:
- An index.tsx file that contains the react component. 
- An index.style.tsx file that contains styling related functions.  
- An index.test.tsx file that contains the unit tests. 
- An index.stories.tsx file that contains a respective storybook component.
  - If you can use arg and argType parameters where necessary, but omit them for very basic components. 
- A metadata.json file that contains storybook and A11Y related information.
  - This contains links to A11Y related documents that engineers will manually write up.  
- A README.md file that contains a rough outline of what this component does.

Here is an example of a component called `HelloWorld`, that renders a formatted user defined text after a user defined number of milliseconds:

1. The component will go in `./src/app/components/HelloWorld`
2. The index.tsx file will contain the following code:
```
import { use, useEffect, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Text from '#app/components/Text';
import styles from './index.styles';
import Heading from '../Heading';

type HelloWorldProps = {
  textToRender: string;
  renderAfter: number;
};

export default ({ textToRender, renderAfter }: HelloWorldProps) => {
  const { service } = use(ServiceContext);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, renderAfter);

    return () => clearTimeout(timeout);
  }, [renderAfter]);

  if (!showText) return null;

  return (
    <>
      <Heading level={2}>You are on {service}</Heading>
      <Text css={styles.text} size="brevier">
        {textToRender}
      </Text>
    </>
  );
};
```

3. The index.style.tsx file will contain the following code:
```
import { css, Theme } from '@emotion/react';

export default {
  text: ({ palette }: Theme) =>
    css({
      color: palette.GREY_6,
    }),
};
```

4. The index.test.tsx file will contain the following code:
```
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import HelloWorld from '.';

jest.useFakeTimers();

describe('HelloWorld', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('formatting behaviour', () => {
    it.each([
      { text: 'Hello World' },
      { text: 'Goodbye World' },
      { text: 'Good Evevning World' },
    ])(`should render the service and the text $text`, async ({ text }) => {
      const { container } = await act(async () => {
        return render(<HelloWorld textToRender={text} renderAfter={1000} />, {
          service: 'pidgin',
        });
      });

      act(() => {
        jest.runAllTimers();
      });

      const resultingHeading = container.querySelector('h2');
      const resultingText = container.querySelector('span');

      expect(resultingHeading?.innerHTML).toBe('You are on pidgin');
      expect(resultingText?.innerHTML).toBe(text);
    });
  });
});
```

5. The index.stories.tsx file will contain the following code:
```
import HelloWorld from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import readme from './README.md';
import metadata from './metadata.json';

type HelloWorldProps = {
  textToRender: string;
  renderAfter: number;
};

const Component = ({ textToRender, renderAfter }: HelloWorldProps) => (
  <ServiceContextProvider service={'pidgin'}>
    <HelloWorld textToRender={textToRender} renderAfter={renderAfter} />
  </ServiceContextProvider>
);

export default {
  title: 'Components/HelloWorld',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
  args: {
    textToRender: 'Example Text',
    renderAfter: 1000,
  },
  argTypes:{
    renderAfter: {
      control: {
        type: 'select',
      },
      options: [1000, 2000, 3000, 4000],
    }
  }
};

export const ExampleHelloWorld = Component;
```

6. The metadata.json file will contain the following code:
```
{
  "alpha": true,
  "lastUpdated": {
    "day": "<Current Day>",
    "month": "<Current Month>",
    "year": "<Current Year>"
  },
  "uxAccessibilityDoc": {
    "done": true,
    "reference": {
      "url": "<Figma Document Link>",
      "label": "Screen Reader UX"
    }
  },
  "acceptanceCriteria": {
    "done": true,
    "reference": {
      "url": "<Dropbox Link>",
      "label": "Accessibility Acceptance Criteria"
    }
  },
  "swarm": {
    "done": true,
    "reference": {
      "url": "<Dropbox Link>",
      "label": "Accessibility Swarm Notes"
    }
  }
}
```

7. The README.md file will contain the following code:
```
## Description

Renders a formatted user defined text after a user defined number of milliseconds.

| Parameter    | type   | example           |
| ------------ | ------ | ----------------- |
| textToRender | string | "Hello Everyone!" |
| renderAfter  | number | 1000              |
```