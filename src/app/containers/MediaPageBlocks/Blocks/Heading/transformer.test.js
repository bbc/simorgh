import transformer from './transformer';

const scaffold = input => Object.assign({
    shortHeadline: 'Default Short Headline',
    headline: 'Default headline'
}, input);

const scenarios = [{
    name: 'Basic case',
    input: scaffold({ headline: 'WS Media' }),
    output: 'WS Media'
}, {
    name: 'Internal HTML Tag',
    input: scaffold({ headline: 'WS <bold>Media</bold> Headline' }),
    output: 'WS Media Headline'
}, {
    name: 'Surrounding HTML Tag',
    input: scaffold({ headline: '<bold>WS Media</bold>' }),
    output: 'WS Media'
}, {
    name: 'Self closing HTML',
    input: scaffold({ headline: 'WS<hr /> Media' }),
    output: 'WS Media'
}, {
    name: 'Malformed HTML A',
    input: scaffold({ headline: 'WS<bold> Media' }),
    output: 'WS Media'
}, {
    name: 'Malformed HTML B',
    input: scaffold({ headline: 'WS<bold> Media</em>' }),
    output: 'WS Media'
}, {
    name: 'Quotes',
    input: scaffold({ headline: 'WS \"Media\"' }),
    output: 'WS "Media"'
}, {
    name: 'Special Characters',
    input: scaffold({ headline: 'WS Media þ ¼ © M' }),
    output: 'WS Media þ ¼ © M'
}, {
    name: 'Chaos',
    input: scaffold({ headline: 'WS<hr /> Media © \"Quote\" Boldy <bold>McBoldFace</bold></em>' }),
    output: 'WS Media © "Quote" Boldy McBoldFace'
}];

describe('Headline Transformer', () => {
    scenarios.forEach((scenario) => {
        it(`Handles ${scenario.name}`, () => {
            expect(transformer(scenario.input)).toBe(scenario.output);
        })
    })
})