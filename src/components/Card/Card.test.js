import { shallow } from "enzyme";

import Card from "./Card";

describe("renders Card", () => {
  it("test empty card", () => {
    const card = shallow(<Card cardName="" />);
    const image = card.find("img");
    expect(image).toHaveLength(0);
  });

  it("test valid card", () => {
    const cardName = "5H";
    const card = shallow(<Card cardName={cardName} />);

    const image = card.find("img");
    expect(image).toHaveLength(1);
    expect(image.prop("src").includes(cardName)).toBe(true);
  });
});
