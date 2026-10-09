# AccountHeader

Displays the account entry point in the header.

## Behaviour
- Shows **“Sign in”** when the user is signed out
- Shows **“Your Account”** when the user is signed in

## Variants
Styling is selected at runtime via the `variant` prop, so the component can render
correctly in both the legacy masthead and the new World Service navigation.

- `variant="legacy"` (default) — original masthead styling
- `variant="default"` — new navigation styling

## Data source
- Uses `AccountContext` to determine signed-in state
- Only renders where the `account` toggle enables IDCTA for the service (e.g. `hindi`)

## Storybook
- `Signed Out` / `Signed In` (legacy variant)
- `Signed Out New Nav` / `Signed In New Nav` (default variant)