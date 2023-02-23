## HealthFactorsSidebar

### Description

Component used in Sidebar label to display a label with icon summarising the health factors status of a story.

### Props

| Name     | type                  | Description                                                                                                                                                       |
| -------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| metadata | HealthFactorsMetadata | A metadata.json is created for every component's directory. This metadata.json describes the three main pieces of documentation that makes the component healthy. |
| name     | string                | story name                                                                                                                                                        |

### Usage

```javascript
metadata = {
  uxAccessibilityDoc: {
    done: true,
  },
  acceptanceCriteria: {
    done: true,
  },
  swarm: {
    done: false,
  },
};

<HealthFactorsSidebarLabel metadata={metadata} name="component name" />;
```

## Storybook addon

Listed below are the three major steps that have been taken to create this sidebar addon; for more informations on how to create a storybook addon refer to [Write an addon](https://storybook.js.org/docs/react/addons/writing-addons) storyboook's documentation:

- Create the `.storybook/SidebarLabel/register.tsx` file; This file registers the new addon and adds an entrypoint for our custom sidebar label.
- Create the `.storybook/SidebarLabel/preset.cjs` file. This file holds the preset information needed for storybook to hook the new addon, and is needed to pass the `.storybook/SidebarLabel/register.tsx` information to storybook.
- Add the new './SidebarLabel/preset.cjs' to the .storybook/main.js module export settings.
  For more information on how to create a new storybook addon refer to the storybook documentation.

## SidebarLabel

### Description

By following the steps above, storybook is able to access the SidebarLabel component. This component takes in a story item and uses the `useStorybookApi` hook to retrieve the metadata needed to decide if the sidebar label should display the health factors icon summary, or if it should default to the base text.

### Props

| Name | type   | Description            |
| ---- | ------ | ---------------------- |
| item | Object | Storybook story object |

### Usage

Since item is a story item, then this component can only be utilised under a storybook addon:

```javascript
const ADDON_ID = 'bbc/component-health-sidebar';

addons.register(ADDON_ID, () => {
  addons.setConfig({
    sidebar: {
      renderLabel: item => {
        return <SidebarLabel item={item} />;
      },
    },
  });
});
```
