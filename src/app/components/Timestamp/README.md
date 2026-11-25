# Timestamp

Renders already-formatted children in a semantic `time` element. `datetime` is
passed unchanged to the HTML `dateTime` attribute. `className` is forwarded for
consumer overrides; `padding` defaults to `true` and adds bottom spacing, with
double spacing when the timestamp is the last child.

SCSS Modules preserve service typography, PWA font overrides and dark-UI colours.
Consumer overrides must beat both the base and dark-UI selectors, rather than
relying on stylesheet order.

Use `#app/components/TimestampContainer` when the date still needs formatting.
