import {
  render,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

describe("App Component", () => {
  it("should render list items", async () => {
    const { getByText, rerender, queryByText } = render(
      <List initialItems={["leonardo", "pedrao", "luizao"]} />
    );

    expect(getByText("leonardo")).toBeInTheDocument();
    expect(getByText("pedrao")).toBeInTheDocument();
    expect(getByText("luizao")).toBeInTheDocument();

    await rerender(<List initialItems={["Israel"]} />);

    expect(screen.getByText("Israel")).toBeInTheDocument();
    expect(screen.queryByText("leonardo")).not.toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText } = render(
      <List initialItems={[]} />
    );

    const inputElement = getByPlaceholderText("Novo Item");
    const addButton = getByText("Adicionar");

    // debug();
    await userEvent.type(inputElement, "Novo");
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText("Novo")).toBeInTheDocument();
    });

    // debug();
  });

  it("should be able to add remove item to the list", async () => {
    const {
      getAllByText,

      queryByText,
    } = render(<List initialItems={["leonardo"]} />);

    const removeButtons = getAllByText("remover");

    // debug();

    await userEvent.click(removeButtons[0]);

    // await waitForElementToBeRemoved(() => {
    //   return getByText("pedrao");
    // });

    await waitFor(() => {
      expect(queryByText("leonardo")).not.toBeInTheDocument();
    });

    // debug();
  });
});
