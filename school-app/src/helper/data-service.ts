import { IStudent, ITeacher } from "../types";
import { AppConfig } from "./constants";

type IServerErrorResponse = {
  __isSchool: boolean;
  message: string;
  httpStatus: number;
  code: string | number;
};

type IServerSuccessResponse<T> = {
  data: T;
};

async function resolveServerResponse<TSuccess>(request: Response) {
  if (request.ok && request.status >= 200 && request.status < 300) {
    const resultData = (await request.json()) as IServerSuccessResponse<TSuccess>;
    return { resultData: resultData?.data };
  } else {
    const result = (await request.json()) as IServerErrorResponse;
    if (result?.__isSchool) {
      return { errorMessage: result.message };
    }
    return { errorMessage: "Error occured" };
  }
}

export async function createStudentApi(formData: IStudent) {
  const formFullData: IStudent = { ...formData };

  const url = `${AppConfig.API_URL}/students`;

  const request = await fetch(url, {
    method: "POST",
    body: JSON.stringify(formFullData),
    headers: [
      ["Content-Type", "application/json"],
      ["Accept", "application/json"],
    ],
    cache: "no-cache",
  });

  return await resolveServerResponse<IStudent>(request);
}

export async function updateStudentApi(formData: IStudent) {
  const formFullData: IStudent = { ...formData };

  const url = `${AppConfig.API_URL}/students`;

  const request = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(formFullData),
    headers: [
      ["Content-Type", "application/json"],
      ["Accept", "application/json"],
    ],
    cache: "no-cache",
  });

  return await resolveServerResponse<IStudent>(request);
}

export async function getStudentByIdApi(id: string) {
  const url = `${AppConfig.API_URL}/students/${id}`;

  const request = await fetch(url, {
    method: "GET",
    headers: [["Accept", "application/json"]],
    cache: "no-cache",
  });

  return await resolveServerResponse<IStudent | undefined | null>(request);
}

export async function getStudentsApi() {
  const url = `${AppConfig.API_URL}/students`;

  const request = await fetch(url, {
    method: "GET",
    headers: [["Accept", "application/json"]],
    cache: "no-cache",
  });

  return await resolveServerResponse<IStudent[]>(request);
}

//============

export async function createTeacherApi(formData: ITeacher) {
  const formFullData: ITeacher = { ...formData };

  const url = `${AppConfig.API_URL}/teachers`;

  const request = await fetch(url, {
    method: "POST",
    body: JSON.stringify(formFullData),
    headers: [
      ["Content-Type", "application/json"],
      ["Accept", "application/json"],
    ],
    cache: "no-cache",
  });

  return await resolveServerResponse<ITeacher>(request);
}

export async function updateTeacherApi(formData: ITeacher) {
  const formFullData: ITeacher = { ...formData };

  const url = `${AppConfig.API_URL}/teachers`;

  const request = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(formFullData),
    headers: [
      ["Content-Type", "application/json"],
      ["Accept", "application/json"],
    ],
    cache: "no-cache",
  });

  return await resolveServerResponse<ITeacher>(request);
}

export async function getTeacherByIdApi(id: string) {
  const url = `${AppConfig.API_URL}/teachers/${id}`;

  const request = await fetch(url, {
    method: "GET",
    headers: [["Accept", "application/json"]],
    cache: "no-cache",
  });

  return await resolveServerResponse<ITeacher | undefined | null>(request);
}

export async function getTeachersApi() {
  const url = `${AppConfig.API_URL}/teachers`;

  const request = await fetch(url, {
    method: "GET",
    headers: [["Accept", "application/json"]],
    cache: "no-cache",
  });

  return await resolveServerResponse<ITeacher[]>(request);
}

export async function getTeachersDashboardApi() {
  const url = `${AppConfig.API_URL}/dashboard`;

  const request = await fetch(url, {
    method: "GET",
    headers: [["Accept", "application/json"]],
    cache: "no-cache",
  });

  return await resolveServerResponse<{ teachers: number; students: number }>(request);
}
