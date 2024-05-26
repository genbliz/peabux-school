"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { DefinedRoutes } from "@/helper/constants";
import AppInput, { AppDateInput } from "../../AppInput";
import Button from "../../Button";
import { IStudent, IReactFC } from "../../../types";
import Center from "../../Center";
import { AlertModalService } from "../../../helper/alert-service";
import { useZodValidation } from "../../../hooks/useZodValidation";
import Card from "../../Card";
import { createStudentApi, updateStudentApi } from "../../../helper/data-service";

function getDateOfBirthMin() {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 22);

  return minDate.toISOString().split("T")[0];
}

const StudentForm: IReactFC<{ student?: IStudent }> = ({ student }) => {
  const router = useRouter();
  const zod = useZodValidation();

  const dateOfBirthMin = getDateOfBirthMin();

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(student || ({} as IStudent));

  const handleFormDataChange = (fielName: keyof IStudent, value: any) => {
    setFormData((prev) => ({ ...prev, [fielName]: value }));
  };

  const doSubmitForm = async () => {
    try {
      const studentSchema = z.object({
        id: z.string().uuid().optional(),
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
          .min(new Date(dateOfBirthMin), { message: "Age may not be more than 22" })
          .transform((f) => f.toISOString().split("T")[0])
          .pipe(z.string().date("Invalid date of birth")),
      });

      const validationResult = zod.validate(studentSchema, formData);

      if (validationResult.errors) {
        const error01 = validationResult.errors[0];
        AlertModalService.warning(error01.formatedError || error01.originalError);
        return;
      }

      setIsSaving(true);

      if (validationResult.data?.id) {
        await updateStudentApi({ ...validationResult.data });
      } else {
        await createStudentApi({ ...validationResult.data });
      }

      AlertModalService.success("Submitted Successfully");

      // await UtilService.waitUntilMilliseconds(2000);
      setIsSaving(false);
      router.push(DefinedRoutes.students);
      router.refresh();
    } catch (error) {
      AlertModalService.error("Error occured");
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <div className="flex flex-col gap-2">
        <AppInput
          value={formData.surname}
          handleChange={(e) => handleFormDataChange("surname", e.target.value)}
          placeholder="Enter Surname"
          displayLabel="Surname"
          inputName="surname"
          isRequired={true}
          className="w-full"
        />

        <AppInput
          value={formData.name}
          handleChange={(e) => handleFormDataChange("name", e.target.value)}
          placeholder="Enter Name"
          displayLabel="Name"
          inputName="name"
          isRequired={true}
          className="w-full"
        />

        <AppDateInput
          value={formData.dateOfBirth}
          handleChange={(value) => handleFormDataChange("dateOfBirth", value)}
          placeholder="YYYY-MM-DD"
          displayLabel="Date of birth"
          inputName="dateOfBirth"
          isRequired={true}
          className="w-full"
          minDate={formData.id ? undefined : dateOfBirthMin}
        />

        <AppInput
          value={formData.nationalId}
          handleChange={(e) => handleFormDataChange("nationalId", e.target.value)}
          placeholder="Enter National Id"
          displayLabel="National Id"
          inputName="nationalId"
          inputMode="numeric"
          type="number"
          isRequired={true}
          className="w-full"
        />

        {formData.studentNo && (
          <AppInput
            value={formData.studentNo}
            handleChange={(e) => {}}
            displayLabel="Student No"
            inputName="studentNo"
            type="number"
            className="w-full"
            isReadOnly={true}
          />
        )}

        <Center className="w-full pt-4">
          <Button
            isDisabled={isSaving}
            handleClick={() => {
              doSubmitForm().catch(() => {});
            }}
            isBusy={isSaving}
            variant="brand"
            className=""
          >
            Submit
          </Button>
        </Center>
      </div>
    </Card>
  );
};

export default StudentForm;
