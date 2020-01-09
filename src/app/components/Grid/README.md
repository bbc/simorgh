# Grid

## Usage

When using one of the extended Grid components, e.g. `FrontPageGrid`, if you wish to extend it using the `as` prop, you'll need to use `forwardedAs`. This prop enables you to pass down the element down further than one level.

e.g.
`<Grid forwardedAs="main" role="main ....>...</Grid>`
`<FrontPageGrid forwardedAs="main" role="main ....>...</FrontPageGrid>`
