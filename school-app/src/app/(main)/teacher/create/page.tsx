import { Metadata } from "next";
import StudentForm from "../../../../components/ui/student/StudentForm";
import PageWidthSizing from "../../../../components/lib/PageWidthSizing";
import PageSection from "../../../../components/lib/PageSection";
import TypographyHeading from "../../../../components/TypographyHeading";
import TeacherForm from "../../../../components/ui/teacher/TeacherForm";

export const metadata: Metadata = {
  title: "Teacher - Create",
  description: "Teacher - Create",
};

export default function TeacherCreatePage() {
  return (
    <PageSection>
      <PageWidthSizing maxWidth="sm">
        <TypographyHeading renderAs="h3" className="text-center mb-2">
          Create Teacher
        </TypographyHeading>
        <TeacherForm />
      </PageWidthSizing>
    </PageSection>
  );
}
