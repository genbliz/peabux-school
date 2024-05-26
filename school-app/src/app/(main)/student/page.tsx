import { Metadata } from "next";
import StudentList from "../../../components/ui/student/StudentList";
import { getStudentsApi } from "../../../helper/data-service";
import Card from "../../../components/Card";
import PageSection from "../../../components/lib/PageSection";
import PageWidthSizing from "../../../components/lib/PageWidthSizing";
import TypographyHeading from "../../../components/TypographyHeading";
import { DefinedRoutes } from "../../../helper/constants";
import Center from "../../../components/Center";
import StackVertical from "../../../components/StackVertical";
import TypographyLink from "../../../components/TypographyLink";
import DangerAlertBox from "../../../components/DangerAlertBox";

export const metadata: Metadata = {
  title: "Students",
  description: "Students",
};

export default async function StudentPage() {
  const { errorMessage, resultData } = await getStudentsApi();

  return (
    <PageSection>
      <PageWidthSizing maxWidth="lg">
        <Center>
          <StackVertical className="gap-3 text-center">
            <TypographyHeading renderAs="h3" className="text-center mb-2">
              Students
            </TypographyHeading>
            <div className="text-center">
              <TypographyLink className="text-center" href={DefinedRoutes.studentCreate}>
                Add student
              </TypographyLink>
            </div>
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
                <StudentList students={resultData} />
              </Card>
            ) : (
              <>
                <p className="text-center">No students found</p>
              </>
            )}
          </>
        )}
      </PageWidthSizing>
    </PageSection>
  );
}
