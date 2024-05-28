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

describe("Create Student Page", () => {
  afterEach(() => {
    (global as any).fetch.mockClear();
    delete (global as any).fetch;
  });

  const mockData: IStudent = {
    id: "",
    name: "Mena",
    surname: "Duru",
    nationalId: 9940505,
    dateOfBirth: "2014-01-01",
    studentNo: 234,
  };

  it("render Create Students", async () => {
    global.fetch = jest.fn().mockImplementation(appFetchMock({ data: mockData }));

    const { container } = render(<Page />);

    const elem01 = await waitFor(() => container.querySelector<HTMLInputElement>(`input[name="name"]`));
    const elem02 = await waitFor(() => container.querySelector<HTMLLabelElement>(`input[name="dateOfBirth"]`));
    const elem03 = await waitFor(() => container.querySelector<HTMLButtonElement>(`button`));

    if (elem01) elem01.value = mockData.name;

    expect(elem01).toBeInTheDocument();
    expect(elem01?.value).toBe(mockData.name);

    expect(elem02?.tagName).toBe("INPUT");
    expect(elem03?.innerHTML).toBe("Submit");
  });
});
