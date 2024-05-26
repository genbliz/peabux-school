export const DefinedRoutes = Object.freeze({
  home: "/",
  students: "/student",
  studentCreate: "/student/create",
  studentDetail: (id: string) => `/student/${id}`,
  //
  teachers: "/teacher",
  teacherCreate: "/teacher/create",
  teacherDetail: (id: string) => `/teacher/${id}`,
});

export const AppConfig = {
  CURRENT_SITE_URL: process.env.NEXT_PUBLIC_CURRENT_SITE_URL ?? "",
  //
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
} as const;
