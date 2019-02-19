# Consent Banner

## Description

This is a prompt banner (often called a cookie banner). The text is defined via prop values, so it can be localised for different languages.

## Props

| Argument          | Type   | Required | Default | Example                             |
| ----------------- | ------ | -------- | ------- | ----------------------------------- |
| title             | string | yes      | -       | 'Heading text'                      |
| description       | string | yes      | -       | 'Description text'                  |
| accept            | string | yes      | -       | 'Accept'                            |
| reject            | string | yes      | -       | 'Reject'                            |
| acceptButtonProps | object | yes      | -       | { on: 'tap:consent-prompt.accept' } |
| rejectButtonProps | object | yes      | -       | { on: 'tap:consent-prompt.reject' } |
| promptId          | string | yes      | -       | 'consent-prompt'                    |

`promptId` should be a id value that is unique in the page, since it'll be used to show/hide the component.
`acceptButtonProps` & `rejectButtonProps` are to allow adding relevant event handlers to the Accept/Reject buttons.
