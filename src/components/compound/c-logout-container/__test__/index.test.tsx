import { render, screen } from "@testing-library/react";
import { CIsLoggedInContainer } from "..";
import { EDataTestId } from "@src/types/common";

describe("When Logout Container rendered ", () => {
  it("Expect it should render successfully", async () => {
    const { getByTestId } = render(
      <CIsLoggedInContainer isLoggedIn={true}>
        <div>Hello world</div>
      </CIsLoggedInContainer>
    ); // ARRANGE
    const myElement = getByTestId(EDataTestId.cLogoutContainer);
    // const myElement = screen.getByTestId(EDataTestId.cLogoutContainer);
    expect(myElement).toMatchSnapshot();
  });
});
