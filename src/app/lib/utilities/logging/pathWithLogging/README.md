# pathWithLogging
This is a utility module that combines safe retrieval of nested fields (similar to ramda's `path`) with the additional behavior that, if the field is undefined, a log entry is created

The module is designed primarily for use with the `getInitialData` functions which we specify for each page.

These functions have a large JSON object (normally called `pageData`) from which we pluck the fields we need to render the page.  Where certain fields are missing from the API response, we want to be alerted.

This module is a generalised implementation for creating that behavior.

## Usage

Create a getter by passing in the URL, Log Category and Data for the page we're on:

```javascript
import pathWithLogging from './';

const get = pathWithLogging('/bbc_dari_radio/liveradio', 'radio-field-missing', pageData);
```

Call the getter for any field where, if the field is missing, we would like logging:

```javascript
return {
  id: get(['metadata', 'id']),
  title: get(['metadata', 'title'])
}
```

## Options
The "getter" function returned from `pathWithLogging` has a second parameter, where the following options can be modified:

##### `logLevel` (default: info)
The verbosity of the log message.  Logs are created with an `info` verbosity by default.  This can be modified by importing the `LOG_LEVELS` object from the module:

```javascript
import pathWithLogging, { LOG_LEVELS } from './';
```

and then specifying a different log level for any field

```javascript
const get = pathWithLogging('/bbc_dari_radio/123', 'radio-field-missing', pageData);

return {
  id: get(['metadata', 'id']),  //  Uses LOG_LEVELS.INFO
  title: get(['metadata', 'title'], { logLevel: LOG_LEVELS.WARN }),
  description: get(['metadata', 'title'], { logLevel: LOG_LEVELS.ERROR })
}
```