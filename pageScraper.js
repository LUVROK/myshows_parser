const scraperObject = {
  url: "",
  selectedFunc: "",
  async scraper(browser) {
    try {
      const page = await browser.newPage();
      await page.goto(this.url);
      
      await Promise.all([await page.click(".User-showsMore"), await page.waitForNavigation({ waitUntil: "networkidle2" })]);
      await page.waitForSelector(".User-showsMore");
      await page.click(".User-showsMore");

      // await page.waitForSelector("body");
      // await page.click(".User-showsMore")
      // const element = await page.$(".User-showsMore");
      // await page.evaluate((element) => element.click(), element);

      switch (this.selectedFunc) {
        case "1":
          let pagePromise = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div[title="Watching"] .UserShowItem-title'), (element) =>
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
                Array.from(document.querySelectorAll('div[title="Watching"] .Progress-secondary .UserShowItem-watched'), (element) =>
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
                Array.from(document.querySelectorAll('div[title="Watching"] .Progress-secondary:nth-child(2)'), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );

              resolve(text);
            });

          const after_data = await pagePromise3();


          let dataObjects = [];
          for (let i = 0; i < dataTitle.length; i++) {
            dataObjects.push({ title: dataTitle[i], before_: before_data[i], after_: after_data[i].split(" ")[2] });
          }
          return dataObjects;
          break;
        case "2":
          let pagePromise4 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div[title="Going to"] .UserShowItem-title'), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );

              resolve(text);
            });

          const dataTitle2 = await pagePromise4();

          let pagePromise5 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div[title="Going to"] .Progress-secondary .UserShowItem-watched'), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );
              resolve(text);
            });
          const before_data2 = await pagePromise5();

          let pagePromise6 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div[title="Going to"] .Progress-secondary:nth-child(2)'), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );

              resolve(text);
            });

          const after_data2 = await pagePromise6();

          let dataObjects2 = [];
          for (let i = 0; i < dataTitle2.length; i++) {
            dataObjects2.push({ title: dataTitle2[i], before_: before_data2[i], after_: after_data2[i].split(" ")[2] });
          }
          return dataObjects2;
          break;
        case "3":
          let pagePromise7 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div[title="Stopped watching"] .UserShowItem-title'), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );

              resolve(text);
            });

          const dataTitle3 = await pagePromise7();

          let pagePromise8 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div[title="Stopped watching"] .Progress-secondary .UserShowItem-watched'), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );
              resolve(text);
            });
          const before_data3 = await pagePromise8();

          let pagePromise9 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div[title="Stopped watching"] .Progress-secondary:nth-child(2)'), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );

              resolve(text);
            });

          const after_data3 = await pagePromise9();

          let dataObjects3 = [];
          for (let i = 0; i < dataTitle3.length; i++) {
            dataObjects3.push({ title: dataTitle3[i], before_: before_data3[i], after_: after_data3[i].split(" ")[2] });
          }
          return dataObjects3;
          break;
        case "4":
          let pagePromise10 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div[title="Watched all"] .UserShowItem-title'), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );

              resolve(text);
            });

          const dataTitle4 = await pagePromise10();

          let pagePromise11 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div[title="Watched all"] .Progress-secondary .UserShowItem-watched'), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );
              resolve(text);
            });
          const before_data4 = await pagePromise11();

          let pagePromise12 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll('div[title="Watched all"] .Progress-secondary:nth-child(2)'), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );

              resolve(text);
            });

          const after_data4 = await pagePromise12();

          let dataObjects4 = [];
          for (let i = 0; i < dataTitle4.length; i++) {
            dataObjects4.push({ title: dataTitle4[i], before_: before_data4[i], after_: after_data4[i].split(" ")[2] });
          }
          return dataObjects4;
          break;
        case "5":
          let pagePromise13 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll(".UserShowItem-title"), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );

              resolve(text);
            });

          const dataTitle5 = await pagePromise13();

          let pagePromise14 = () =>
            new Promise(async (resolve, reject) => {
              const text = await page.evaluate(() =>
                Array.from(document.querySelectorAll(".Progress-secondary .UserShowItem-watched"), (element) =>
                  element.textContent
                    .replace(/(\r\n\t|\n|\r|\t|)/gm, "", /\bb\*(.*?)\*/g, "<b>$1</b>")
                    .trimStart()
                    .trimEnd()
                )
              );
              resolve(text);
            });
          const before_data5 = await pagePromise14();

          let pagePromise15 = () =>
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

          const after_data5 = await pagePromise15();

          let dataObjects5 = [];
          for (let i = 0; i < dataTitle5.length; i++) {
            dataObjects5.push({ title: dataTitle5[i], before_: before_data5[i], after_: after_data5[i].split(" ")[2] });
          }
          return dataObjects5;
          break;
        default:

        break;
      }
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = scraperObject;
