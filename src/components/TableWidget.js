import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const TableWidget = ({ table, onClose, onColumnDrop }) => {
  const [columns, setColumns] = useState(table.columns);

  const handleDragStart = (event, column) => {
    event.dataTransfer.setData("column", JSON.stringify(column));
    event.dataTransfer.setData("sourceTableId", table.id);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    let newColumn = event.dataTransfer.getData("column");
    let sourceTableId = event.dataTransfer.getData("sourceTableId");
    if (newColumn && sourceTableId !== table.id) {
      newColumn = JSON.parse(newColumn);
      setColumns((prevCols) => [...prevCols, newColumn]);
      onColumnDrop(sourceTableId, table.id);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="grid-stack-item-content bg-white rounded-lg overflow-y-scroll relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <table className="table border border-gray-400 w-full border-r-4 table-fixed">
        <caption className="caption drag-handle font-bold cursor-move sticky caption-top top-0 z-10 w-full bg-white">
          {table.name}{" "}
          <IoIosClose
            className="float-right cursor-pointer"
            size={24}
            onClick={onClose}
          />
        </caption>
        <thead>
          <tr>
            <th className="p-3 border">Column</th>
            <th className="p-3 border">Data Type</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((column) => (
            <tr
              key={column.column_id}
              draggable
              onDragStart={(e) => handleDragStart(e, column)}
              className="border cursor-grab"
            >
              <td className="p-3 text-center">{column.name}</td>
              <td className="p-3 text-center">{column.column_data_type}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="text-center sticky bottom-0 w-full bg-gray-300 z-10">
          <tr>
            <td colSpan={2}>Scroll to see more columns</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableWidget;
