import { tailwindClassResolve } from "@/helper/util";
import { IReactFC } from "@/types";

export const Table: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([
    //
    "w-full text-sm text-left",
    className,
  ]);

  return <table className={className01}>{children}</table>;
};

export const TableHead: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([
    //
    className,
  ]);

  return <thead className={className01}>{children}</thead>;
};

export const TableTh: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([
    //
    "px-6 py-3",
    className,
  ]);

  return (
    <th scope="col" className={className01}>
      {children}
    </th>
  );
};

export const TableBody: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([
    //
    className,
  ]);

  return <tbody className={className01}>{children}</tbody>;
};

export const TableTd: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([
    //
    "px-6 py-4",
    className,
  ]);

  return <td className={className01}>{children}</td>;
};

export const TableTr: IReactFC<{ className?: string }> = ({ children, className }) => {
  const className01 = tailwindClassResolve([
    //
    "bg-white border-b hover:bg-gray-50",
    className,
  ]);

  return <tr className={className01}>{children}</tr>;
};

export default Table;

{
  /* <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Product name
        </th>
        <th scope="col" class="px-6 py-3">
          Color
        </th>
        <th scope="col" class="px-6 py-3">
          Category
        </th>
        <th scope="col" class="px-6 py-3">
          Price
        </th>
        <th scope="col" class="px-6 py-3">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Apple MacBook Pro 17"
        </th>
        <td class="px-6 py-4">Silver</td>
        <td class="px-6 py-4">Laptop</td>
        <td class="px-6 py-4">$2999</td>
        <td class="px-6 py-4 text-right">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Edit
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>; */
}
