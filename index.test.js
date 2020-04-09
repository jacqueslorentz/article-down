const articledown = require('./index');

const BAD_ARG_ERROR = 'Bad argument sent, must be a non empty string';
const BAD_URL_ERROR = url => `Url ${url} is not found`;

test('Send good url', async () => {
  const url = 'https://medium.com/@johndevore/i-am-fine-a19b36867a33';
  return expect(await articledown(url)).toMatchObject({
    link: 'https://medium.com/@johndevore/i-am-fine-a19b36867a33',
    title: 'I Am Fine',
    titleMarkdown: 'I Am Fine',
  });
});

test('Send bad url', async () => {
  const badurl = 'badurl';
  return expect(articledown(badurl)).rejects.toThrowError(BAD_URL_ERROR(badurl));
});

test('Send null url', async () => {
  return expect(articledown(null)).rejects.toThrowError(BAD_ARG_ERROR);
});

test('Send object as url', async () => {
  return expect(articledown({})).rejects.toThrowError(BAD_ARG_ERROR);
});

test('Send empty url', async () => {
  return expect(articledown('')).rejects.toThrowError(BAD_ARG_ERROR);
});
