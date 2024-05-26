//@ts-check
const { z } = require("zod");

function yearsAgo_21() {
  const dateOfBirthMin = new Date();
  dateOfBirthMin.setFullYear(dateOfBirthMin.getFullYear() - 21);
  return dateOfBirthMin;
}

/**
 * @param {boolean} [isUpdate]
 */
function createTeacherSchema(isUpdate) {
  const teacherSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    surname: z.string().min(1, { message: "Surname is required" }),
    title: z.enum(["Mr", "Mrs", "Miss", "Dr", "Prof"]),
    nationalId: z
      .number({
        coerce: true,
        message: "Invalid National Id",
        invalid_type_error: "Invalid National Id",
        required_error: "National Id is required",
      })
      .int("National Id must be number")
      .min(1, { message: "National Id is required" }),
    teacherNo: z.number({ coerce: true }).int("Teacher Number must be number").optional(),
    salary: z.number({ coerce: true }).optional(),

    dateOfBirth: z
      .date({
        coerce: true,
        invalid_type_error: "Invalid date of birth",
        required_error: "Date of birth is required",
      })
      .max(yearsAgo_21(), { message: "Age must not be less than 21" })
      .transform((f) => f.toISOString().split("T")[0])
      .pipe(z.string().date("Invalid date of birth")),
  });

  return teacherSchema;
}

module.exports = { createTeacherSchema };
