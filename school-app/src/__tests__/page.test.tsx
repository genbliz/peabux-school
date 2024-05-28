import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import Page from "../app/page";
import { appFetchMock } from "../helper/test-util";

describe("Teacher Details Page", () => {
  afterEach(() => {
    (global as any).fetch.mockClear();
    delete (global as any).fetch;
  });

  const mockData: { teachers: number; students: number } = {
    students: 60,
    teachers: 10,
  };

  it("render Teacher Details", async () => {
    global.fetch = jest.fn().mockImplementation(appFetchMock({ data: mockData }));

    const { container } = render(await Page());

    const elem01 = await waitFor(() => screen.getByText("Dashboard", { selector: "h3" }));
    expect(elem01).toBeInTheDocument();
  });
});
