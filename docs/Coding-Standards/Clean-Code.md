# Coding standards: Clean code

## Place code as close to where it's relevant as possible (Colocation)

### Why?

This principle improves codebase maintainability by ensuring that when we delete components we no longer use, we delete all code associated with the component and do not leave utilities, styles, state, hooks etc lying around in the codebase. This ensures the team does not waste effort and cognitive load by continuing to maintain code and tests for code when it is not actually used by the application.

### How?

Variables and functions should be declared close to their usage. A component’s child components, styles, hooks, utilities and tests should be kept together in the component’s directory unless they are used by more than one component.

#### Even if you think something could be shared in the future, it is still recommended to colocate until it can be used in more than one place.

### Resources

- https://kentcdodds.com/blog/colocation

## Code commenting

### Why?

In some cases, comments can be extremely helpful, but they often produce noise and misleading or conflicting information about what the code really does.

Code with comments also creates a maintenance problem because as code is updated, we may also need to update the comments to reflect what the code does. On the other hand, readable code with no comments does not have this problem.

### How?

Follow these guidelines to help you decide when to comment code and when to take a different approach such as refactoring the code to be more readable.

#### Always try to explain yourself in code

TODO

❌

```js
// analytics endpoint
const URL = 'https://analytics.bbc.com';

✅

```js
const ANALYTICS_ENDPOINT = 'https://analytics.bbc.com';

#### Don't add obvious noise

Good code _mostly_ documents itself.

❌

```js
function hashIt(data) {
  // The hash
  let hash = 0;

  // Length of string
  const length = data.length;

  // Loop through every character in data
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = data.charCodeAt(i);
    // Make the hash
    hash = (hash << 5) - hash + char;
    // Convert to 32-bit integer
    hash &= hash;
  }
}
```

✅

```js
function hashIt(data) {
  let hash = 0;
  const length = data.length;

  for (let i = 0; i < length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;

    // Convert to 32-bit integer
    hash &= hash;
  }
}
```

#### Don't comment out code. Just remove

Version control exists for a reason. Leave old code in your history.

❌

```js
doStuff();
// doOtherStuff();
// doSomeMoreStuff();
// doSoMuchStuff();
```

✅

```js
doStuff();
```

#### Use as explanation of intent

TODO

❌

```js
// add bad example
```

✅

```js
// This is the detection method recommended by opera
// See https://dev.opera.com/articles/opera-mini-and-javascript/
const isOperaMini = () =>
  Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
```

#### Use as clarification of code

TODO

❌

```js
// add bad example
```

✅

```js
// Tigrinya is misspelt in the API response - see [API-1234]
const mapServiceToProducer = (service) => {
  if (service === 'tigrinia') return 'tigrinya';
  return producer;
};
```

#### Use as warning of consequences

TODO

❌

```js
// Changing this is risky
const CDN_URL = 'https://cdn.bbc.com';
```

✅

```js
// add good example
```

## Functions

### Why?

TODO

### How?

#### Keep functions small

Small functions are easier to understand. Ideally a function should do just one thing and the thing it does should be in the name of the function.

❌

```js
// add bad example
```

✅

```js
// add good example
```

#### Have fewer function arguments

Try to limit the number of arguments in a function. When possible, try to avoid two or more arguments. More arguments make a function harder to read and understand. It is also more difficult to test, since they create the need to write test cases for every combination of arguments.

❌

```js
// add bad example
```

✅

```js
// add good example
```

#### Use object destructuring for functions that require multiple arguments

Sometimes you can’t avoid having multiple function arguments. When this is the case it is recommended to use 1 object argument with object destructuring syntax. This has a few advantages over multiple arguments:

- When someone looks at the function signature, it's immediately clear what properties are being used.
- It can be used to simulate named parameters.
- Destructuring also clones the specified primitive values of the argument object passed into the function. This can help prevent side effects. Note: objects and arrays that are destructured from the argument object are NOT cloned.
- Linters can warn you about unused properties, which would be impossible without destructuring.
- The order of object properties does not matter whereas the order of function arguments does matter. Especially useful when some parameters are optional and you can leave them out of the object rather than pass `undefined` or `null` as an argument when the optional argument is not the last argument.

❌

```js
function createMenu(title, body, buttonText, cancellable) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true);
```

✅

```js
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  cancellable: true
  buttonText: "Baz",
  body: "Bar",
  title: "Foo",
});
```

#### Avoid flag arguments

A flag argument is a kind of function argument that tells the function to carry out a different operation depending on its value. By design, they are doing more than one thing. If the flag is true, then run a block. Otherwise, another. Instead, you should split the function into two different functions.

❌

```js
const makeBooking = (customer, isPremium) => {
  if (isPremium) {
    // logic for premium booking
  } else {
    // logic for regular booking
  }
};
```

✅

```js
const makeRegularBooking = customer => {
  // logic for regular booking
};

const makePremiumBooking = customer => {
  // logic for premium booking
};
```

#### Write pure functions

A function is called a pure function if it always returns the same result when given the same argument values and it has no side effects like modifying an argument or a global variable.

Pure functions are also extremely independent meaning they are easy to move around, refactor, and reorganise in your code, making your applications more flexible and adaptable to future changes. It also makes them immune to bugs that have to do with shared mutable state.

❌

```js
// add bad example
```

✅

```js
// add good example
```

#### Use consistent names

Avoid using different names to indicate the same concept. For example: get, fetch, retrieve in different functions and methods. Be consistent and use always the same name.
❌

```js
getArticles();
fetchUsers();
retrievePages();
```

✅

```js
getArticles();
getUsers();
getPages();
```

#### Follow standard conventions

Every team should follow a coding standard based on common industry norms. This coding standard should specify things like how to name variables, function, where to put braces, and so on.

Everyone on the team should follow these conventions.

#### KISS principle (Keep it Simple Stupid)

A design principle originating from the U.S. Navy that goes back to 1960 already. It states that most systems should be kept as simple as possible. Unnecessary complexity should be avoided. The question to ask when you are writing code is "can this be written in a simpler way?".

Simpler is always better. Reduce complexity as much as possible.

#### Favour readability

It's not because a machine can read your code that another human can. Particularly when working with multiple people on a project, always favour readability over conciseness. There's no point in having concise code if people don't understand it.

There are many ways to make your code more readable. Two examples are placing common numbers into well-named constants (e.g. `const CACHE_TIME = 200;`) and creating long names instead of shorter ones (e.g. `userHasFormAccess` over `canAccess`, which doesn't tell as much).

#### Scout rule

The scout rule is “Always leave the campground cleaner than you found it”. There are many ways to apply the scout rule to code, it doesn’t have to be something big. You can rename a variable to a more meaningful name, get rid of a small duplication or break up a long function. Small changes over a long time can make a big difference.

#### Resources

- https://x-team.com/blog/principles-clean-code/
- https://www.goodreads.com/book/show/8677004-the-art-of-readable-code
