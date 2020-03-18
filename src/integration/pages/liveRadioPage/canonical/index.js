import runCommonTests from './common';
import runUserTests from './user';

export default ({ app, pageId }) => {
  describe('When I am on canonical', () => {
    // runCommonTests(app);
    if (pageId === 'Korean live radio') {
      runUserTests({
        app,
        headlineText: 'BBC 코리아 라디오',
        summaryText: '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
      });
    }
  });
};
