//@ts-check
const { z, ZodType } = require("zod");

/**
 * @typedef IReturnedZodError
 * @type {{
  fieldName: string;
  originalError: string;
  formatedError?: string;
}}
*/

/**
 * @param {ZodType} zodType
 * @param {any} input
 */
function zodValidate(zodType, input) {
  const error01 = zodType.safeParse(input);

  if (!error01.success) {
    /** @type {IReturnedZodError[]} */
    const errors = [];
    const fieldErrors = error01?.error?.formErrors?.fieldErrors;

    if (fieldErrors) {
      Object.keys(fieldErrors).forEach((fieldName) => {
        const value = fieldErrors[fieldName]?.[0];
        if (value) {
          /** @type {IReturnedZodError} */
          const out01 = {
            fieldName,
            originalError: value,
          };

          if (value === "Required") {
            out01.formatedError = `${fieldName} is Required`;
          } else {
            out01.formatedError = `${fieldName}:: ${value}`;
          }

          errors.push(out01);
        }
      });
    }
    return { errors };
  }
  return { data: error01.data };
}

/**
 * @param {string} message
 */
function getPhoneSchema(message) {
  const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return z.string().regex(regex, message);
}

module.exports = { zodValidate, getPhoneSchema };
