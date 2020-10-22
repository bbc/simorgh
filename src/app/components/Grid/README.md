# Grid

## Usage

When using one of the extended Grid components, e.g. `FrontPageGrid`, if you wish to extend it using the `as` prop, following the Emotion migration you can now just pass the `as` prop to that component: emotion does not support `forwardedAs`.
e.g.
`<Grid as="main" role="main ....>...</Grid>`
`<FrontPageGrid as="main" role="main ....>...</FrontPageGrid>`
