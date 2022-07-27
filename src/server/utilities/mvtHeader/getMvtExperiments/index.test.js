import getMvtExperiments from '.';

const mockHeadersNoMvt = {
    'host': 'localhost:7080',
    'connection': 'keep-alive',
    'sec-fetch-mode': 'cors',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
};

const mockHeadersSingleMvt = {
    ...mockHeadersNoMvt,
    'mvt-simorgh_dark_mode': 'experiment;control',
}

const mockHeadersMultipleMvt = {
    ...mockHeadersSingleMvt,
    'mvt-simorgh_data_saving': 'saving',
    'mvt-simorgh_new_recs': 'new',
}

describe('getMvtExperiments', () => {
    it('should return an empty array when no mvt headers are in the request', () => {
        expect(getMvtExperiments(mockHeadersNoMvt)).toEqual([]);
    });

    it('should return an array of a single experiment object when a single mvt header is in the reponse', () => {
        expect(getMvtExperiments(mockHeadersSingleMvt)).toEqual([
            {
                "experimentName": "simorgh_dark_mode",
                "type": "experiment",
                "variation": "control",
            },
        ]);
    });

    it('should return an array of multiple experiment objects when multiple mvt headers are in the reponse', () => {
        expect(getMvtExperiments(mockHeadersMultipleMvt)).toEqual([
            {
                "experimentName": "simorgh_dark_mode",
                "type": "experiment",
                "variation": "control",
            },
            {
                "experimentName": "simorgh_data_saving",
                "variation": "saving",
            },
            {
                "experimentName": "simorgh_new_recs",
                "variation": "new",
            },
        ]);
    });

    it('should should create a type key when a string is present before a ; delimeter in the header content', () => {
        expect(getMvtExperiments(mockHeadersMultipleMvt)[0]).toHaveProperty('type');
    });

    it('should should not a type key when a string is present with no ; delimeter', () => {
        expect(getMvtExperiments(mockHeadersMultipleMvt)[1]).not.toHaveProperty('type');
    });

    it('should omit the mvt prefix from the experiement name', () => {
        expect(getMvtExperiments(mockHeadersMultipleMvt)[0]).toHaveProperty('experimentName', 'simorgh_dark_mode');
    });
});