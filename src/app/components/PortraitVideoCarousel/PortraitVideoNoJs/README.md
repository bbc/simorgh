## Description

This internal component is rendered inside a `<noscript>` tag within the `PortraitVideoCarousel` to provide a graceful fallback message when JavaScript is disabled.

It ensures accessibility and usability for users browsing with scripts turned off, following the BBC GEL guidelines for media fallback messaging.

#### Responsibilities

- Displays a warning icon alongside a translatable no-JavaScript support message.
- Uses service-specific translations from `ServiceContext`, defaulting to the News service fallback if none is provided.
- Uses BBC-standard `Text` and `Warning` components for consistent styling and iconography.

#### Behaviour

- The content is not visible to users with JavaScript enabled.
- It renders statically via HTML to improve SEO and accessibility in no-JS environments.

#### Example HTML Output (when JS is disabled)

```html
<noscript>
  <div>
    <svg ... />
    <p>To view this content you need to enable JavaScript...</p>
  </div>
</noscript>
```
