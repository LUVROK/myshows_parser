const axios = require("axios");
const cheerio = require("cheerio");
const readline = require("readline");

async function initial_cheerio(url) {
  try {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  } catch (e) {
    return undefined;
  }
}

function clearStr(i) {
  readline.moveCursor(process.stdout, 0, -i);
  readline.clearScreenDown(process.stdout);
}

function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { initial_cheerio, clearStr, getRandomArbitrary };
