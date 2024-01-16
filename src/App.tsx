import {
  DataGrid,
  DataGridProps,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import data from "./data.json";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const CustomGrid = styled(DataGrid)<DataGridProps>(() => ({
  // "& .MuiDataGrid-row": {
  //   minHeight: "100px !important",
  //   maxHeight: "100px !important",
  // },
  // "& .Mui-selected": {
  //   minHeight: "100px !important",
  //   maxHeight: "100px !important",
  // },
}));

// Function to create a new table
function ExpandedTable(data, columns) {
  return ReactDOM.createRoot(document.getElementById("expanded-row")!).render(
    <React.StrictMode>
      <CustomGrid
        disableVirtualization
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
      />
    </React.StrictMode>
  );
}

function createNewTable() {
  let table = document.createElement("table");
  table.innerHTML = `
      <tr>
          <th>Column 1</th>
          <th>Column 2</th>
      </tr>
      <tr>
          <td>Data 1</td>
          <td>Data 2</td>
      </tr>
  `;
  return table;
}

const NewTable = ({ data }) => {
  // Render your table using the passed data
  return (
    <table>
      <tr>
        <td>test</td>
        <td>test</td>
        <td>test</td>
        <td>test</td>
        <td>test</td>
        <td>test</td>
        <td>test</td>
      </tr>
    </table>
  );
};

function injectTableAfterSelectedRow(id: number) {
  const selectedRow = document.querySelector(`[data-id="${id}"]`);
  if (selectedRow) {
    debugger;
    // Create a container element for the portal
    const container = document.createElement("div");
    container.id = `table-container-${id}`;

    // Insert the container into the DOM
    selectedRow?.parentNode?.insertBefore(container, selectedRow.nextSibling);
    const Tab = <NewTable data={[]} />;

    // Use createPortal to render the JSX component into the container
    ReactDOM.createPortal(<>as</>, container);
  } else {
    console.log("No selected row found");
  }

  // if (selectedRow) {
  //   const newTable = createNewTable();
  //   selectedRow?.parentNode?.insertBefore(newTable, selectedRow.nextSibling);
  // } else {
  //   console.log("No selected row found");
  // }
}

export default function App() {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [expandedRowData, setExpandedRowData] = useState();
  const columns = [
    {
      field: "id",
      renderCell: (cellValues: GridRenderCellParams) => {
        return (
          <IconButton
            onClick={() => {
              console.log(cellValues);
              if (clickedIndex === cellValues.value) {
                setClickedIndex(-1);
              } else {
                setClickedIndex(cellValues.value);
                setExpandedRowData(cellValues.row);
                injectTableAfterSelectedRow(cellValues.value);
              }
            }}
          >
            {cellValues.value === clickedIndex ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        );
      },
      width: 60,
    },
    {
      field: "first_name",
      headerName: "First name",
      flex: 1,
    },
    { field: "last_name", headerName: "Last name", flex: 1 },
    { field: "ph_no", headerName: "Phone number", flex: 1 },
  ];

  return (
    <div style={{ width: "500px", marginLeft: "4rem" }}>
      <div style={{ height: 350, width: "100%" }}>
        <CustomGrid
          disableVirtualization
          rows={data}
          columns={columns}
          getRowClassName={(params) => {
            if (params.id === clickedIndex) return "expand-row";
            return "";
          }}
          // disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}

// Function to inject the table after the selected row

// Call the function to perform the action

// https://mui.com/x/react-data-grid/style/#styling-rows

// if (selectedRow) {
//   const newTable = ExpandedTable(expandedRowData, columns);
//   if (selectedRow.parentNode && ref?.current) {
//     // selectedRow.parentNode.insertBefore(newTable, selectedRow.nextSibling);
//     ref?.current?.insertAdjacentHTML("beforeend", `<div id="box></div>`);
//   }
// } else {
//   console.log("No selected row found");
// }
