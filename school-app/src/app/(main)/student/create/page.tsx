import { Metadata } from "next";
import StudentForm from "../../../../components/ui/student/StudentForm";
import PageWidthSizing from "../../../../components/lib/PageWidthSizing";
import PageSection from "../../../../components/lib/PageSection";
import TypographyHeading from "../../../../components/TypographyHeading";

export const metadata: Metadata = {
  title: "Student - Create",
  description: "Student - Create",
};

export default function StudentCreatePage() {
  return (
    <PageSection>
      <PageWidthSizing maxWidth="sm">
        <TypographyHeading renderAs="h3" className="text-center mb-2">
          Create Student
        </TypographyHeading>
        <StudentForm />
      </PageWidthSizing>
    </PageSection>
  );
}
