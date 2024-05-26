import { z, ZodType } from "zod";

interface IReturnedZodError {
  fieldName: string;
  originalError: string;
  formatedError?: string;
}

export function useZodValidation() {
  function validate<T = any>(zodType: ZodType, input: T) {
    const error01 = zodType.safeParse(input);

    if (!error01.success) {
      const errors: IReturnedZodError[] = [];
      const fieldErrors = error01?.error?.formErrors?.fieldErrors;

      if (fieldErrors) {
        Object.keys(fieldErrors).forEach((fieldName) => {
          const value = fieldErrors[fieldName]?.[0];
          if (value) {
            const out01: IReturnedZodError = {
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
    return { data: error01.data as T };
  }

  function getPhoneSchema(message: string) {
    const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return z.string().regex(regex, message);
  }
  return { validate, getPhoneSchema };
}
