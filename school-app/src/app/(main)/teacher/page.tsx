import { Metadata } from "next";
import { getTeachersApi } from "../../../helper/data-service";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Center from "../../../components/Center";
import StackVertical from "../../../components/StackVertical";
import TypographyHeading from "../../../components/TypographyHeading";
import TypographyLink from "../../../components/TypographyLink";
import PageSection from "../../../components/lib/PageSection";
import PageWidthSizing from "../../../components/lib/PageWidthSizing";
import StudentList from "../../../components/ui/student/StudentList";
import { DefinedRoutes } from "../../../helper/constants";
import TeacherList from "../../../components/ui/teacher/TeacherList";
import DangerAlertBox from "../../../components/DangerAlertBox";

export const metadata: Metadata = {
  title: "Teachers",
  description: "Teachers",
};

export default async function TeacherPage() {
  const { errorMessage, resultData } = await getTeachersApi();

  return (
    <PageSection>
      <PageWidthSizing maxWidth="lg">
        <Center>
          <StackVertical className="gap-3 text-center">
            <TypographyHeading renderAs="h3">Teachers</TypographyHeading>
            <TypographyLink href={DefinedRoutes.teacherCreate}>Add teacher</TypographyLink>
          </StackVertical>
        </Center>

        <div className="h-4" />

        {errorMessage ? (
          <>
            <DangerAlertBox>{errorMessage}</DangerAlertBox>
          </>
        ) : (
          <>
            {resultData?.length ? (
              <Card className="p-0">
                <TeacherList teachers={resultData} />
              </Card>
            ) : (
              <>
                <p className="text-center">No teachers found</p>
              </>
            )}
          </>
        )}
      </PageWidthSizing>
    </PageSection>
  );
}
