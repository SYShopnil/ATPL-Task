import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("should have Docs text", async () => {
    const { getByTestId } = render(await Home()); // ARRANGE
    const myElement = getByTestId("home");

    expect(myElement).toMatchSnapshot();
  });
});

/**
 * 
 * it('should render without crashing', async () => {
  // ...(setup mocks)
  render(await Page({params: {username: 'Bob Dylan' }}))
});
 * 
 * 
 */
