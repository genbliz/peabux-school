"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { DefinedRoutes } from "@/helper/constants";
import AppInput, { AppDateInput, AppSelectInput, AppSelectOption } from "../../AppInput";
import Button from "../../Button";
import { IReactFC, ITeacher } from "../../../types";
import Center from "../../Center";
import { AlertModalService } from "../../../helper/alert-service";
import { useZodValidation } from "../../../hooks/useZodValidation";
import Card from "../../Card";
import { createTeacherApi, updateTeacherApi } from "../../../helper/data-service";

function getDateOfBirthMax() {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 21);

  return maxDate.toISOString().split("T")[0];
}

const TeacherForm: IReactFC<{ teacher?: ITeacher }> = ({ teacher }) => {
  const router = useRouter();
  const zod = useZodValidation();

  const dateOfBirthMax = getDateOfBirthMax();

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(
    teacher || ({ title: "", dateOfBirth: "2024-01-23" } as ITeacher & { title: "" })
  );

  const handleFormDataChange = (fielName: keyof ITeacher, value: any) => {
    setFormData((prev) => ({ ...prev, [fielName]: value }));
  };

  const doSubmitForm = async () => {
    try {
      interface ITeacher {
        id: string;
        nationalId: number;
        name: string;
        surname: string;
        title: "Mr" | "Mrs" | "Miss" | "Dr" | "Prof";
        dateOfBirth: string;
        teacherNo: number;
        salary?: number;
      }

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
          .max(new Date(dateOfBirthMax), { message: "Age must not be less than 21" })
          .transform((f) => f.toISOString().split("T")[0])
          .pipe(z.string().date("Invalid date of birth")),
      });

      const validationResult = zod.validate(teacherSchema, formData);

      if (validationResult.errors) {
        const error01 = validationResult.errors[0];
        AlertModalService.warning(error01.formatedError || error01.originalError);
        return;
      }

      setIsSaving(true);

      if (validationResult.data?.id) {
        await updateTeacherApi({ ...validationResult.data });
      } else {
        await createTeacherApi({ ...validationResult.data });
      }

      AlertModalService.success({ title: "Submitted Successfully" });

      setIsSaving(false);
      router.push(DefinedRoutes.teachers);
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

        <AppSelectInput
          value={formData.title}
          handleChange={(e) => handleFormDataChange("title", e.target.value)}
          displayLabel="Title"
          inputName="title"
          isRequired={true}
          className="w-full"
        >
          <AppSelectOption value="">Select Title</AppSelectOption>
          <AppSelectOption value="Mr">Mr</AppSelectOption>
          <AppSelectOption value="Mrs">Mrs</AppSelectOption>
          <AppSelectOption value="Miss">Miss</AppSelectOption>
          <AppSelectOption value="Dr">Dr</AppSelectOption>
          <AppSelectOption value="Prof">Prof</AppSelectOption>
        </AppSelectInput>

        <AppDateInput
          value={formData.dateOfBirth}
          handleChange={(value) => handleFormDataChange("dateOfBirth", value)}
          placeholder="YYYY-MM-DD"
          displayLabel="Date of birth"
          inputName="dateOfBirth"
          isRequired={true}
          className="w-full"
          maxDate={formData.id ? undefined : dateOfBirthMax}
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

        <AppInput
          value={formData.salary}
          handleChange={(e) => handleFormDataChange("salary", e.target.value)}
          placeholder="Enter salary"
          displayLabel="Salary"
          inputName="salary"
          inputMode="numeric"
          type="number"
          isRequired={false}
          className="w-full"
        />

        {formData.teacherNo && (
          <AppInput
            value={formData.teacherNo}
            handleChange={(e) => {}}
            displayLabel="Teacher No"
            inputName="teacherNo"
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

export default TeacherForm;
