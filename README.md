# ArticleDown

>📚 A JavaScript library to parse an URL and convert the article content into Markdown.

## Getting Started

A library used to fetch a article link and get its content as Markdown, can be linked with [pandoc](http://pandoc.org/getting-started.html) to get other format (pdf, epub, rtf,..).

## Install

```
yarn add jacqueslorentz/article-down
```
or
```
npm install --save jacqueslorentz/article-down
```

## Usage

Usage example:
``` JavaScript
const articledown = require('article-down');

(async () => {
  const link = 'YOUR-ARTICLE-URL';
  try {
    const markdown = await articledown(link); // Returns a promise
    console.log(markdown);
  } catch (err) {
    console.error(err);
  }
})();
```
The function will return a promise which fulfilled this object:
``` JavaScript
{
  title: 'Article title',
  titleMarkdown: 'Article title in Markdown',
  source: 'Article source (author and/or website)',
  sourceMarkdown: 'Article source in Markdown',
  link: 'Article link',
  article: 'Article content in Markdown',
}
```

You can also use the binary, it will save the article in a Markdown file:
```
node bin.js 'YOUR-ARTICLE-URL' [-d 'output directory'] [-o 'filename']
```

## Running the tests

```
yarn run test
```
or
```
npm run test
```
Run Eslint to check syntax and Jest to run tests.

## Built With

- [readability](https://github.com/luin/readability) - Extract article from a web page
- [turndown](https://github.com/domchristie/turndown) - Turn HTML into Markdown

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Jacques Lorentz
