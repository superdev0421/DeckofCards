import { shallow } from "enzyme";

import DrawButton from "./DrawButton";

describe("test DrawButton", () => {
  let drawButton;
  const handleClick = jest.fn();
  beforeAll(() => {
    drawButton = shallow(<DrawButton handleClick={handleClick} />);
  });

  it("render drawButton", () => {
    const btn = drawButton.find("button");
    expect(btn).toHaveLength(1);
    btn.simulate("click");
    expect(handleClick).toBeCalled();
  });
});
