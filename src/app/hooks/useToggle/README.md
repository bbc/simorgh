# useToggle Hook

## Feature Toggles

Feature toggles are designed to be global (i.e not service specific) and are dependant on the application environment.
Feature toggles can be found in `src/app/lib/config/toggles`

### Using the useToggle Hook

```
import useToggle from './useToggle';

const Component = () => {
    const { enabled } = useToggle('foo')

    return enabled ? <h1>toggle enabled</h1> : <p>toggle disabled</p>
}

export default Component;
```

### Testing

When writing unit tests for components that use the `useToggle` hook, you should wrap the component in a ToggleContextProvider. Then pass to it a stub for the toggles as shown below in `defaultToggles`. This will ensure that the component's unit test is not impacted by changes in the actual toggle values.

```
const defaultToggles = {
  mediaPlayer: {
    enabled: true,
  },
};

<ToggleContextProvider
  value={{ toggleState: defaultToggles }}
  service="pidgin"
  origin="https://www.test.bbc.com"
>
  <YourComponent service="pidgin" />
</ToggleContextProvider>
```
