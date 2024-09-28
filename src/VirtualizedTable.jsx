import React, { useMemo } from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import "./App.css"; // Add custom CSS or replace with Tailwind utility classes

// Table component
function VirtualizedTable({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 100, // Minimum column width
      maxWidth: 400, // Maximum column width
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth, // For proper sizing
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout
  );

  const RenderRow = ({ index, style }) => {
    const row = rows[index];
    prepareRow(row);
    return (
      <div
        {...row.getRowProps({
          style,
        })}
        className="table-row flex text-sm text-gray-700"
      >
        {row.cells.map((cell) => (
          <div
            {...cell.getCellProps()}
            className="table-cell p-2 border-b border-gray-200"
          >
            {cell.render("Cell")}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div {...getTableProps()} className="table w-full border-collapse">
      <div className="thead bg-gray-100">
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className="flex">
            {headerGroup.headers.map((column) => (
              <div
                {...column.getHeaderProps()}
                className="table-cell p-2 font-semibold border-b border-gray-300"
              >
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* React Window for virtualized rows */}
      <div {...getTableBodyProps()} className="tbody">
        <FixedSizeList
          height={400} // Set your desired height
          itemCount={rows.length}
          itemSize={35} // Row height
          width={totalColumnsWidth}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}

export default VirtualizedTable;
