import { fixturePromos } from '#pages/TopicPage/fixtures';

export default () => {
  return {
    status: 200,
    pageData: {
      title: 'hello world',
      promos: fixturePromos(),
    },
  };
};
