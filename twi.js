// NODE_TLS_REJECT_UNAUTHORIZED=0 node twi.js

import { JSDOM } from 'jsdom';
import Epub from 'epub-gen';

async function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Takes two optional parameters, count and startUrl.
// count    (optional)  - The number of chapters to download to create the epub from.
// startUrl (optional)  - The URL of the chapter to start at.
const count = parseInt(process.argv[2] || '0');
const startUrl = process.argv[3] || 'https://wanderinginn.com/2017/03/03/rw1-00/';

const scrape = async () => {
  let chaptersScraped = 0;

  let url = startUrl;
  const content = [];

  while (count === 0 || chaptersScraped < count) {
    const dom = await JSDOM.fromURL(url);

    const doc = dom.window.document;

    // Grab the next chapter's URL.
    url = doc.querySelector('.nav-next').children[0]?.href;
    if (!url) break;

    doc.querySelector('.entry-content').querySelectorAll("a").forEach(e => e.remove());

    content.push({
      title: doc.querySelector('.entry-title').textContent,
      data: doc.querySelector('.entry-content').innerHTML,
    })

    chaptersScraped++;
    console.log(chaptersScraped + ' | ' + url)

    await sleep(100);
  }

  new Epub({
    title: "The Wandering Inn", // *Required, title of the book.
    author: "pirateaba", // *Required, name of the author.
    cover: "https://wanderinginn.com/wp-content/uploads/2023/06/book1.png", // Url or File path, both ok.
    content,
  }, "./twi.epub");
};

scrape();
