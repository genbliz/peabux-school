import PageHeader from "../components/lib/page-header/PageHeader";
import PageContent from "../components/lib/PageContent";

export default function Custom404() {
  return (
    <>
      <PageHeader sticky />

      <PageContent hasHeader={true} className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center">
        <p className="text-2xl">Page not found</p>
      </PageContent>

      {/* <PageFooter /> */}
    </>
  );
}
