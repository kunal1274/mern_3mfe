import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";
//import "./App.css"; // Keeping this if you have additional custom styles

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="min-w-full table-auto border-collapse border border-gray-300"
      >
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 text-center font-medium text-gray-700"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-50">
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-gray-600"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ReactTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios("http://api.tvmaze.com/search/shows?q=girls")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "TV Show",
        columns: [
          {
            Header: "Id",
            accessor: "show.id",
          },
          {
            Header: "Weight",
            accessor: "show.weight",
          },
          {
            Header: "Name",
            accessor: "show.name",
          },
          {
            Header: "Avg Run Time",
            accessor: "show.averageRuntime",
          },
          {
            Header: "Type",
            accessor: "show.type",
          },
          {
            Header: "Language",
            accessor: "show.language",
          },
          {
            Header: "Official Site",
            accessor: "show.officialSite",
            Cell: ({ cell: { value } }) =>
              value ? (
                <a href={value} className="text-blue-500 underline">
                  {value}
                </a>
              ) : (
                "-"
              ),
          },
          {
            Header: "Rating",
            accessor: "show.rating.average",
            Cell: ({ cell: { value } }) => (value ? <p>{value}</p> : "-"),
          },
          {
            Header: "Status",
            accessor: "show.status",
          },
          {
            Header: "Premiered",
            accessor: "show.premiered",
            Cell: ({ cell: { value } }) => value || "-",
          },
          {
            Header: "Time",
            accessor: "show.schedule.time",
            Cell: ({ cell: { value } }) => value || "-",
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">React Table Demo</h1>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default ReactTable;
