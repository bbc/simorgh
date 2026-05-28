---
description: "Component Standards"
applyTo: "./src/app/components"
---
# Component Standards

## Rules
- Write self-documenting code. Try to avoid comments by using descriptive variable / function names, split functionality into smaller functions.
- We use React.
- We use Emotion for styling, adopting the object styles syntax so follow that syntax when writing CSS for components.

## Coding Best Practices
- Don't have lots of logic in your tests, prefer to test the output of a function rather than the implementation.
- Follow the KISS principle (Keep it Simple Stupid).
- Resuse our existing `./src/app/components/Heading`, `./src/app/components/Paragraph`, `./src/app/components/Text`, `./src/app/components/Image`, `./src/app/components/InlineLink` components as opposed to the native React alternatives. 

## Testing
- Use jest.
- For React component tests, import from `src/app/components/react-testing-library-with-providers.tsx` (not raw `@testing-library/react`) so required contexts are present.
- Avoid repeating test cases and use `it.each([])()` where possible. 

## Folder structure and examples
- Each React component should have its own folder, and each folder should contain:
  - An index.tsx file that contains the react component. 
  - An index.style.tsx file that contains styling related functions.  
  - An index.test.tsx file that contains the unit tests. 
  - An index.stories.tsx file that contains a respective storybook component. 
  - A metadata.json file that contains storybook related information.  
  - A good example of a component that follows these standards is `./src/app/components/ReadTime`
