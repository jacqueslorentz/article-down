const readability = require('node-readability');
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
  const { title } = article;
  return {
    title,
    link,
    titleMarkdown: escapeMarkdown(title),
  };
};

const addDomainToImage = (content, link) => {
  const domain = link.split('/').slice(0, 3).join('/');
  return content.replace(/!\[\]\(\//g, `![](${domain}/`);
};

const parseArticle = (article, link) => {
  const html = article.content;
  const turndownService = new Turndown();
  turndownService.addRule('pre', {
    filter: ['pre'],
    replacement: (content) => content.replace(/\n\n/g, ''),
  });
  const content = addDomainToImage(turndownService.turndown(html), link);
  const meta = parseMeta(article, link);
  return { article: content, ...meta };
};

module.exports = (link) => new Promise((resolve, reject) => {
  if (!link || typeof link !== 'string' || link.length === 0) {
    return reject(new Error('Bad argument sent, must be a non empty string'));
  }

  return readability(link, (error, article) => {
    if (error) {
      return reject(error);
    }
    if (!article.content) {
      return reject(new Error(`Url ${link} is not found`));
    }
    return resolve(parseArticle(article, link));
  });
});
