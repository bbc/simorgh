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
