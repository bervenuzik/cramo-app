import { useContext, useState } from "react";
import { Context } from "./AppContext.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { FormControlLabel, Switch } from "@mui/material";
import Input from "./Input.jsx";
import EditableStyledTableRow from "./EditableStyledTableRow.jsx";

function MaterialList() {
  const [editMode, setEditMode] = useState(false);
  const { data, addToHistory, history } = useContext(Context);
  const materialList = data.material;
  const filtredMaterialList = materialList.filter((item) => item.amount > 0);

  function changeRedactingMode() {
    setEditMode((prev) => {
      return !prev;
    });
  }

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function tableRow(item) {
    return (
      <StyledTableRow key={item.namn + item.id}>
        <StyledTableCell component="th" scope="row">
          {item.id}
        </StyledTableCell>
        <StyledTableCell  align="right">{item.namn}</StyledTableCell>
        <StyledTableCell align="right">{item.vikt}</StyledTableCell>
        <StyledTableCell align="right">
          { Number.parseFloat(item.vikt * item.amount).toFixed(1)}
        </StyledTableCell>
        <EditableStyledTableRow
        initialAmount={item.amount}
        editMode={editMode}>{item.amount}</EditableStyledTableRow>
      </StyledTableRow>
    );
  }
  const filtredMaterial = filtredMaterialList.map((item) => tableRow(item));
  const notFiltredMaterial = materialList.map((item) => tableRow(item));

  return (
    <div style={{maxHeight: '100%', overflowY: 'auto' }}>
      <FormControlLabel
        control={
          <Switch
            className="self-start"
            onChange={changeRedactingMode}
            checked={editMode}
          />
        }
        label="Radigera listan"
      />
      <TableContainer sx={{ width:"100%" }}component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Art. nummer</StyledTableCell>
              <StyledTableCell sx={{flexGrow:"1"}} align="right">Namn</StyledTableCell>
              <StyledTableCell align="right">Vikt&nbsp;(kg)</StyledTableCell>
              <StyledTableCell align="right">
                Total Vikt&nbsp;(kg)
              </StyledTableCell>
              <StyledTableCell align="right">Antal&nbsp;(st)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editMode ? notFiltredMaterial : filtredMaterial}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MaterialList;
