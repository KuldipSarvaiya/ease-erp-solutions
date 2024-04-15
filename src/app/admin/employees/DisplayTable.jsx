"use client";

import { changeDesignation } from "@/lib/utils/server_actions/admin";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import { IoMdRemoveCircleOutline } from "react-icons/io";

function DisplayTable({ data, remove, add, updated_by }) {
  const [page, setPage] = useState(1);

  const emp = data?.map((emp, i) => {
    return {
      key: emp?._id,
      ...emp,
      department: emp?.department?.dept_name,
      name: emp?.first_name + " " + emp?.middle_name,
      doj: new Date(emp?.doj).toLocaleDateString(),
      action: (
        <form action={changeDesignation}>
          <input
            hidden
            readOnly
            defaultValue={updated_by}
            required
            name="updated_by"
          />
          <input
            hidden
            readOnly
            defaultValue={emp?._id}
            required
            name="employee_id"
          />
          <input
            hidden
            readOnly
            defaultValue={remove ? "Employee" : "Admin"}
            required
            name="designation"
          />
          <Button
            type="submit"
            isIconOnly
            size="sm"
            color="secondary"
            variant="ghost"
            title={
              add
                ? "Give User Admin Role"
                : remove && "Remove User From Admin Role [Employee]"
            }
          >
            {add && <GrUserAdmin className="scale-125" />}{" "}
            {remove && <IoMdRemoveCircleOutline className="scale-150" />}
          </Button>
        </form>
      ),
    };
  });

  const rowsPerPage = 5;
  const pages = Math.ceil(emp.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return emp.slice(start, end);
  }, [page, emp]);

  // console.log(emp);

  return (
    <Table
      id="download-table"
      aria-label="expenses of company for the all time"
      aria-labelledby="expenses of company for the all time"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn key={"username"}>USERNAME</TableColumn>
        <TableColumn key={"name"}>NAME</TableColumn>
        <TableColumn key={"gender"}>GENDER</TableColumn>
        <TableColumn key={"doj"}>DOJ</TableColumn>
        <TableColumn key={"basic_salary"}>SALARY</TableColumn>
        <TableColumn key={"email"}>EMAIL</TableColumn>
        <TableColumn key={"department"}>DEPARTMENT</TableColumn>
        <TableColumn key={"action"}>ADMIN ROLE</TableColumn>
      </TableHeader>
      <TableBody items={items} emptyContent={"NO DATA FOUND"}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default DisplayTable;
