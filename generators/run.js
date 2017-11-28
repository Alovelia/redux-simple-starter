const app = require('./app');

(async () => {
  const answers = await app.prompting();
  app.writing(answers);
})();
