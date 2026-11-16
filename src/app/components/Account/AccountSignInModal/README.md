# AccountSignInModal

A sign-in dialog whose copy and account actions are supplied by its caller.
The modal does not read service translations or account URLs from context.

Required props are `title`, `description`, `closeLabel`, `signInText`,
`registerText` and `onClose`. Optional props include `signInAccessibleLabel`,
`separatorText`, `signInUrl`, `registerUrl`, `onSignInClick` and
`onRegisterClick`. Click callbacks receive the link event and do not replace
the existing click tracking or navigation unless they call `preventDefault()`,
which cancels both.

Callers select the appropriate translated copy (for example, save-article or
follow-topic copy) and pass account URLs from `AccountContext`. These URLs
include the originating page as the return destination. There is no `context`
prop and no default copy in the modal.

Dismissal is enabled by default via the close button, Escape and outside click.
`onClose` lets the caller update visibility. Focus trapping, restoration and
scroll locking remain internal to the dialog. With `isDismissible={false}`,
dismissal is disabled but sign-in and registration links remain available.
This option does not restrict access to article content.

Storybook examples cover save-article, follow-topic, custom copy, existing Hindi
translations and non-dismissible presentation. Story callbacks prevent
navigation to the example URLs and are visible in the Actions panel.
The Hindi example uses existing save-article copy, not newly approved campaign
wording.
