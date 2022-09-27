import axios from "axios";
import { shuffle, draw } from "./utils";

describe("test utils", () => {
  it("test shuffle", async () => {
    const mockGet = jest.spyOn(axios, "get");
    const result = {
      deck_id: "t9xyofd84tg4",
      remaining: 52,
      shuffled: true,
      success: true,
    };
    const mockedResult = {
      data: result,
    };
    mockGet.mockResolvedValue(mockedResult);

    const res = await shuffle();
    expect(res).toEqual(result);
  });

  it("test draw", async () => {
    const mockGet = jest.spyOn(axios, "get");
    const deck_id = "kxozasf3edqu";
    const result = {
      success: true,
      deck_id: deck_id,
      cards: [
        {
          code: "6H",
          image: "https://deckofcardsapi.com/static/img/6H.png",
          images: {
            svg: "https://deckofcardsapi.com/static/img/6H.svg",
            png: "https://deckofcardsapi.com/static/img/6H.png",
          },
          value: "6",
          suit: "HEARTS",
        },
      ],
      remaining: 50,
    };
    const mockedResult = {
      data: result,
    };
    mockGet.mockResolvedValue(mockedResult);

    const res = await draw("kxozasf3edqu");
    expect(res).toEqual(result);
  });
});
