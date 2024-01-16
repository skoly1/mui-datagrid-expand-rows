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
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const CustomGrid = styled(DataGrid)<DataGridProps>(() => ({
  // "& .MuiDataGrid-row": {
  //   minHeight: "100px !important",
  //   maxHeight: "100px !important",
  // },
  "& .MuiDataGrid-virtualScrollerContent": {
    // height: "auto !important",
  },
}));

function injectTableAfterSelectedRow(id: number) {
  const selectedRow = document.querySelector(`[data-id="${id}"]`);
  if (selectedRow) {
    // Create a container element for the portal
    const container = document.createElement("div");
    container.id = `table-container-${id}`;

    // Insert the container into the DOM
    selectedRow?.parentNode?.insertBefore(container, selectedRow.nextSibling);
  } else {
    console.log("No selected row found");
  }
}

export default function App() {
  const [clickedIndex, setClickedIndex] = useState(-1);
  // eslint-disable-next-line
  const [expandedRowData, setExpandedRowData] = useState<any>({});
  const columns = [
    {
      field: "id",
      renderCell: (cellValues: GridRenderCellParams) => {
        return (
          <IconButton
            onClick={() => {
              console.log(cellValues);
              if (clickedIndex) {
                const domNode = document.getElementById(
                  `table-container-${clickedIndex}`
                );
                if (domNode && domNode.parentNode) {
                  domNode.parentNode.removeChild(domNode);
                }
              }
              if (clickedIndex === cellValues.value) {
                setExpandedRowData({});
                setClickedIndex(-1);
                const domNode = document.getElementById(
                  `table-container-${cellValues.value}`
                );
                if (domNode && domNode.parentNode) {
                  domNode.parentNode.removeChild(domNode);
                }
              } else {
                setClickedIndex(cellValues.value);
                injectTableAfterSelectedRow(cellValues.value);
                setExpandedRowData(cellValues.row);
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
  useEffect(() => {
    const subcolumns = [
      {
        field: "id",
        renderCell: () => {
          return null;
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

    if (expandedRowData.family) {
      const table = (
        <div style={{ width: "496px" }}>
          <div style={{ width: "100%" }}>
            <CustomGrid
              sx={{
                "& .MuiDataGrid-root": {
                  borderWidth: "0px !important",
                },
              }}
              rows={expandedRowData?.family}
              columns={subcolumns}
              slots={{
                columnHeaders: () => null,
              }}
              hideFooter
            />{" "}
          </div>
        </div>
      );

      const domNode = document.getElementById(
        `table-container-${expandedRowData.id}`
      );
      if (domNode) {
        const root = createRoot(domNode);
        root.render(table);
      }
    }
  }, [expandedRowData]);

  return (
    <div style={{ width: "500px", marginLeft: "4rem" }}>
      <div style={{ height: "auto", width: "100%" }}>
        <CustomGrid
          disableVirtualization
          rows={data}
          columns={columns}
          getRowClassName={(params) => {
            if (params.id === clickedIndex) return "expand-row";
            return "";
          }}
          disableRowSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
}
