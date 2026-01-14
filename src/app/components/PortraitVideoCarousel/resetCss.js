const resetCss = `
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
	display: block;
}

:root {
  interpolate-size: allow-keywords;
}

body {
	line-height: 1;
	text-size-adjust: none;
}

ol, ul {
	list-style: none;
}

blockquote, q {
	quotes: none;
}

blockquote::before, blockquote::after,
q::before, q::after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

button {
	appearance: none;
	margin: 0; /* reset for safari */
	padding: 0;
	background: none;
	border-radius: 0;
	border: 0;
	font-family: inherit;
	color: inherit;
}
`;

// eslint-disable-next-line import/prefer-default-export
export { resetCss };
