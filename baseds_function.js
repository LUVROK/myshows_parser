const axios = require("axios");
const cheerio = require("cheerio");
const readline = require("readline");
const fs = require("fs").promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function writeFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data), function (err) {
      if (err) return console.log(err);
      console.log(`Hello World > ${filePath}`);
    });
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

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

module.exports = { initial_cheerio, clearStr, getRandomArbitrary, readFile, writeFile };
