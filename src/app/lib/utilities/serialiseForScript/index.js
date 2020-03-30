// Serialises a JavaScript object to a JSON string in a way that is safe for
// output in a `script` tag without confusing the HTML parser
//
// The approach used is simply to replace literal less-than characters ('<') with
// an equivalent Unicode escape sequence. For more detail see this blog post:
// https://uploadcare.com/blog/vulnerability-in-html-design/
//
// See also:
// https://html.spec.whatwg.org/multipage/scripting.html#restrictions-for-contents-of-script-elements

export default obj => obj && JSON.stringify(obj).replace(/</g, '\\u003c');
