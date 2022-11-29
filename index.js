const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");
let fs = require("fs");
let prompt = require("prompt");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ObjectEntrize = {
  counter: 0,
  data: [],
  rndEl: 0,
};

const parse = async () => {
  const getHTML = async (url) => {
    try {
      const { data } = await axios.get(url);
      return cheerio.load(data);
    } catch (e) {
      return undefined;
    }
  };

  rl.question(`Choose one thing what data do you want to get:\n1 - Watching\n2 - Going to watch\n3 - Stopped watching\n4 - Watched all\n5 - Everything\n`, function (opt_1) {
    opt_1++;
    opt_1 < 2 || opt_1 > 7
      ? (console.log("Invalid number"), rl.close())
      : rl.question(`Enter your nickname:\n`, async function (opt_2) {
          const $ = await getHTML(`https://old.myshows.me/${opt_2.toString()}?fl=en`);
          $ === undefined || $ === null
            ? (console.log("Incorrect nickname"), rl.close())
            : rl.question(`What do you want to do:\n1 - Get random movie\n2 - Get a convenient table\n`, async function (opt_3) {
                function getMovies() {
                  let _done_mass = [];
                  let _left_mass = [];
                  $(`.tabs_cont:nth-child(${opt_1}) .showProgress ._left`).each((i, element) => {
                    _left_mass.push($(element).text());
                  });
                  $(`.tabs_cont:nth-child(${opt_1}) .showProgress ._done`).each((i, element) => {
                    _done_mass.push($(element).text());
                  });
                  $(`.tabs_cont:nth-child(${opt_1}) td a`).each((i, element) => {
                    if (!$(element).text().includes("Show others")) {
                      ObjectEntrize.data.push({ title: $(element).text(), Episodes_watched_done: _done_mass[i], Episodes_watched_left: _left_mass[i] });
                      ObjectEntrize.counter++;
                    }
                  });
                }
                switch (opt_3) {
                  case "1":
                    await getMovies();
                    break;
                  case "2":
                    await getMovies();
                    console.log(ObjectEntrize.data);
                    console.log("your choose is 2"), rl.close();
                    break;
                  default:
                    console.log("Invalid number"), rl.close();
                    break;
                }
                opt_3 === "1" ? ((ObjectEntrize.rndEl = await getRandomArbitrary(0, ObjectEntrize.data.length)), console.log(`\nRandom movie`), console.log(`----------------------------------`), console.log(`Index - ${ObjectEntrize.rndEl}`), console.log(`----------------------------------`), console.log(`Title - ${ObjectEntrize.data[ObjectEntrize.rndEl].title}`)) : null;
                console.log(`----------------------------------\n`);
                console.log(`----------------------------------\nTotal movies - ${ObjectEntrize.counter}`);
                console.log(`----------------------------------\n`);
                rl.close();
              });
        });
  });
};

parse();

rl.on("close", function () {
  process.exit(0);
});
