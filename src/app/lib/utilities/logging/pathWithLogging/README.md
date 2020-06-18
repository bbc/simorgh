# pathWithLogging
This is a utility module to combine safe retrieval of nested fields (similar to ramda's `path`) with the additional behavior that, if the field is undefined, create a log entry

The API is designed primarily for use with the getInitialData functions, where we have a large `pageData` object and are trying to pluck the fields we need for our pages:

## Usage

Create a getter by passing in the url, log category and page data for the page:

```javascript
import pathWithLogging from './';

const get = pathWithLogging('/bbc_dari_radio/123', 'radio-field-missing', pageData);
```

Call the getter for any field where, if the field is missing, we would like logging:

```javascript
return {
  id: get(['metadata', 'id']),
  title: get(['metadata', 'title'])
}
```

## Options
The "getter" function returned from `pathWithLogging` has a second parameter, where these options can be modified:

##### `logLevel`
The verbosity of the log message.  Logs are created with an `info` verbosity by default.  This can be modified with the help of importing the `LOG_LEVELS` object from the module:

```javascript
import pathWithLogging, { LOG_LEVELS } from './';
```

and then specifying a different log level in any call

```javascript
const get = pathWithLogging('/bbc_dari_radio/123', 'radio-field-missing', pageData);

return {
  id: get(['metadata', 'id']),  //  Uses LOG_LEVELS.INFO
  title: get(['metadata', 'title'], { logLevel: LOG_LEVELS.WARN }),
  description: get(['metadata', 'title'], { logLevel: LOG_LEVELS.ERROR })
}
```