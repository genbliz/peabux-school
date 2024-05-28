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

describe("Create Teacher Page", () => {
  afterEach(() => {
    (global as any).fetch.mockClear();
    delete (global as any).fetch;
  });

  const mockData: ITeacher = {
    id: "",
    name: "Jane",
    surname: "Kopua",
    nationalId: 2177469505,
    dateOfBirth: "2003-01-01",
    teacherNo: 234,
    title: "Mrs",
    salary: 2300,
  };

  it("render Create Teacher", async () => {
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
