"use client";

import Loading from "@/components/Loading";
import {
  Avatar,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { BsCircleFill } from "react-icons/bs";

function SupplierTable({ id }) {
  const [page, setPage] = useState(1);
  const [supplier, setSupplier] = useState([]);
  const [dataStatus, setDataStatus] = useState(<Loading />);

  useEffect(() => {
    fetch("/api/inventory/supplier", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setSupplier(
          data.map((sup) => {
            return {
              ...sup,
              image: <Avatar size="sm" src={"/kuldip_upload/" + sup?.image} />,
              address: <div className="max-w-80 text-wrap">{sup?.address}</div>,
              supplied_material_id: (
                <Tooltip
                  content={
                    <div className="p-2 flex flex-col gap-3 bg-purple-100/10 backdrop-blur-2xl rounded-xl border-1 border-purple-400  max-w-[350px] flex-1 hover:bg-purple-200/20">
                      {sup?.supplied_material_id?.map((item) => {
                        return (
                          <div
                            key={item.raw_material_id}
                            className="flex flex-row gap-2 justify-between items-center"
                          >
                            <Avatar
                              size="sm"
                              src={"/kuldip_upload/" + item?.image}
                            />
                            <span className="capitalize">{item?.name}</span>
                            <span className="lowercase">
                              | {item?.raw_material_group_id}
                            </span>
                            <span className="flex flex-row items-center">
                              |{" "}
                              <BsCircleFill
                                style={{ color: item?.color || "transparent" }}
                              />
                            </span>
                            <span>
                              | {item?.size} {item?.unit_of_measurement}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  }
                  placement="left"
                  delay={500}
                  className="bg-transparent border-none shadow-none inline-block"
                >
                  <div className="flex">
                    {sup?.supplied_material_id?.length > 3 ? (
                      <span className="flex flex-row gap-0 items-center">
                        <BsCircleFill />
                        <BsCircleFill />
                        <BsCircleFill />+{sup?.supplied_material_id?.length - 3}
                      </span>
                    ) : (
                      sup?.supplied_material_id?.map((item, i) => {
                        return <BsCircleFill key={item.raw_material_id} />;
                      })
                    )}
                  </div>
                </Tooltip>
              ),
            };
          })
        );
      })
      .catch((e) => {
        console.log(e);
        setDataStatus("No Suppliers Are Available");
      });

    // const temp = [
    //   {
    //     key: 1,
    //     image: "/AdminPage.svg",
    //     name: "supplier name1",
    //     email: "kuldipsarvaiya@gmail.com",
    //     contact_no: 1234567890,
    //     address: "23, Main Street, Suite , Suite, Suite 330",
    //     total_completed_orders: "10",
    //     supplied_material_id: [
    //       {
    //         raw_material_id: "d23r543sd23g34",
    //         name: "this material",
    //         image: "/AdminPage.svg",
    //       },
    //       {
    //         raw_material_id: "d23r543sdg34",
    //         name: "this material",
    //         image: "/AdminPage.svg",
    //       },
    //     ],
    //   },
    //   {
    //     key: 2,
    //     image: "/AdminPage.svg",
    //     name: "supplier name11",
    //     email: "kuldipsarvaiya@gmail.com",
    //     contact_no: 1234567890,
    //     address: "23, Main Street, Suite , Suite, Suite 330",
    //     total_completed_orders: "3",
    //     supplied_material_id: [
    //       {
    //         raw_material_id: "d23r54a5s3sdg34",
    //         name: "this material",
    //         image: "/AdminPage.svg",
    //       },
    //       {
    //         raw_material_id: "d23r543sd32g34",
    //         name: "this material",
    //         image: "/AdminPage.svg",
    //       },
    //     ],
    //   },
    //   {
    //     key: 3,
    //     image: "/AdminPage.svg",
    //     name: "supplier name2",
    //     email: "kuldipsarvaiya@gmail.com",
    //     contact_no: 1234567890,
    //     address: "23, Main Street, Suite , Suite, Suite 330",
    //     total_completed_orders: "0",
    //     supplied_material_id: [
    //       {
    //         raw_material_id: "d23r5434swqdg34",
    //         name: "this material",
    //         image: "/AdminPage.svg",
    //       },
    //       {
    //         raw_material_id: "d23r543szdg34",
    //         name: "this material",
    //         image: "/AdminPage.svg",
    //       },
    //       {
    //         raw_material_id: "d233r543sdgv34",
    //         name: "this material",
    //         image: "/AdminPage.svg",
    //       },
    //     ],
    //   },
    //   {
    //     key: 4,
    //     image: "/AdminPage.svg",
    //     name: "supplier name22",
    //     email: "kuldipsarvaiya@gmail.com",
    //     contact_no: 1234567890,
    //     address: "23, Main Street, Suite , Suite, Suite 330",
    //     total_completed_orders: "67",
    //     supplied_material_id: [
    //       {
    //         raw_material_id: "d23r543zassdg34",
    //         name: "this material",
    //         image: "/AdminPage.svg",
    //       },
    //       {
    //         raw_material_id: "d23rgfa5243sdg34",
    //         name: "this material",
    //         image: "/AdminPage.svg",
    //       },
    //     ],
    //   },
    //   {
    //     key: 5,
    //     image: "/AdminPage.svg",
    //     name: "supplier name3",
    //     email: "kuldipsarvaiya@gmail.com",
    //     contact_no: 1234567890,
    //     address: "23, Main Street, Suite , Suite, Suite 330 ",
    //     total_completed_orders: "1",
    //     supplied_material_id: [
    //       {
    //         raw_material_id: "d23r543sd1g32sas4",
    //         name: "this material",
    //         image: "/AdminPage.svg",
    //       },
    //     ],
    //   },
    // ].map((sup) => {
    //   return {
    //     ...sup,
    //     image: <Avatar size="sm" src={sup?.image} />,
    //     address: <div className="max-w-80 text-wrap">{sup?.address}</div>,
    //     supplied_material_id: (
    //       <Tooltip
    //         content={
    //           <div className="p-2 flex flex-col gap-3 bg-purple-100/10 backdrop-blur-2xl rounded-xl border-1 border-purple-400  max-w-[350px] flex-1 hover:bg-purple-200/20">
    //             {sup?.supplied_material_id?.map((item) => {
    //               return (
    //                 <div
    //                   key={item.raw_material_id}
    //                   className="flex flex-row gap-2 justify-between items-center"
    //                 >
    //                   <Avatar size="sm" src={item?.image} />
    //                   <span className="capitalize">{item?.name}</span>
    //                   <span>{item?.raw_material_id}</span>
    //                 </div>
    //               );
    //             })}
    //           </div>
    //         }
    //         placement="left"
    //         delay={500}
    //         className="bg-transparent border-none shadow-none inline-block"
    //       >
    //         <div className="flex">
    //           {sup?.supplied_material_id?.map((item, i) => {
    //             return <BsCircleFill key={item.raw_material_id} />;
    //           })}
    //         </div>
    //       </Tooltip>
    //     ),
    //   };
    // });

    // setSupplier(temp);
  }, []);

  const rowsPerPage = 10;
  const pages = Math.ceil(supplier.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return supplier.slice(start, end);
  }, [page, supplier]);

  return (
    <Table
      id={id}
      aria-label="suppliers of raw material of company"
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
        <TableColumn key={"image"}></TableColumn>
        <TableColumn key={"name"}>NAME</TableColumn>
        <TableColumn key={"contact_no"}>CONTACT</TableColumn>
        <TableColumn key={"total_completed_orders"}>ORDERS</TableColumn>
        <TableColumn key={"email"}>EMAIL</TableColumn>
        <TableColumn key={"address"}>ADDRESS</TableColumn>
        <TableColumn key={"supplied_material_id"}>MATERIALS</TableColumn>
      </TableHeader>
      <TableBody items={items} emptyContent={dataStatus}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default SupplierTable;
