const articledown = require('./index');
/*
test('Send null link', async () => {
  return expect(articledown(null)).rejects.toThrowError(TypeError);
});*/
test('Send good url', async () => {
  const testURL = 'https://medium.com/s/story/i-am-fine-a19b36867a33';
  return expect(await articledown(testURL));
})
