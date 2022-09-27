import { waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { mount } from "enzyme";
import React from "react";
import DeckofCards from "./DeckofCards";

jest.useFakeTimers();

describe("test DeckofCards", () => {
  let component;
  let deck_id = "kxozasf3edqu";
  const mockGet = jest.spyOn(axios, "get");
  beforeEach(async () => {
    const result = {
      deck_id: deck_id,
      remaining: 52,
      shuffled: true,
      success: true,
    };
    const mockedResult = {
      data: result,
    };
    mockGet.mockResolvedValue(mockedResult);

    await waitFor(() => {
      component = mount(<DeckofCards />);
    });
  });

  afterEach(() => {
    mockGet.mockClear();
  });

  it("render DrawButton and Cards in the beginning", () => {
    const drawBtn = component.find("button");
    expect(drawBtn).toHaveLength(1);
    const cards = component.find("Card");
    expect(cards).toHaveLength(2);
  });

  it("render snap suit", async () => {
    const drawBtn = component.find("button");

    const prevCard = {
      data: {
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
      },
    };

    mockGet.mockResolvedValue(prevCard);

    await waitFor(async () => {
      drawBtn.simulate("click");
      jest.advanceTimersByTime(300);
    });

    const nextCard = {
      data: {
        success: true,
        deck_id: deck_id,
        cards: [
          {
            code: "8H",
            image: "https://deckofcardsapi.com/static/img/8H.png",
            images: {
              svg: "https://deckofcardsapi.com/static/img/8H.svg",
              png: "https://deckofcardsapi.com/static/img/8H.png",
            },
            value: "8",
            suit: "HEARTS",
          },
        ],
        remaining: 49,
      },
    };

    mockGet.mockResolvedValue(nextCard);

    await waitFor(async () => {
      drawBtn.simulate("click");
      jest.advanceTimersByTime(300);
    });

    expect(component.find("#snap_msg").getDOMNode().innerHTML).toBe(
      "SNAP SUIT!"
    );
  });

  it("render snap value", async () => {
    const drawBtn = component.find("button");

    const prevCard = {
      data: {
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
      },
    };

    mockGet.mockResolvedValue(prevCard);

    await waitFor(async () => {
      drawBtn.simulate("click");
      jest.advanceTimersByTime(300);
    });

    const nextCard = {
      data: {
        success: true,
        deck_id: "kxozasf3edqu",
        cards: [
          {
            code: "8H",
            image: "https://deckofcardsapi.com/static/img/6D.png",
            images: {
              svg: "https://deckofcardsapi.com/static/img/6D.svg",
              png: "https://deckofcardsapi.com/static/img/6D.png",
            },
            value: "6",
            suit: "Diamonds",
          },
        ],
        remaining: 49,
      },
    };

    mockGet.mockResolvedValue(nextCard);

    await waitFor(async () => {
      drawBtn.simulate("click");
      jest.advanceTimersByTime(300);
    });

    expect(component.find("#snap_msg").getDOMNode().innerHTML).toBe(
      "SNAP VALUE!"
    );
  });

  it("render match messages", async () => {
    const drawBtn = component.find("button");
    expect(component.find(".matchMessages")).toHaveLength(0);

    const response = {
      data: {
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
        remaining: 0,
      },
    };

    mockGet.mockResolvedValue(response);

    await waitFor(async () => {
      drawBtn.simulate("click");
      jest.advanceTimersByTime(300);
    });

    expect(component.find("#snap_msg").getDOMNode().innerHTML).toBe("");

    await waitFor(async () => {
      drawBtn.simulate("click");
      jest.advanceTimersByTime(300);
    });

    expect(component.find(".matchMessages")).toHaveLength(1);
  });
});
