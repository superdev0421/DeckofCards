/**
==========================================
 Title:  Card Unit Testing
 Author: Edward
 Date:   27 September 2022
==========================================
 */

// External Dependencies
import { shallow } from "enzyme";

// Internal Dependencies
import Card from "./Card";

describe("test Card", () => {
  it("render empty card", () => {
    const card = shallow(<Card cardName="" />);
    const image = card.find("img");
    expect(image).toHaveLength(0);
  });

  it("render valid card", () => {
    const cardName = "5H";
    const card = shallow(<Card cardName={cardName} />);
    global.Image = class {
      constructor() {
        setTimeout(() => {
          this.onload(); // simulate success
          const image = card.find("img");
          expect(image).toHaveLength(1);
        }, 100);
      }
    };
  });
});
