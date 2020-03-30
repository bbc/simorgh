// Serialises a JavaScript object to a JSON string in a way that is safe for
// output in an HTML `script` tag, suggested by
// https://uploadcare.com/blog/vulnerability-in-html-design/
//
// See also:
// https://html.spec.whatwg.org/multipage/scripting.html#restrictions-for-contents-of-script-elements

export default obj => JSON.stringify(obj).replace(/</g, '\\u003c');
