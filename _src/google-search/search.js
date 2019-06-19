const puppeteer = require('puppeteer');

let args = []
if(process.argv.length > 2){
  args = process.argv.slice(2)
  console.log(`${args}\n`)
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage()

  await page.goto(
      `https://www.google.com/search?q=${args.join('+')}&hl=en&lr=lang_en`,
      {waitUntil: "domcontentloaded"})

  const titles = await page.$$eval('.LC20lb', list => {
    return list.map(data => data.textContent);
  })
  const links = await page.$$eval('.TbwUpd', list => {
    return list.map(data => data.textContent);
  })
  const descs = await page.$$eval('.st', list => {
    return list.map(data => data.textContent);
  })
  for(let i=0; i<titles.length; i++){
    console.log(`\u001b[32m ${titles[i]}\n\u001b[34m ${links[i]}\n\u001b[37m ${descs[i]}\n`)
  }

  await browser.close();
})();

