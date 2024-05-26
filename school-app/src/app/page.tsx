import { Metadata } from "next";
import PageHeader from "../components/lib/page-header/PageHeader";
import PageContent from "../components/lib/PageContent";
import Card from "../components/Card";
import Center from "../components/Center";
import StackVertical from "../components/StackVertical";
import TypographyHeading from "../components/TypographyHeading";
import PageSection from "../components/lib/PageSection";
import PageWidthSizing from "../components/lib/PageWidthSizing";
import { getTeachersDashboardApi } from "../helper/data-service";

export const metadata: Metadata = {
  title: "School Dashboard",
  description: "School Dashboard",
};

export default async function DashboardPage() {
  const { resultData } = await getTeachersDashboardApi();

  return (
    <>
      <PageHeader sticky />

      <PageContent hasHeader>
        <PageSection>
          <PageWidthSizing maxWidth="lg">
            <Center>
              <StackVertical className="gap-3">
                <TypographyHeading renderAs="h3">Dashboard</TypographyHeading>
              </StackVertical>
            </Center>

            <div className="h-9" />

            <div className="flex flex-col md:flex-row gap-3 justify-center">
              <Card className="rounded min-h-[120px] max-w-[400px]">
                <Center>
                  <TypographyHeading renderAs="h6">Teachers</TypographyHeading>
                  <div className="h-5" />
                  <TypographyHeading>{resultData?.teachers || 0}</TypographyHeading>
                </Center>
              </Card>

              <Card className="rounded min-h-[120px] max-w-[400px]">
                <Center>
                  <TypographyHeading renderAs="h6">Students</TypographyHeading>
                  <div className="h-5" />
                  <TypographyHeading>{resultData?.students || 0}</TypographyHeading>
                </Center>
              </Card>
            </div>
          </PageWidthSizing>
        </PageSection>
      </PageContent>
    </>
  );
}
