import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import { appFetchMock } from "../../../../helper/test-util";
import Page from "./page";
import { IStudent } from "../../../../types";

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

describe("Student Details Page", () => {
  afterEach(() => {
    (global as any).fetch.mockClear();
    delete (global as any).fetch;
  });

  const mockData: IStudent = {
    id: "e963d522-e727-9551-f70c-223ed8d4d67b",
    name: "Mena",
    surname: "Duru",
    nationalId: 9940505,
    dateOfBirth: "2014-01-01",
    studentNo: 234,
  };

  it("render Details Page (No Data)", async () => {
    global.fetch = jest.fn().mockImplementation(appFetchMock({ data: {} }));

    render(await Page({ params: { id: "888" } }));

    const elem02 = await waitFor(() => screen.getByText("Student Details", { selector: "h3" }));

    expect(elem02).toBeInTheDocument();
  });

  it("render Students Details", async () => {
    global.fetch = jest.fn().mockImplementation(appFetchMock({ data: mockData }));

    const { container } = render(await Page({ params: { id: mockData.id } }));

    const elem01 = await waitFor(() => container.querySelector<HTMLInputElement>(`input[name="name"]`));

    expect(elem01).toBeInTheDocument();
    expect(elem01?.value).toBe(mockData.name);
  });
});
