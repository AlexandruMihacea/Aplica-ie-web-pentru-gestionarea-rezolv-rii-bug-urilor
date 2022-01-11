//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import ModalForm from './ReportBug';
import * as React from 'react';
import '../Styles/styleReportBug.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//open modal from here with the value of the idProj


function CustomizedTables() {
  const url = 'http://localhost:7000/app/projects';
  let show=false;
  //my apps
  const [app, setApp] = useState([])
  useEffect(() => {
    //axios.get(url)
    fetch(url)
      .then(res => res.json())
      .then(setApp)
      .catch(console.error);
  }, []);

  const openModal = (id) => {
    return (ev) => {
    console.log(id)
    }
  }

  if (app) {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Applications</StyledTableCell>
                {/* <StyledTableCell align="right">BugsAlert</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {app.map((app) => (
                <StyledTableRow key={app.id}>
                  <StyledTableCell component="th" scope="row"  onClick={openModal(app.id)}>
                    {app.name}
                  </StyledTableCell>
                  {/* <Button variant="contained" >Bug</Button> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {show ? <ModalForm/> : null}
      </div>
    );
  } else {
    <h1>No data found.</h1>
  }
}
export default CustomizedTables
