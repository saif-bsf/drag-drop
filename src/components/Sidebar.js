import React from "react";
import Search from "./Search";

const Sidebar = ({ tables }) => {
  const handleDragStart = (event, table) => {
    event.dataTransfer.setData("tableId", table.id);
  };
  return (
    <div className="h-full px-5">
      <Search />
      {tables.map((table) => (
        <div
          key={table.id}
          draggable
          onDragStart={(e) => handleDragStart(e, table)}
          className="p-3 text-center cursor-pointer"
        >
          {table.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
