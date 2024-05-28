import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";
import { DefinedRoutes } from "../../../helper/constants";
import { appFetchMock } from "../../../helper/test-util";
import { IStudent } from "../../../types";

describe("Student List Page (No Data)", () => {
  afterEach(() => {
    (global as any).fetch.mockClear();
    delete (global as any).fetch;
  });

  it("render List Page (No Data)", async () => {
    global.fetch = jest.fn().mockImplementation(appFetchMock({ data: [] }));

    render(await Page());

    const elem = await screen.findByRole("link", { name: "Add student" });
    const elem02 = screen.getByText("No students found", { selector: "p" });

    expect(elem).toBeInTheDocument();

    fireEvent.click(elem);
    expect(elem).toHaveAttribute("href", DefinedRoutes.studentCreate);
    expect(elem02).toBeInTheDocument();
  });

  it("render Students List", async () => {
    const mockData: IStudent = {
      id: "e963d522-e727-9551-f70c-223ed8d4d67b",
      name: "Mena",
      surname: "Duru",
      nationalId: 9940505,
      dateOfBirth: "2014-01-01",
      studentNo: 234,
    };

    global.fetch = jest.fn().mockImplementation(appFetchMock({ data: [mockData] }));

    render(await Page());

    const elem01 = screen.getByText("Surname", { selector: "th" });
    expect(elem01).toBeInTheDocument();

    const elem02 = screen.getByText(mockData.nationalId, { selector: "td" });
    expect(elem02).toBeInTheDocument();
  });
});
