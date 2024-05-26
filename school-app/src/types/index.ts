export type IPrettify<T> = { [P in keyof T]: T[P] } & {};

export type IReactFC<T = {}> = React.FC<T & { children?: React.ReactNode }>;

export interface IReview {
  review: string[];
  reviewer: string;
}

export interface IStudent {
  id: string;
  name: string;
  surname: string;
  nationalId: number;
  dateOfBirth: string;
  studentNo: number;
}

/*
● National ID Number - required field
● Name - required field
● Surname - required field
● dateOfBirth - their age may not be more than 22
● Student Number - required field
*/

export interface ITeacher {
  id: string;
  nationalId: number;
  name: string;
  surname: string;
  title: "Mr" | "Mrs" | "Miss" | "Dr" | "Prof";
  dateOfBirth: string;
  teacherNo: number;
  salary?: number;
}

/*
● National ID number - required field
● Name - required
● Surname - required
● Title - required can be either [Mr, Mrs, Miss, Dr, Prof]
● Date of Birth - required - their age may not be less than 21
● Teacher Number - required
● Salary - optional
*/

export interface ITextValue<T = string> {
  text: string;
  value: T;
}
