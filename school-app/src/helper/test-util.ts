export function appFetchMock({ data, status }: { data: any; status?: number }) {
  return function fetchStub(input: string | URL | Request, init?: RequestInit | undefined) {
    return Promise.resolve({
      ok: true,
      status: status || 200,
      json: () => Promise.resolve({ data }),
    } as Response);
  };
}

export function appFetchMockError({ message, status }: { message: string; status?: number }) {
  return function fetchStub(input: string | URL | Request, init?: RequestInit | undefined) {
    const status01 = status || 400;
    return Promise.resolve({
      ok: false,
      status: status01,
      json: () =>
        Promise.resolve({
          httpStatus: status01,
          responseData: {
            __isSchool: true,
            message,
            httpStatus: status01,
          },
        }),
    } as Response);
  };
}
