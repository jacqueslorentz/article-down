const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const articledown = require('./index');

const writeMarkdownFile = (data, args) => new Promise((resolve, reject) => {
  const filename = args.file || `${data.title}.md`;
  const content = `#${data.titleMarkdown}\n\n${
    data.sourceMarkdown !== '' ? `${data.sourceMarkdown}\n\n` : ''
  }${data.link}\n\n${data.article}`;

  try {
    fs.mkdirSync(args.dir);
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
  fs.writeFile(args.dir + filename, content, err => (err ? reject(err) : resolve()));
});

const usage = () => {
  console.log('Save a web article into Markdown');
  console.log('Usage: node bin "YOUR-ARTICLE-URL" [options]\n');
  console.log('Options:\n  -d   Output directory for file created');
  console.log('  -o   File name (default name is the article title)');
  return null;
};

const parseArgs = () => {
  const invalidArg = Object.keys(argv).reduce((res, elem) => (
    ['_', 'd', 'o'].includes(elem) ? res : true
  ), false);
  if (invalidArg || argv.d === true || argv.o === true || argv._.length !== 1) {
    return usage();
  }
  const dir = argv.d || './';
  const file = argv.o || null;
  return {
    url: argv._[0],
    file,
    dir: (dir.charAt(dir.length - 1) === '/' ? dir : `${dir}/`),
  };
};

(async () => {
  const args = parseArgs();
  if (args === null) {
    return;
  }
  console.log(`Working on ${args.url}`);
  try {
    await writeMarkdownFile(await articledown(args.url), args);
    console.log('Article successfully saved!');
  } catch (err) {
    console.error(err);
  }
})();
