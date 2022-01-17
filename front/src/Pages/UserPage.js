import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BugReportIcon from '@mui/icons-material/BugReport';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
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

//const id = 3;


export default function UserPage() {
  const [app, setApp] = useState([])  //my apps
  const [message, setMessage] = useState();
  let { id } = useParams();
  const id_admin = (id.split(":"))[1];
  const navigate = useNavigate();

  const getProj = () => {
    axios.get(`http://localhost:7000/app/users/${id_admin}/projects`)
      .then((response) => {
        setApp(response.data)
      })
      .catch((response) => {
        setMessage("User has no projects :(")
        console.log(response)
      })
  }

  //mereu incarca proiectele daca exista
  useEffect(() => {
    getProj();
  }, [])

  const redirectAddProj = () => {
    navigate(`/addProject/${id_admin}`)
  }
  const redirectBugList = () => {
    navigate(`/myBugs/${id_admin}`)
  }

  if (app.length) {
    return (
      <div>
        <AddCircleIcon onClick={redirectAddProj} />
        <BugReportIcon onClick={redirectBugList} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>My applications</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
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
        <AddCircleIcon onClick={redirectAddProj} />
        <BugReportIcon onClick={redirectBugList} />
        <h1>{message} </h1>
      </div>
    )
  }
}