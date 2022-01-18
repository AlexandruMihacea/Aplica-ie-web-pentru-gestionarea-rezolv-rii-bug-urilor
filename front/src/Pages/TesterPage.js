import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormBug from './FormBug';

const columns = [
  { id: 'name', label: 'Aplication Name', minWidth: 170},
  { id: 'id', label: 'Aplication Id', minWidth: 110 },
];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

const rows = [
];

export default function ColumnGroupingTable() {


    const url = 'http://localhost:7000/app/projects';
  let show=false;
  //my apps
  const [app, setApp] = useState([])
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  


  useEffect(() => {
    //axios.get(url)
    fetch(url)
      .then(res => res.json())
      .then(setApp)
      .catch(console.error);
  }, []);





  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if(app){
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 700 }} >
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow >
              <TableCell align="center" colSpan={3}  style={{backgroundColor: ' #171820'}}>
              Aplications
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{backgroundColor: '#bcb6ae'}} >
            {app
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} onClick={handleClick}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[100, 150, 200]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

                <FormBug 
                  handleonClose={handleClose}
                  status = {open}
                />  
    </Paper>
  );
}else {
    <h1>No data found.</h1>
  }
}
