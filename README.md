# MUI Datagrid X Expandable Rows

This project demonstrates a logic to manipulate rows in a DataGrid using React and Material-UI's DataGrid component to implement expandable rows.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them
npm install @material-ui/data-grid

### Installing

A step by step series of examples that tell you how to get a development env running

npm install 
npm start

## Authors

* **Sai Teja** - *Initial work* - [skoly1](https://github.com/skoly1)

## Project Structure

The main file in this project is `App.tsx`. This file contains a React component that renders a data grid with expandable rows.

## How it Works

The `App` component maintains two pieces of state: `clickedIndex` and `expandedRowData`. 

`clickedIndex` is the index of the row that the user has clicked to expand or collapse. 

`expandedRowData` is the data for the row that is currently expanded.

The `columns` array defines the columns of the data grid. The `id` column has a custom `renderCell` function that renders an expand/collapse button. When this button is clicked, `clickedIndex` and `expandedRowData` are updated, which triggers a re-render of the component.

In the `useEffect` hook, if `expandedRowData` is defined, the rows of the data grid are updated to include the expanded row's data. If `expandedRowData` is `undefined`, the rows are reset to the original data.

## Dependencies
This project uses the following dependencies:

@mui/x-data-grid: for the data grid component
@mui/material: for the IconButton component
@mui/icons-material: for the KeyboardArrowUpIcon and KeyboardArrowDownIcon components
react: for creating the component
Make sure to install these dependencies in your project before using the App component.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details