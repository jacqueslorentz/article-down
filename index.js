const readability = require('readability-js');
const Turndown = require('turndown');

const escapeMarkdown = (str, index) => {
  const arr = ['$', '*', '_', '#', '`', '>'];
  const i = index || 0;
  if (i >= arr.length) {
    return str;
  }
  return escapeMarkdown(str.split(arr[i]).join(`\\${arr[i]}`), i + 1);
};

const parseMeta = (article, link) => {
  const header = escapeMarkdown(article.title);
  const title = header.replace(/(–|-|\|).*/, '').trim();
  const tmp = header.replace(title, '').trim();
  const source = (
    ['–', '-', '|'].includes(tmp.charAt(0)) ? tmp.substr(1).trim() : tmp
  );
  return { title, source, link };
};

const addDomainToImage = (content, link) => {
  const domain = link.split('/').slice(0, 3).join('/');
  return content.replace(/!\[\]\(\//g, `![](${domain}/`);
};

const parseArticle = (article, link) => {
  const html = article.content.html();
  const turndownService = new Turndown();
  turndownService.addRule('pre', {
    filter: ['pre'],
    replacement: content => content.replace(/\n\n/g, ''),
  });
  const content = addDomainToImage(turndownService.turndown(html), link);
  const meta = parseMeta(article, link);
  return { article: content, ...meta };
};

module.exports = link => new Promise((resolve, reject) => {
  readability(link, (error, article) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(parseArticle(article, link));
  });
});
