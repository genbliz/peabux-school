import { Metadata } from "next";
import StudentForm from "../../../../components/ui/student/StudentForm";
import { getStudentByIdApi, getTeacherByIdApi } from "../../../../helper/data-service";
import TypographyHeading from "../../../../components/TypographyHeading";
import { DefinedRoutes } from "../../../../helper/constants";
import TypographyLink from "../../../../components/TypographyLink";
import PageSection from "../../../../components/lib/PageSection";
import PageWidthSizing from "../../../../components/lib/PageWidthSizing";
import TeacherForm from "../../../../components/ui/teacher/TeacherForm";
import DangerAlertBox from "../../../../components/DangerAlertBox";

export const metadata: Metadata = {
  title: "Teacher Details",
  description: "Teacher Details",
};

export default async function TeacherDetailsPage({ params }: { params: { id: string } }) {
  const { errorMessage, resultData } = await getTeacherByIdApi(params["id"]);

  console.log({ errorMessage, resultData });

  return (
    <PageSection>
      <PageWidthSizing maxWidth="sm">
        <TypographyHeading renderAs="h3" className="text-center mb-2">
          Teacher Details
        </TypographyHeading>

        {errorMessage ? (
          <>
            <DangerAlertBox>{errorMessage}</DangerAlertBox>
          </>
        ) : (
          <>
            {resultData?.id ? (
              <TeacherForm teacher={resultData} />
            ) : (
              <>
                <p className="text-center">No student found</p>
                <div className="mt-2 text-center">
                  <TypographyLink href={DefinedRoutes.students}>Goto list</TypographyLink>
                </div>
              </>
            )}
          </>
        )}
      </PageWidthSizing>
    </PageSection>
  );
}
