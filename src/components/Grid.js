import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import TableWidget from "./TableWidget";
import Xarrow, { Xwrapper, useXarrow } from "react-xarrows";

const DEFAULT_TABLE_W = "3";
const DEFAULT_TABLE_H = "2";
const ALERT_TEXT = "Table Already In Grid";

const Grid = ({ tables }) => {
  const gridRef = useRef(null);
  const updateXarrow = useXarrow();
  const [tablesInGrid, setTablesInGrid] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const grid = GridStack.init({
      float: true,
      draggable: {
        handle: ".drag-handle",
      },
    });
    gridRef.current = grid;
    grid.on("dragstart", (event) => {
      updateXarrow();
    });
    grid.on("dragstop", (event) => {
      updateXarrow();
    });
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const tableId = event.dataTransfer.getData("tableId");
    const isTableExist = tablesInGrid.find((t) => t.id === tableId);
    if (isTableExist) {
      alert(ALERT_TEXT);
    } else {
      const table = tables.find((t) => t.id === tableId);

      if (table) {
        createNewTable(table);
      }
    }
  };

  const createNewTable = (table) => {
    const newTable = document.createElement("div");
    newTable.className = "grid-stack-item";
    newTable.id = table.id;
    newTable.setAttribute("gs-w", DEFAULT_TABLE_W);
    newTable.setAttribute("gs-h", DEFAULT_TABLE_H);
    const newTableComponent = (
      <TableWidget
        table={table}
        onClose={() => handleClose(table.id)}
        onColumnDrop={handleColumnDrop}
      />
    );
    ReactDOM.render(newTableComponent, newTable);
    const closeIcon = newTable.querySelector(".close-icon");
    if (closeIcon) {
      closeIcon.addEventListener("click", () => handleClose(table.id));
    }
    gridRef.current.addWidget(newTable);
    setTablesInGrid((prevTables) => [...prevTables, table]);
  };

  const handleClose = (tableId) => {
    gridRef.current.removeWidget(tableId);

    setTablesInGrid((prevTables) =>
      prevTables.filter((table) => table.id !== tableId)
    );

    setConnections((prevConnections) =>
      prevConnections.filter(
        (conn) =>
          conn.sourceTableId !== tableId && conn.targetTableId !== tableId
      )
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleColumnDrop = (sourceTableId, targetTableId) => {
    const exists = connections.some(
      (conn) =>
        conn.sourceTableId === sourceTableId &&
        conn.targetTableId === targetTableId
    );

    if (!exists) {
      setConnections((prevConnections) => [
        ...prevConnections,
        { sourceTableId, targetTableId },
      ]);
    }
  };

  return (
    <div className="p-5 h-full w-full bg-gray-200 rounded-lg">
      <Xwrapper>
        <div
          className="grid-stack p-96"
          ref={gridRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        ></div>
        {connections.map((connection, index) => (
          <Xarrow
            key={index}
            start={connection.sourceTableId}
            end={connection.targetTableId}
          />
        ))}
      </Xwrapper>
    </div>
  );
};

export default Grid;
