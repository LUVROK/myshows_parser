import { describe, expect, test } from "@jest/globals";
import { initial_cheerio } from "../baseds_function";

const mass_names = ["luvrok", "nikita_radio", "robotoman", "Breacher", "maria_krukova", "baka", "theglamourbear", "olgakornelyuk", "agp2pvl", "muss", "karl-shusterling", "tiltmeister", "Caliban", "2", "ee2mos", "Serj-vdk", "mariposa0404", "polkadot", "frommisle"];

const SITE = "https://old.myshows.me/";

describe("initial cheerio", () => {
  test("initial cherrio", () => {
    mass_names.forEach(async (element) => {
      const elem = await initial_cheerio(`${SITE}${element}`);
      console.log(typeof elem("body"));
      //   expect(initial_cheerio(`${element}`)).toMatchObject({});
      expect(elem("body")).toBeInstanceOf(Object);
      //   expect(initial_cheerio("${element}")).toBeInstanceOf(Object);
    });
  });
});
