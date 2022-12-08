const scraperObject = {
  url: "https://en.myshows.me/luvrok.",
  async scraper(browser, category) {
    let page = await browser.newPage();
    // console.log(`Navigating to ${this.url}...`);

    await page.goto(this.url);

    await Promise.all([await page.click(".User-showsMore"), await page.waitForNavigation({ waitUntil: "networkidle2" })]);
    const el3 = await page.click(".User-showsMore");
    // await page.click(".Page-main .User-shows .Container .User-showsMore");

    let pagePromise = () =>
      new Promise(async (resolve, reject) => {
        const text = await page.evaluate(() =>
          Array.from(document.querySelectorAll(`.UserShowItem-title`), (element) =>
            element.textContent
              .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
              .trimStart()
              .trimEnd()
          )
        );

        resolve(text);
      });

    const dataTitle = await pagePromise();

    let pagePromise2 = () =>
      new Promise(async (resolve, reject) => {
        const text = await page.evaluate(() =>
          Array.from(document.querySelectorAll(".UserShowItem-watched"), (element) =>
            element.textContent
              .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
              .trimStart()
              .trimEnd()
          )
        );

        resolve(text);
      });

    const before_data = await pagePromise2();

    let pagePromise3 = () =>
      new Promise(async (resolve, reject) => {
        const text = await page.evaluate(() =>
          Array.from(document.querySelectorAll(".Progress-secondary:nth-child(2)"), (element) =>
            element.textContent
              .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
              .trimStart()
              .trimEnd()
          )
        );

        resolve(text);
      });

    const after_data = await pagePromise3();

    console.log(3)

    // const before_ = $(element).text().split(" ")[0] + " " + $(element).text().split(" ")[1];
    // const after_ = $(element).text().split(" ")[2] + " " + $(element).text().split(" ")[3];

    // const dataTitle = await pagePromise("UserShowItem-title");
    let dataObjects = [];

    for (let i = 0; i < dataTitle.length; i++) {
      dataObjects.push({ title: dataTitle[i], before_: before_data[i], after_: after_data[i + 3].split(" ")[2] });
    }

    return dataObjects;
  },
};

module.exports = scraperObject;
