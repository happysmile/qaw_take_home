// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { writeToPath } = require('@fast-csv/format');

async function saveHackerNewsArticles() {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
 
  // Go to Hacker News
  await page.goto("https://news.ycombinator.com");

  // Get array of all the links
  // filter by className since there are other links in the page
  // keep only the first 10
  // in this format: [ [link1title, link1url], [link2title, link2url] ]
  const linksArray = await page.evaluate(() => {
       return Array.from(document.links)
       .filter(item => item.parentNode.className == 'titleline')
       .slice(0, 10)
       .map(item => [item.text, item.href]);
  });

  // Add headers for csv 
  await linksArray.unshift(['Link Title', 'Link Url']);

  // Write to csv
  // Use unique name for file
  writeToPath(`./csv/Hacker_News_Links_${Date.now()}.csv`, linksArray);

}

(async () => {
  await saveHackerNewsArticles();
})();
