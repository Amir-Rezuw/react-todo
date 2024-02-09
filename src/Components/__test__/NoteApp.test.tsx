import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import App from "../../App";

const addNote = (count: number) => {
  const titleInput = screen.getByPlaceholderText(
    /Note title .../i
  ) as HTMLInputElement;
  const descriptionInput = screen.getByPlaceholderText(
    /Note Description .../i
  ) as HTMLInputElement;
  const btn = screen.getByText(/add note/i, { exact: false });
  for (let index = 0; index < count; index++) {
    fireEvent.change(titleInput, { target: { value: "notes" } });
    fireEvent.change(descriptionInput, {
      target: { value: ` item ${index} ` },
    });
    fireEvent.click(btn);
  }
};
beforeEach(() => {
  render(<App />);
});
describe("Form tests", () => {
  test("It should render form", () => {
    expect(screen.getAllByRole("textbox").length).toBe(2);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("It should add item and clear form after submit items", () => {
    act(() => {
      addNote(1);
    });
    const deleteTodoBtn = screen.getByTestId("delete-todo");
    const titleInput = screen.getByPlaceholderText(
      /Note title .../i
    ) as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      /Note Description .../i
    ) as HTMLInputElement;
    const noteList = screen.getAllByRole("heading", { level: 5 });
    expect(titleInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
    expect(noteList.length).toBe(1);
    fireEvent.click(deleteTodoBtn);
  });
  test("it should add multiple items", async () => {
    act(() => {
      addNote(6);
    });
    const noteList = await screen.findAllByRole("heading", { level: 5 });
    expect(noteList.length).toBe(6);
  });
});

describe("Card tests", () => {
  test("It should not have completed card styles when it's not checked", () => {
    const noteListTitle = screen.getAllByRole("heading", { level: 5 });
    const checkboxInputs = screen.getAllByRole(
      "checkbox"
    ) as HTMLInputElement[];

    checkboxInputs.forEach((item, index) => {
      if (item.checked) {
        expect(noteListTitle[index]).toHaveClass("line-through");
      } else {
        expect(noteListTitle[index]).not.toHaveClass("line-through");
      }
    });
  });
});
