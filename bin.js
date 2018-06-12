const fs = require('fs');
const articledown = require('./index');

const writeMarkdownFile = data => new Promise((resolve, reject) => {
  const filename = `${data.title}.md`;
  const content = `#${data.title}\n\n${data.source}\n\n${data.link}\n\n${data.article}`;
  fs.writeFile(filename, content, err => (err ? reject(err) : resolve()));
});

(async () => {
  const link = process.argv[2];
  if (!link) {
    console.log('Please specify an article URL');
    return;
  }
  console.log(`Working on ${link}`);
  try {
    await writeMarkdownFile(await articledown(link));
    console.log('Article successfully saved!');
  } catch (err) {
    console.error(err);
  }
})();
