import { tailwindClassResolve } from "@/helper/util";
import { IReactFC, IStudent } from "@/types";
import Table, { TableBody, TableHead, TableTd, TableTh, TableTr } from "../table";
import TypographyLink from "../../TypographyLink";
import { DefinedRoutes } from "../../../helper/constants";

const StudentList: IReactFC<{ className?: string; students: IStudent[] }> = ({ children, className, students }) => {
  const className01 = tailwindClassResolve([
    //
    className,
  ]);

  return (
    <div className={className01}>
      <Table>
        <TableHead>
          <TableTr>
            <TableTh>Surname</TableTh>
            <TableTh>Name</TableTh>
            <TableTh>Student No</TableTh>
            <TableTh>National Id</TableTh>
            <TableTh>Date Of Birth</TableTh>
            <TableTh className="text-right"></TableTh>
          </TableTr>
        </TableHead>

        <TableBody>
          {students.map((student) => {
            return (
              <TableTr key={student.nationalId}>
                <TableTd>{student.surname}</TableTd>
                <TableTd>{student.name}</TableTd>
                <TableTd>{student.studentNo}</TableTd>
                <TableTd>{student.nationalId}</TableTd>
                <TableTd>{student.dateOfBirth}</TableTd>
                <TableTd>
                  <TypographyLink href={DefinedRoutes.studentDetail(student.id)}>Edit</TypographyLink>
                </TableTd>
              </TableTr>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentList;
