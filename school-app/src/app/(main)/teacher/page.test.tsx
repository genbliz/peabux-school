import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";
import { DefinedRoutes } from "../../../helper/constants";
import { appFetchMock } from "../../../helper/test-util";
import { ITeacher } from "../../../types";

describe("Teachers List Page (No Data)", () => {
  afterEach(() => {
    (global as any).fetch.mockClear();
    delete (global as any).fetch;
  });

  it("render Teachers List Page (No Data)", async () => {
    global.fetch = jest.fn().mockImplementation(appFetchMock({ data: [] }));

    render(await Page());

    const elem = await screen.findByRole("link", { name: "Add teacher" });
    const elem02 = screen.getByText("No teachers found", { selector: "p" });

    expect(elem).toBeInTheDocument();

    fireEvent.click(elem);
    expect(elem).toHaveAttribute("href", DefinedRoutes.teacherCreate);
    expect(elem02).toBeInTheDocument();
  });

  it("render Teachers List", async () => {
    const mockData: ITeacher = {
      id: "d1a9ab50-7706-2ad9-159e-116c6d031095",
      name: "Jane",
      surname: "Kopua",
      nationalId: 2177469505,
      dateOfBirth: "2003-01-01",
      teacherNo: 234,
      title: "Mrs",
      salary: 2300,
    };

    global.fetch = jest.fn().mockImplementation(appFetchMock({ data: [mockData] }));

    render(await Page());

    const elem01 = screen.getByText("Surname", { selector: "th" });
    expect(elem01).toBeInTheDocument();

    const elem02 = screen.getByText(mockData.nationalId, { selector: "td" });
    expect(elem02).toBeInTheDocument();
  });
});
