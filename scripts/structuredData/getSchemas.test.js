const getSchemas = require('./getSchemas');

const constructJsonData = pageType => {
  return {
    metadata: {
      type: pageType,
    },
  };
};

const constructMediaBlockWithFormat = format => {
  return {
    type: 'media',
    format,
  };
};

describe('getSchemas', () => {
  it('should return WebPage for Front Page', () => {
    const jsonData = constructJsonData('IDX');

    expect(getSchemas(jsonData)).toStrictEqual(['WebPage']);
  });

  it('should return Article for Photo Gallery Page', () => {
    const jsonData = constructJsonData('PGL');

    expect(getSchemas(jsonData)).toStrictEqual(['Article']);
  });

  it('should return RadioChannel for Live Radio Page', () => {
    const jsonData = constructJsonData('WS-LIVE');

    expect(getSchemas(jsonData)).toStrictEqual(['RadioChannel']);
  });

  it('should return Article for Article Page', () => {
    const jsonData = constructJsonData('article');

    expect(getSchemas(jsonData)).toStrictEqual(['Article']);
  });

  it('should return empty array for On Demand Radio Episode Page', () => {
    const jsonData = constructJsonData('WSRADIO');

    expect(getSchemas(jsonData)).toStrictEqual([]);
  });

  it('should return empty array for Unknown Page', () => {
    const jsonData = constructJsonData('unknown');

    expect(getSchemas(jsonData)).toStrictEqual([]);
  });

  describe('MAP', () => {
    const jsonForMAP = constructJsonData('MAP');

    it('should return Article and VideoObject for MAP with a video clip', () => {
      const jsonData = {
        ...jsonForMAP,
        promo: {
          media: {
            format: 'video',
          },
        },
      };

      expect(getSchemas(jsonData)).toStrictEqual(['Article', 'VideoObject']);
    });

    it('should return Article and AudioObject for MAP with an audio clip', () => {
      const jsonData = {
        ...jsonForMAP,
        promo: {
          media: {
            format: 'audio',
          },
        },
      };

      expect(getSchemas(jsonData)).toStrictEqual(['Article', 'AudioObject']);
    });
  });

  describe('STY', () => {
    const jsonForSTY = constructJsonData('STY');
    jsonForSTY.metadata = {
      ...jsonForSTY.metadata,
      blockTypes: [],
    };
    jsonForSTY.content = {
      blocks: [],
    };

    it('should return ReportageNewsArticle for STY with no media', () => {
      expect(getSchemas(jsonForSTY)).toStrictEqual(['ReportageNewsArticle']);
    });

    describe('with media', () => {
      const videoBlock = constructMediaBlockWithFormat('video');
      const audioBlock = constructMediaBlockWithFormat('audio');
      jsonForSTY.metadata.blockTypes = ['media'];
      const jsonData = { ...jsonForSTY };

      it('should return ReportageNewsArticle and VideoObject for STY with a single video clip', () => {
        jsonData.content.blocks = [videoBlock];

        expect(getSchemas(jsonData)).toStrictEqual([
          'ReportageNewsArticle',
          'VideoObject',
        ]);
      });

      it('should return ReportageNewsArticle and VideoObject for STY with a multiple video clips', () => {
        jsonData.content.blocks = [videoBlock, videoBlock];

        expect(getSchemas(jsonData)).toStrictEqual([
          'ReportageNewsArticle',
          'VideoObject',
        ]);
      });

      it('should return ReportageNewsArticle and AudioObject for STY with a single audio clip', () => {
        jsonData.content.blocks = [audioBlock];

        expect(getSchemas(jsonData)).toStrictEqual([
          'ReportageNewsArticle',
          'AudioObject',
        ]);
      });

      it('should return ReportageNewsArticle and AudioObject for STY with a multiple audio clips', () => {
        jsonData.content.blocks = [audioBlock, audioBlock];

        expect(getSchemas(jsonData)).toStrictEqual([
          'ReportageNewsArticle',
          'AudioObject',
        ]);
      });

      it('should return ReportageNewsArticle, AudioObject and VideoObject for STY with both a video and audio clip', () => {
        jsonData.content.blocks = [audioBlock, videoBlock];

        expect(getSchemas(jsonData)).toStrictEqual([
          'ReportageNewsArticle',
          'AudioObject',
          'VideoObject',
        ]);
      });

      it('should return ReportageNewsArticle, AudioObject and VideoObject for STY with combination of multiple video and audio clips', () => {
        jsonData.content.blocks = [
          audioBlock,
          videoBlock,
          videoBlock,
          audioBlock,
        ];

        expect(getSchemas(jsonData)).toStrictEqual([
          'ReportageNewsArticle',
          'AudioObject',
          'VideoObject',
        ]);
      });
    });
  });
});
