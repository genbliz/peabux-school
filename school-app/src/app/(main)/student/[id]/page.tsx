import { Metadata } from "next";
import StudentForm from "../../../../components/ui/student/StudentForm";
import { getStudentByIdApi } from "../../../../helper/data-service";
import TypographyHeading from "../../../../components/TypographyHeading";
import { DefinedRoutes } from "../../../../helper/constants";
import TypographyLink from "../../../../components/TypographyLink";
import PageSection from "../../../../components/lib/PageSection";
import PageWidthSizing from "../../../../components/lib/PageWidthSizing";
import DangerAlertBox from "../../../../components/DangerAlertBox";

export const metadata: Metadata = {
  title: "Student Details",
  description: "Student Details",
};

export default async function StudentDetailsPage({ params }: { params: { id: string } }) {
  const { errorMessage, resultData } = await getStudentByIdApi(params["id"]);

  return (
    <PageSection>
      <PageWidthSizing maxWidth="sm">
        <TypographyHeading renderAs="h3" className="text-center mb-2">
          Student Details
        </TypographyHeading>

        {errorMessage ? (
          <>
            <DangerAlertBox>{errorMessage}</DangerAlertBox>
          </>
        ) : (
          <>
            {resultData?.id ? (
              <StudentForm student={resultData} />
            ) : (
              <>
                <p className="text-center">No student found</p>
                <div className="mt-2 text-center">
                  <TypographyLink className="text-center" href={DefinedRoutes.students}>
                    Goto list
                  </TypographyLink>
                </div>
              </>
            )}
          </>
        )}
      </PageWidthSizing>
    </PageSection>
  );
}
