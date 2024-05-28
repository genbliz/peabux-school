import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import { appFetchMock } from "../../../../helper/test-util";
import Page from "./page";
import { ITeacher } from "../../../../types";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("Teacher Details Page", () => {
  afterEach(() => {
    (global as any).fetch.mockClear();
    delete (global as any).fetch;
  });

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

  it("render Teacher Details Page (No Data)", async () => {
    global.fetch = jest.fn().mockImplementation(appFetchMock({ data: {} }));

    render(await Page({ params: { id: "" } }));

    const elem01 = await waitFor(() => screen.getByText("Teacher Details", { selector: "h3" }));
    const elem02 = await waitFor(() => screen.getByText("No student found", { selector: "p" }));

    expect(elem01).toBeInTheDocument();
    expect(elem02).toBeInTheDocument();
  });

  it("render Teacher Details", async () => {
    global.fetch = jest.fn().mockImplementation(appFetchMock({ data: mockData }));

    const { container } = render(await Page({ params: { id: mockData.id } }));

    const elem01 = await waitFor(() => container.querySelector<HTMLInputElement>(`input[name="name"]`));

    expect(elem01).toBeInTheDocument();
    expect(elem01?.value).toBe(mockData.name);
  });
});
