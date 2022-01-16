import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
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




export default function MyBugs() {
  const id = useParams();
  const [app, setApp] = useState([]);
  const [bugs, setBugs] = useState([]); //ce afisez.
  const [ready, setReady] = useState(false);

  const getData = () => {
    axios.get(`http://localhost:7000/app/users/${id.id}/projects`)
      .then((response) => {
        setApp(response.data);
      })

    axios.get('http://localhost:7000/app/bugs')
    .then((response) => {
      setBugs(response.data)
    })
  }


  useEffect(() => {
    getData();
}, [])

  // useEffect(() => {
  //   if (ready == false) {
  //     app.map(apl => {
  //       axios.get(`http://localhost:7000/app/projects/${apl.id_app}/bugs`)
  //         .then((response) => {
  //           bugss.push(response.data)
  //         })
  //         .catch(error => console.log(error))
  //     })
  //     setBugs(bugss);
  //   }  setReady(true)
  // }, [app])

  // useEffect(()=> {
  //   if(ready==false){
  //     console.log(bugs);
  //     setReady(true);
  //   }
  // }, [bugs])


  return (
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
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bugs.map((item => item.map(element => (
              <StyledTableRow key={element.id_bug}>
                <StyledTableCell key={`app+${element.id_app}`} component="th" scope="row">
                  {element.id_app}
                </StyledTableCell>
                <StyledTableCell key={`app+${element.id_app}`} component="th" scope="row">
                  {element.severitate}
                </StyledTableCell>
                <StyledTableCell key={`app+${element.id_app}`} component="th" scope="row">
                  {element.prioritate}
                </StyledTableCell>
                <StyledTableCell key={`app+${element.id_app}`} component="th" scope="row">
                  {element.descriere}
                </StyledTableCell>
                <StyledTableCell key={`app+${element.id_app}`} component="th" scope="row">
                  {element.commit}
                </StyledTableCell>
                <StyledTableCell key={`app+${element.id_app}`} component="th" scope="row">
                  {element.id_user}
                </StyledTableCell>
                <StyledTableCell key={`app+${element.id_app}`} component="th" scope="row">
                  {element.status}
                </StyledTableCell>
              </StyledTableRow>
            ))))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}