import { tailwindClassResolve } from "@/helper/util";
import { IReactFC, IStudent, ITeacher } from "@/types";
import Table, { TableBody, TableHead, TableTd, TableTh, TableTr } from "../table";
import TypographyLink from "../../TypographyLink";
import { DefinedRoutes } from "../../../helper/constants";

const TeacherList: IReactFC<{ className?: string; teachers: ITeacher[] }> = ({ className, teachers }) => {
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
            <TableTh>Teacher No</TableTh>
            <TableTh>National Id</TableTh>
            <TableTh>Date Of Birth</TableTh>
            <TableTh>Salary</TableTh>
            <TableTh className="text-right"></TableTh>
          </TableTr>
        </TableHead>

        <TableBody>
          {teachers.map((teacher) => {
            return (
              <TableTr key={teacher.nationalId}>
                <TableTd>{teacher.surname}</TableTd>
                <TableTd>{teacher.name}</TableTd>
                <TableTd>{teacher.teacherNo}</TableTd>
                <TableTd>{teacher.nationalId}</TableTd>
                <TableTd>{teacher.dateOfBirth}</TableTd>
                <TableTd>{teacher.salary}</TableTd>
                <TableTd>
                  <TypographyLink href={DefinedRoutes.teacherDetail(teacher.id)}>Edit</TypographyLink>
                </TableTd>
              </TableTr>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeacherList;
