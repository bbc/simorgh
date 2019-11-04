# Grid

## Usage

When using one of the extended Grid components, e.g. `GelPageGrid`, if you wish to extend it using the `as` prop, you'll need to use `forwardedAs`. This prop enables you to pass down the element down futher than one level.

e.g. 
`<Grid as="main" role="main ....>...</Grid>`
`<GelPageGrid forwardedAs="main" role="main ....>...</GelPageGrid>`