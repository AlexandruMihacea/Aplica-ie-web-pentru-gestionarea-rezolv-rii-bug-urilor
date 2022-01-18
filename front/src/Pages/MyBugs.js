import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { styled } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SolveBug from './SolveBug';


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


//explicatie state uri 
// daca am un bug in aplicatie in rezolvare -> setBusy(true) -> modala incarca doar optiunea de solutionare
// daca nu am niciun bug pot sa mi asignez unul -> setBusy(false) -> put(id_user)
// daca bug ul este deja preluat de cineva -> setError(true)

export default function MyBugs() {
  const id = useParams();
  const [bugs, setBugs] = useState([]); //ce afisez
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState();
  const [click, setClick] = useState(false); //deschid modala

  const [id_user, setId] = useState();
  const [id_bug, setBug] = useState();

  const getData = () => {
    axios.get(`http://localhost:7000/app/bugs/${id.id}`)
      .then((response) => {
        setBugs(response.data);
      })
  }
  //get data
  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    getData();
  }, [click])

  const handlerClick = () => setClick(click ? false : true);

  const updateBug = (id_bug) => {
    axios.put(`http://localhost:7000/app/bugs/${id_bug}`, { id_user: id.id })
      .then((response) => {
        console.log(response.data);
      })
    setClick(true);
  }

  const validate = () => {
    bugs.forEach(b => {
      if (b.id_user == id.id) {
        setBusy(true) //nu pot decat sa solutionez bug ul meu.
      }
    })
  }

  const onClick = (id_user, id_bug, status) => {
    return (event) => {
      console.log(id_user, id_bug);
      if (id_user === null) { //ma pot adauga pt. bug-ul selectat
        validate(); //verific daca sunt liber sau nu
        console.log("validate");
        if (busy === true) {
          setError("Nu puteti detine drepturi de solutionare pe mai mult de un bug.");
        }
        else {
          updateBug(id_bug);
          setBusy(true);
          setClick(false);
        }
      } else {
        console.log(id)
        if (id_user == id.id) { //pot sa solutionez
          console.log("here");
          setClick(true);
          setBug(id_bug);
          setId(id_user);
          setError("");
        }
      }
    }
  }

  if (bugs) {
    return (
      <div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Application</StyledTableCell>
                  <StyledTableCell>Severitate</StyledTableCell>
                  <StyledTableCell>Prioritate</StyledTableCell>
                  <StyledTableCell>Descriere</StyledTableCell>
                  <StyledTableCell>Commit</StyledTableCell>
                  <StyledTableCell>Responsabil</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bugs.map((element) => (
                  <StyledTableRow key={element.id_bug}>
                    <StyledTableCell key={`name+${element.id_bug}`} component="th" scope="row">
                      {element.name}
                    </StyledTableCell>
                    <StyledTableCell key={`sev+${element.id_bug}`} component="th" scope="row">
                      {element.severitate}
                    </StyledTableCell>
                    <StyledTableCell key={`pr+${element.id_bug}`} component="th" scope="row">
                      {element.prioritate}
                    </StyledTableCell>
                    <StyledTableCell key={`desc+${element.id_bug}`} component="th" scope="row">
                      {element.descriere}
                    </StyledTableCell>
                    <StyledTableCell key={`commit+${element.id_bug}`} component="th" scope="row">
                      {element.link}
                    </StyledTableCell>
                    <StyledTableCell key={`${element.id_bug}`} component="th" scope="row">
                      {element.id_user}
                    </StyledTableCell>
                    <StyledTableCell key={`status+${element.id_bug}`} component="th" scope="row">
                      {element.status}
                    </StyledTableCell>
                    <StyledTableCell key={`action+${element.id_bug}`} component="th" scope="row" onClick={onClick(element.id_user, element.id_bug, element.status)} >
                      {(element.status === "Solutionat") ? null : (id.id == element.id_user) ? <AssignmentTurnedInIcon /> : (element.status==="In solutionare") ? null : <PersonAddIcon />}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div><SolveBug
          closeModal={handlerClick}
          click={click}
          id_user={id_user}
          id_bug={id_bug} />
        </div>
        <div>{error}</div>
      </div>
    )
  }
  else {
    return (
      <div><h2>No bugs reported yet.</h2></div>
    )
  }
}
