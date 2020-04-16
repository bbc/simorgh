import { createAppendScriptByCode, createAppendScriptBySrc } from './index';

const SRC_1 =
  'https://news.test.files.bbci.co.uk/include/idt2/static/js/table.382de0dc.js';
const SRC_2 = 'https://cdn.jsdelivr.net/npm/js-hello-world@1.0.0/helloWorld.js';

const originalBodyAppend = document.body.append;

describe('createAppendScript', () => {
  beforeAll(() => {
    /**
     * mock document.body.append, to resolve for
     * scripts with src attributes, in 500ms
     */
    document.body.append = function appendElement(script) {
      if (script.src) {
        setTimeout(() => {
          if (typeof script.onload === 'function') {
            script.onload();
          }
        }, 500);
      }
      if (typeof originalBodyAppend === 'function') {
        originalBodyAppend.apply(document.body, [script]);
      }
    };
  });

  afterAll(() => {
    document.body.append = originalBodyAppend;
  });

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('byCode', () => {
    it('should be inserted in document.body', async () => {
      await createAppendScriptByCode(`console.log('hello world 1')`);
      await createAppendScriptByCode(`console.log('hello world 2')`);
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('bySrc', () => {
    it('should be inserted in document.body', async () => {
      await createAppendScriptBySrc(SRC_1);
      await createAppendScriptBySrc(SRC_2);
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('code then src', () => {
    it('should be inserted in document.body in the right order', async () => {
      await createAppendScriptByCode(`console.log('hello world 1')`);
      await createAppendScriptBySrc(SRC_1);
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('src then code', () => {
    it('should be inserted in document.body in the right order', async () => {
      await createAppendScriptBySrc(SRC_1);
      await createAppendScriptByCode(`console.log('hello world 1')`);
      expect(document.body).toMatchSnapshot();
    });
  });
});
