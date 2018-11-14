# Header [![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)](https://simorghstorybook.now.sh/?selectedKind=Header)

### Description
This component functions as a wrapper for the [Brand](../Brand) component which is also used in the [Footer](../Footer). The wrapper is a HTML 'header' element with the 'role' of 'banner' for accessibility. This is component is distinct from brand as the 'header' HTML element is unique and cannot be reused elsewhere on the page.
	
### When to use this component
Header is designed to be used at the top of the document above all other content.

As this component uses the [Brand](../Brand) which consumes the service context via the [ServiceContextConsumer](../ServiceContextConsumer) component.

### Accessibility notes
HTML: 
Link (NB: Sits within header)

Announced text:
BBC News (Service name from brand)

Landmark:
Banner
