// @ts-check
const { randomUUID } = require("node:crypto");
const { GenericFriendlyError } = require("../helper/errors");

/**
 * @typedef IStudent
 * @type {{
  id: string;
  name: string;
  surname: string;
  nationalId: number;
  dateOfBirth: string;
  studentNo: number;
}}
*/

/**
 * @type IStudent[]
 */
const students = [];

/**
 * @param {IStudent} student
 */
function createStudent(student) {
  const student01 = {
    ...student,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  if (students?.length) {
    const { studentNo } = students.sort((a, b) => {
      if (a < b) {
        return 1;
      }
      return -1;
    })[0];
    student01.studentNo = studentNo + 1;
  } else {
    student01.studentNo = 101;
  }

  students.push(student01);

  return Promise.resolve(student01);
}

/**
 * @param {string} id
 * @returns Promise<IStudent | undefined>
 */
function getStudentById(id) {
  const student01 = students.find((f) => f.id === id);

  if (student01?.id) return Promise.resolve(student01);

  throw GenericFriendlyError.createBadRequestError("Student not found");
}

/**
 * @param {IStudent} student
 * @returns Promise<IStudent>
 */
function updateStudentById(student) {
  const index = students.findIndex((f) => f.id === student?.id);
  if (index > -1) {
    const student01 = { ...students[index] };

    students[index] = { ...student01, ...student };

    return Promise.resolve(students[index]);
  }

  throw new GenericFriendlyError("Not found");
}

/**
 * @param {string} id
 * @returns Promise<IStudent>
 */
function deleteStudentById(id) {
  const index = students.findIndex((f) => f.id === id);
  if (index > -1) {
    const student01 = { ...students[index] };

    students.splice(index, 1);

    return Promise.resolve(student01);
  }

  throw GenericFriendlyError.createBadRequestError("Student not found");
}

function getAllStudents() {
  return Promise.resolve([...students]);
}

function getStudentsCount() {
  return Promise.resolve(students.length);
}

module.exports = {
  getStudentsCount,
  createStudent,
  updateStudentById,
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
