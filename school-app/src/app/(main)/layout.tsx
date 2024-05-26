import { IReactFC } from "@/types";
import PageHeader from "../../components/lib/page-header/PageHeader";
import PageContent from "../../components/lib/PageContent";

const MainLayout: IReactFC = ({ children }) => {
  return (
    <>
      <PageHeader sticky />
      <PageContent hasHeader>{children}</PageContent>
    </>
  );
};

export default MainLayout;
