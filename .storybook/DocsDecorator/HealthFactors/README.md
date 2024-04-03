## Description

Component health measures whether a component is in a good enough state to be shown to the audience. Component health appears on each component’s Docs page in Storybook as a status message followed by a breakdown of the various health factors used to determine the status. The purpose of creating this component was to share documentation and progress of our components as well as to make it easy to access such documentation. Note that this component is only meant to be used in storybook. For more background information, please refer to the [WebCore component health documentation](https://paper.dropbox.com/doc/What-is-component-health--BuCB6QLGB9RwuFHNMI_eq7esAg-2qI1jQCZhKoaGVX4TVlCf).

## Props

| Name     | type                  | Description                                                                                                                                                       |
| -------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| metadata | HealthFactorsMetadata | A metadata.json is created for every component's directory. This metadata.json describes the three main pieces of documentation that makes the component healthy. |

## Usage

### Component Health

Differently from other components, a version of the component health is already displayed in every storybook's documentation, and by default it will be displayed as follows:

<img width="1024" alt="Screenshot 2022-12-01 at 11 40 56" src="https://user-images.githubusercontent.com/90621252/205078485-3bc1fc1f-bb72-4a33-8b83-c70aa034784e.png"/>

Therefore all that needs to be done is to update the documentation status metadata that it is displaying with the correct url's and progression status. To do that you will first need to create a metadata.json file inside the component's folder you are creating. This should look like this:

```json
{
  "alpha": true,
  "lastUpdated": {
    "day": 1,
    "month": "December",
    "year": 2022
  },
  "uxAccessibilityDoc": {
    "done": true,
    "reference": {
      "url": "https://paper.dropbox.com/doc/Health-check-and-Health-check-summary-Screen-reader-UX--BuAOCrYE_8ZZvAuOT8zngPaAAg-y8T4oXU2Qe0ZjeQiwwnSE",
      "label": "Screen Reader UX"
    }
  },
  "acceptanceCriteria": {
    "done": true,
    "reference": {
      "url": "https://paper.dropbox.com/doc/Health-check-Health-check-summary-AAC--BTgPGZnrl~p5Fe0NhAfxYfTsAg-zxLRZFPMHGB5SQOtDB6NQ",
      "label": "Accessibility Acceptance Criteria"
    }
  },
  "swarm": {
    "done": false,
    "reference": {
      "url": "",
      "label": "A11y swarm notes"
    }
  }
}
```

Once you have created and updated the above with data inherent to the component you are creating, create a storybook file index.stories.jsx/tsx. This storybook file works just like any other storybook, and just like any other storybook file it will have a default export describing the storybook's story. As shown below, this default export can be enhanced to pass the metadata file to ComponentHealth:

```javascript
// import the json file you just created
import metadata from './metadata.json';

export default {
  title: 'components/OptimoPromos/TopStoriesSections',
  component: TopStoriesSection,
  parameters: {
    metadata, // attach the metadata to the default export parameters.
  },
};
```

This will result into storybook displaying:

<img width="1019" alt="Screenshot 2022-12-01 at 11 41 11" src="https://user-images.githubusercontent.com/90621252/205078611-5ee3c973-4bde-4ca0-a117-4ca911e08ebf.png"/>

### With written documentation

With the storybook addon-docs, you can also display your documentation and component health together. To do that, create a README.md file and write the component's documentation as you normally would. Now we need to display this documentation in the storybook docs section along with ComponentHealth. To achieve this, similarly as adding the component health, we have to add the following to the default export in `index.stories.jsx/tsx`:

```javascript
import metadata from './metadata.json';
import md from './README.md'; // import the documentation

export default {
  title: 'components/OptimoPromos/TopStoriesSections',
  component: TopStoriesSection,
  parameters: {
    metadata,
    docs: {
      page: md, // and pass it down into parameters.docs as showned.
    },
  },
};
```

And like this you have a storybook documentation page that looks as follows:

<img width="1063" alt="Screenshot 2022-12-01 at 14 32 20" src="https://user-images.githubusercontent.com/90621252/205079307-2b4d7a89-99cc-4192-99c1-ed55d67a87b9.png"/>

## Implementation

Everything looks cool and hopefully clear at this point. But how does this work behind the scenes? Where does this data that you are passing end up?

We begin our journey at '.storybook/preview.js' which is a storybook's configuration. More specifically, we can find an export of the storybook's default addon parameters. In this export you will see the following line of code that captures the storybook's context and children:

```
docs: {
    container: ({ context, children }) => DocsDecorator({ context, children }),
  }
```

The context holds all the information that Storybook uses to create a story. Specifically, it will pass the parameters object containing the metadata that we need. On the other hand, the children hold the README.md file that you previously provided. These parameters will then be passed to the DocsDecorator component (.storybook/DocsDecorator/index.tsx).

```
<DocsContainer context={context}>
  {isComponentDoc && (
    <ThemeProvider service="news" variant="default">
      <Title>{title}</Title>
      <HealthFactors metadata={metadata} />
    </ThemeProvider>
  )}
  {children}
</DocsContainer>
```

The main use of this component is to wrap the ComponentHealth with the ThemeProvider and the DocsContainer. The latter can be seen as a canvas that Storybook uses to display content in the docs tab of every story. We use this DocsContainer to display our ComponentHealth and README.md documentation.

Furthermore, this component will process and pass the metadata and the children to the HealthFactors component which will finally display the component health for your story.

Lastly, this file controls to which storybook folders the ComponentHealth should be applied by using the isExcempt function found in .storybook/helpers/healthFactors:

```javascript
export const isExempt = context => {
  const EXEMPTED = ['docs', 'coding standards', 'new components'];

  const kind = path(['kind'], context) as string;
  if (!kind) return false;

  const lowerCaseKind = kind.toLowerCase();

  const regexPatter = RegExp(
    EXEMPTED.map(folderName => `^${folderName}/.*`).join('|'),
    'g',
  );

  return regexPatter.test(lowerCaseKind);
};
```

This is done for every story contained in the blobs described in '.storybook/main.js'.
