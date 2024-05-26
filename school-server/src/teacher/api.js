// @ts-check
const { randomUUID } = require("node:crypto");
const { GenericFriendlyError } = require("../helper/errors");

/**
 * @typedef ITeacher
 * @type {{
  id: string;
  nationalId: number;
  name: string;
  surname: string;
  title: "Mr" | "Mrs" | "Miss" | "Dr" | "Prof";
  dateOfBirth: string;
  teacherNo: number;
  salary?: number;
}}
*/

/**
 * @type ITeacher[]
 */
const teachers = [];

/**
 * @param {ITeacher} teacher
 */
function createTeacher(teacher) {
  const teacher01 = {
    ...teacher,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  if (teachers?.length) {
    const { teacherNo } = teachers.sort((a, b) => {
      if (a < b) {
        return 1;
      }
      return -1;
    })[0];
    teacher01.teacherNo = teacherNo + 1;
  } else {
    teacher01.teacherNo = 1001;
  }

  teachers.push(teacher01);

  return Promise.resolve(teacher01);
}

/**
 * @param {string} id
 * @returns Promise<ITeacher | undefined>
 */
function getTeacherById(id) {
  const teacher01 = teachers.find((f) => f.id === id);

  if (teacher01?.id) return Promise.resolve(teacher01);

  throw GenericFriendlyError.createBadRequestError("Teacher not found");
}

/**
 * @param {ITeacher} teacher
 * @returns Promise<ITeacher>
 */
function updateTeacherById(teacher) {
  const index = teachers.findIndex((f) => f.id === teacher?.id);
  if (index > -1) {
    const teacher01 = { ...teachers[index] };

    teachers[index] = { ...teacher01, ...teacher };

    return Promise.resolve(teachers[index]);
  }

  throw new GenericFriendlyError("Not found");
}

/**
 * @param {string} id
 * @returns Promise<ITeacher>
 */
function deleteTeacherById(id) {
  const index = teachers.findIndex((f) => f.id === id);
  if (index > -1) {
    const student01 = { ...teachers[index] };

    teachers.splice(index, 1);

    return Promise.resolve(student01);
  }

  throw GenericFriendlyError.createBadRequestError("Teacher not found");
}

function getAllTeachers() {
  return Promise.resolve([...teachers]);
}

function getTeachersCount() {
  return Promise.resolve(teachers.length);
}

module.exports = {
  getTeachersCount,
  createTeacher,
  updateTeacherById,
  getAllTeachers,
  getTeacherById,
  deleteTeacherById,
};
