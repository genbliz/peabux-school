//@ts-check
const { z } = require("zod");

function yearsAgo_22() {
  const now = new Date();
  now.setFullYear(now.getFullYear() - 22);
  return now;
}

/**
 * @param {boolean} [isUpdate]
 */
function createStudentSchema(isUpdate) {
  const studentSchema = z.object({
    id: isUpdate
      ? z
          .string({
            required_error: "Id is required",
            invalid_type_error: "Invalid Id",
          })
          .uuid({ message: "Id is required" })
      : z.string().uuid().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    surname: z.string().min(1, { message: "Surname is required" }),

    nationalId: z
      .number({
        coerce: true,
        message: "Invalid National Id",
        invalid_type_error: "Invalid National Id",
        required_error: "National Id is required",
      })
      .int("National Id must be an integer")
      .gte(1, { message: "National Id must greater or equals to 1" }),

    studentNo: z.number({ coerce: true }).optional(),
    dateOfBirth: z
      .date({
        coerce: true,
        invalid_type_error: "Invalid date of birth",
        required_error: "Date of birth is required",
      })
      .min(yearsAgo_22(), { message: "Age may not be more than 22" })
      .transform((f) => f.toISOString().split("T")[0])
      .pipe(z.string().date("Invalid date of birth")),
  });

  return studentSchema;
}

module.exports = { createStudentSchema };
