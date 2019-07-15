# Toggle Container

## Overview

The toggle container is a component that is designed to wrap other components and render the child component based on a feature toggle.

## Feature Toggles

At the time of writing feature toggles are designed to be global (i.e not service specific) and are dependant on the application environment.
Feature toggles can be found in `src/app/lib/config/toggles`

## Usage

To conditionally render a component based on the value of a toggle you can either wrap the child component or use the custom `useToggle` hook.

### Wrapping a child component

```
<Toggle toggleName="foo">
    <ChildComponent>
        <p>I will be rendered if the enabled value of toggle: foo is set to true</p>
    </ChildComponent>
</Toggle>
```

### Rendering a fallback UI component if the toggle value is set to false

```
<Toggle toggleName="foo" fallbackComponent={<h1>I am the fallback UI</h1>}>
    <ChildComponent>
        <p>If the toggle foo is set to false the fallbackComponent will be rendered here instead.</p>
    </ChildComponent>
</Toggle>
```

### Using the useToggle Hook

```
import useToggle from './useToggle';

const Component = () => {
    const { enabled } = useToggle('foo')

    return enabled ? <h1>toggle enabled</h1> : <p>toggle disabled</p>
}

export default Component;
```
