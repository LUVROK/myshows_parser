const readline = require("readline");
const XLSX = require("xlsx");
const { initial_cheerio, clearStr, getRandomArbitrary } = require("./baseds_function");
const Browser = require("zombie");
var user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20";
var browser = new Browser({ userAgent: user_agent, debug: true, waitFor: 10000 });
const { startBrowser } = require("./puppeteer_start");
const browserObject = require("./puppeteer_start");
const scraperController = require("./pageController");
const pageScraper = require("./pageScraper");

const ObjectEntrize = {
  counter: 0,
  data: [],
  rndEl: 0,
  jquerySearch: "",
  jqueryA: "",
  jqueryLeft: "",
  jqueryRight: "",
  intervalId: "",
  columns: ["title", "Episodes_watched_done", "Episodes_watched_left"],
};
let site;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function save_XLXS(dataSave, namedFile) {
  const workSheet = await XLSX.utils.json_to_sheet(dataSave);
  const workBook = await XLSX.utils.book_new();
  await XLSX.utils.book_append_sheet(workBook, workSheet, "myshowsDataStat");
  await XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  await XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  await XLSX.writeFile(workBook, `${namedFile}`);
}

async function promiseData($, opt_1) {
  loading();
  console.log("processing");
  await new Promise((resolve, reject) => {
    setTimeout(function () {
      let _done_mass = [];
      let _left_mass = [];

      const LASTELEMENT = $(`${ObjectEntrize.jquerySearch}${opt_1} ${ObjectEntrize.jqueryA}`).length - 2;

      $(`${ObjectEntrize.jquerySearch}${opt_1} ${ObjectEntrize.jqueryLeft}`).each((i1, element) => {
        _left_mass.push($(element).text());
      });
      $(`${ObjectEntrize.jquerySearch}${opt_1} ${ObjectEntrize.jqueryRight}`).each((i1, element) => {
        _done_mass.push($(element).text());
      });
      $(`${ObjectEntrize.jquerySearch}${opt_1} ${ObjectEntrize.jqueryA}`).each((i, element) => {
        if (!$(element).text().includes("Show others")) {
          ObjectEntrize.data.push({ title: $(element).text(), Episodes_watched_done: _done_mass[i], Episodes_watched_left: _left_mass[i] });
          ObjectEntrize.counter++;
        }
        if (i === LASTELEMENT) {
          clearInterval(ObjectEntrize.intervalId);
          clearStr(2);
          resolve("");
        }
      });
    }, 2000);
  });
}

async function saveQuest(dataSave, namedFile) {
  rl.question(`Save the result?(${namedFile}):\n1 - yes\n2 - nope\n3 - exit\n`, async function (save_res) {
    clearStr(5);
    switch (save_res) {
      case "1":
        await save_XLXS(dataSave, namedFile);
        console.log("\nsave success\n");
        rl.close();
        break;
      case "2":
        console.log("exit");
        rl.close();
        break;
      case "3":
        console.log("exit");
        rl.close();
        break;
      default:
        console.log("Invalid number"), rl.close();
        break;
    }
  });
}

function loading() {
  var h = ["processing.", "processing..", "processing..."];
  var i = 0;

  ObjectEntrize.intervalId = setInterval(() => {
    i = i > 2 ? 0 : i;
    clearStr(1);
    console.log(h[i]);
    i++;
  }, 300);
}

function old_site() {
  rl.question(`Choose one thing what data do you want to get:\n1 - Watching\n2 - Going to watch\n3 - Stopped watching\n4 - Watched all\n5 - Everything\n6 - exit\n`, function (opt_1) {
    let numStr = 7;
    opt_1++;
    opt_1 === 6 ? (opt_1 = ``) : opt_1 === 7 ? (opt_1 = 7) : ((opt_1 = `:nth-child(${opt_1})`), (numStr = `:nth-child(${opt_1})`));
    clearStr(8);
    opt_1 !== "" && opt_1 === numStr && opt_1 === 7
      ? opt_1 === 7
        ? (console.log("exit"), rl.close())
        : (console.log("Invalid number"), rl.close())
      : rl.question(`Enter your nickname:\n`, async function (opt_2) {
          clearStr(2);
          loading();
          console.log("processing");
          let $ = await initial_cheerio(`https://${site}myshows.me/${opt_2.toString()}${site !== "en." ? "?fl=en" : ""}`);
          $ === undefined || $ === null ? (opt_2.toString().slice(-1) === "/" ? ($ = await getHTML(`${opt_2.toString().slice(0, -1)}${site !== "en." ? "?fl=en" : ""}`)) : ($ = await getHTML(`${opt_2.toString()}${site !== "en." ? "?fl=en" : ""}`))) : null;
          clearInterval(ObjectEntrize.intervalId);
          clearStr(1);
          $ === undefined || $ === null
            ? (console.log("Incorrect nickname"), rl.close())
            : rl.question(`What do you want to do:\n1 - Get random movie\n2 - Get a convenient table\n3 - Statistics by day\n4 - exit\n`, async function (opt_3) {
                clearStr(6);
                switch (opt_3) {
                  case "1":
                    await promiseData($, opt_1);
                    ObjectEntrize.rndEl = await getRandomArbitrary(0, ObjectEntrize.data.length);
                    opt_3 === "1" ? (console.log(`\n----------------------------------\nRandom movie`), console.log(`----------------------------------`), console.log(`Index - ${ObjectEntrize.rndEl}`), console.log(`----------------------------------`), console.log(`Title - ${ObjectEntrize.data[ObjectEntrize.rndEl].title}`)) : null;
                    console.log(`----------------------------------\n`);
                    console.log(`----------------------------------\nTotal movies - ${ObjectEntrize.counter}`);
                    console.log(`----------------------------------\n`);
                    rl.close();
                    break;
                  case "2":
                    await promiseData($, opt_1);
                    console.log("\n---------------------------------------------------------------------------------\nTitle" + "\t\t\t\t\t\t|  " + "Watched done" + " |" + "  Watched left" + " |");
                    console.log(`---------------------------------------------------------------------------------`);
                    await ObjectEntrize.data.map((data, i) => {
                      data.title = `${data.title.length < 42 ? data.title : data.title.slice(0, 41).slice(-1) === " " ? data.title.slice(0, 40) + "..." : data.title.slice(0, 41) + "..."}`;
                      console.log(data.title + `${data.title.length < 8 ? "\t\t\t\t\t\t|\t" : data.title.length >= 16 && data.title.length < 24 ? "\t\t\t\t|\t" : data.title.length >= 24 && data.title.length < 32 ? "\t\t\t|\t" : data.title.length >= 32 && data.title.length < 38 ? "\t\t|\t" : data.title.length >= 38 && data.title.length < 46 ? "\t|\t" : "\t\t\t\t\t|\t"}` + data.Episodes_watched_done + "\t|\t" + data.Episodes_watched_left + "\t|");
                      console.log(`---------------------------------------------------------------------------------`);
                    });
                    await saveQuest(ObjectEntrize.data, "myshowsData.xlsx");
                    break;
                  case "3":
                    loading();
                    console.log("processing");
                    await new Promise((resolve, reject) => {
                      setTimeout(function () {
                        let summ_watched = [],
                          summ_series = [];

                        const LASTELEMENT = $(`.statBlock table tbody tr:nth-of-type(2) ._days table tbody tr td table tbody tr td`).length;

                        $(`.statBlock table tbody tr:nth-of-type(2) ._days table tbody tr td table tbody tr td div div p:nth-child(2)`).each((i, element) => {
                          const before_ = $(element).text().split(" ")[0];
                          const after_ = $(element).text().split(" ")[2];
                          summ_watched.push(before_);
                          summ_series.push(after_);
                        });

                        $(`.statBlock table tbody tr:nth-of-type(2) ._days table tbody tr td table tbody tr td div div p b`).each((i, element) => {
                          if ($(element).text().includes("2021")) {
                            var temp = $(element).text().split(".");
                            var datedd = new Date(temp[2], temp[1] - 1, temp[0]);

                            var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][datedd.getMonth()];
                            var str = datedd.getDate() + " " + month + " " + datedd.getFullYear();

                            ObjectEntrize.data.push({
                              data_Date: str,
                              summ_watched_min: summ_watched[i],
                              summ_series: summ_series[i],
                            });
                          } else {
                            let date = new Date($(element).text());
                            let dateNow = new Date();
                            date.getFullYear() === dateNow.getFullYear() - 1 ? null : date.setFullYear(dateNow.getFullYear());
                            var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
                            var str = date.getDate() + " " + month + " " + date.getFullYear();

                            ObjectEntrize.data.push({
                              data_Date: str,
                              summ_watched_min: summ_watched[i],
                              summ_series: summ_series[i],
                            });
                          }
                        });
                        $(`.statBlock table tbody tr:nth-of-type(2) ._days table tbody tr td table tbody tr td`).each((i, element) => {
                          if (i === LASTELEMENT - 1) {
                            clearInterval(ObjectEntrize.intervalId);
                            readline.clearScreenDown(process.stdout);
                            resolve("");
                          }
                        });
                      }, 2000);
                    });
                    clearStr(1);
                    await saveQuest(ObjectEntrize.data, "myshowsDataStat.xlsx");
                    break;
                  case "4":
                    console.log("exit"), rl.close();
                    break;
                  default:
                    console.log("Invalid number"), rl.close();
                    break;
                }
              });
        });
  });
}

async function new_site() {
  rl.question(`Enter your nickname:\n`, async function (opt_2) {
    clearStr(1);
    loading();
    // console.log("processing");
    let url = `https://en.myshows.me/${opt_2.toString()}`;
    let browserInstance = await browserObject.startBrowser();
    pageScraper.url = url;
    await scraperController(browserInstance);
    clearInterval(ObjectEntrize.intervalId);
    clearStr(1);
    rl.close();
  });
}

const parse = async () => {
  rl.question(`Choose which version of myshows to parse:\n1 - old version\n2 - new version\n3 - exit\n`, function (opt_version) {
    clearStr(5);
    switch (opt_version) {
      case "1":
        site = `old.`;
        ObjectEntrize.jquerySearch = ".tabs_cont";
        ObjectEntrize.jqueryA = "td a";
        ObjectEntrize.jqueryLeft = ".showProgress ._left";
        ObjectEntrize.jqueryRight = ".showProgress ._done";
        old_site();
        break;
      case "2":
        site = `en.`;
        ObjectEntrize.jquerySearch = ".UserShowItem-header__top";
        ObjectEntrize.jqueryA = ".UserShowItem-title";
        ObjectEntrize.jqueryLeft = ".Progress-secondary .UserShowItem-watched";
        ObjectEntrize.jqueryRight = ".Progress-secondary";
        new_site();
        break;
      case "3":
        console.log("exit"), rl.close();
        break;
      default:
        console.log("Invalid number"), rl.close();
        break;
    }
  });
};

parse();

rl.on("close", function () {
  process.exit(0);
});
