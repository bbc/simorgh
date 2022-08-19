# Coding standards: Naming conventions

## Name things consistently

By enforcing a convention and naming things consistently, we accomplish two things: discoverability and understanding.

1. Discoverability: How quickly can someone find a folder, file, component or function they need to change?
2. Understanding: How fast can someone look at our code and understand what it is they're looking at?

#### Use PascalCase when naming a component.

❌

```jsx
const topicPromo = () => <div />;
const radio_schedule = () => <div />;
const IMAGE_WITH_PLACEHOLDER = () => <div />;
```

✅

```jsx
const TopicPromo = () => <div />;
const RadioSchedule = () => <div />;
const ImageWithPlaceholder = () => <div />;
```

#### Give a component a descriptive name rather something too generic or naming a component after an HTML element.

❌

```jsx
const Component = () => <div />;
const A = ({ to, children }) => <a href={to}>{children}</a>;
```

✅

```jsx
const TopicPromo = () => <div />;
const InlineLink = ({ to, children }) => <a href={to}>{children}</a>;
```

#### Avoid using the type of entity in naming. The entity type should already be obvious from other naming conventions e.g. PascalCase for components or `use` prefix for React Hooks.

❌

```jsx
const TopicPromoComponent = () => <div />;
const useToggleHook = () => {};
const getPathHelper = () => {};
```

✅

```jsx
const TopicPromo = () => <div />;
const useToggle = () => {};
const getPath = () => {};
```

#### The definition name and directory name should be identical. This makes it easier to locate code.

❌

```jsx
// topic-promo/index.jsx
const TopicPromo = () => <div />;

// schedule/index.jsx
const RadioSchedule = () => <div />;
```

✅

```jsx
// TopicPromo/index.jsx
const TopicPromo = () => <div />;

// RadioSchedule/index.jsx
const RadioSchedule = () => <div />;
```

#### Component test filenames should be identical to the component filename with `.test` preceding the file extension. This makes it easier to locate tests for the component.

❌

```jsx
TopicPromo; // index.js; // the component filename
TopicPromo; // TopicPromoTest.js; // the component test filename
```

✅

```jsx
TopicPromo; // index.js; // the component filename
TopicPromo; // index.test.js; // the component test filename
```

#### Component and component test filenames should use the `.tsx` file extension. This makes it easier to identify which files in the codebase are components.

❌

```jsx
TopicPromo; // index.js;
TopicPromo; // index.test.js;
```

✅

```jsx
TopicPromo; // index.tsx;
TopicPromo; // index.test.tsx;
```

#### Use camelCase when naming variables, functions and methods.

❌

```jsx
let PAGE_TYPE;
const GetPageType = () => {};
```

✅

```jsx
let pageType;
const getPageType = () => {};
```

#### Use SCREAMING_SNAKE_CASE when naming constants to indicate the value is a [primitive type](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) and will point at the same value throughout the application.

❌

```jsx
const appEnv = 'test';
```

✅

```jsx
const APP_ENV = 'test';
```

#### Avoid using visually descriptive names for components. This is for 2 reasons:

1.  Components can change appearance depending on CSS breakpoints and the language content is presented in. e.g. `InlinePromo` may not look inline on mobile or `RightSection` may be a section on the left in right-to-left languages.
2.  Requirements often change which means we are likely to update the UI and the naming of the component may no longer match the appearance. For example, a component named `BlurredBg` that no longer has a blurred background image would incur an additional bit of mental thought processing every time we work on it.

Instead, try using semantic naming or naming that describes what the component is, or the component’s intended purpose, rather than how it looks.

❌

```jsx
const RightSection = () => {};
const BlurredBg = () => {};
```

✅

```jsx
const RelatedContent = () => {};
const HeaderImage = () => {};
```
