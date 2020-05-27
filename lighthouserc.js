module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:7080/news/articles/c0g992jmmkko'],
      startServerCommand: 'npm start',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
