import {
  DataGrid,
  GridRenderCellParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import data from "./data.json";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";

export default function App() {
  const [clickedIndex, setClickedIndex] = useState(-1);
  // eslint-disable-next-line
  const [expandedRowData, setExpandedRowData] = useState<any>();
  // eslint-disable-next-line
  const columns = [
    {
      field: "id",
      renderCell: (cellValues: GridRenderCellParams) => {
        console.log(cellValues);
        return (
          <>
            {!cellValues?.row.subRow ? (
              <IconButton
                onClick={() => {
                  if (clickedIndex === cellValues.value) {
                    setExpandedRowData(undefined);
                    setClickedIndex(-1);
                  } else {
                    setClickedIndex(cellValues.value);
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
            ) : null}
          </>
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

  const apiRef = useGridApiRef();

  useEffect(() => {
    if (expandedRowData) {
      const newRows = expandedRowData
        ? [
            ...data.slice(0, Number(expandedRowData.id)),
            ...expandedRowData.family,
            ...data.slice(Number(expandedRowData.id)),
          ]
        : [];

      apiRef.current.setRows(newRows);
    } else {
      apiRef.current.setRows(data);
    }
  }, [apiRef, expandedRowData]);

  return (
    <div style={{ height: "600px", width: "600px", marginLeft: "4rem" }}>
      <DataGrid rows={data} columns={columns} autoHeight apiRef={apiRef} />
    </div>
  );
}
