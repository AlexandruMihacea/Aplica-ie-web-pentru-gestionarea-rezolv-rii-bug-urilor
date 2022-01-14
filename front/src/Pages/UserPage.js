import React, { useState, useEffect } from 'react';
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//TODO: verifica ce se intampla cu id1
const id = 3;
const url = `http://localhost:7000/app/users/${id}/projects`;

export default function UserPage() {
  //my apps
  const [app, setApp] = useState([])
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setApp)
      .catch(console.error)
  }, [])

  if (!app.message) {
    return (
      <div>
        <a href="/addProject">Plus</a>
        <a href="/myBugs">BugList</a>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>My applications</StyledTableCell>
                <StyledTableCell align="right">Role</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {app.map((item, key) => (
                <StyledTableRow key={key}>
                  <StyledTableCell key={`app+${item.id_app}`} component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell key={`role+${item.id_app}`} component="th" scope="row">
                    {item.role}
                  </StyledTableCell>
                  {/* TODO Aici face PostBug */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return (
      <div>
        <a href="/addProject">Plus</a>
        <a href="/myBugs">BugList</a>
        <h1>{app.message} :(</h1>
      </div>
    )
  }
}