import { useContext, useRef, useState } from "react";
import { Context } from "./AppContext.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import EditableStyledTableCell from "./EditableStyledTableCell.jsx";
import cloneDeep from "lodash/cloneDeep";
import Button from "./Button.jsx";
import showPDF from "../functions/openREFasPDF.js"

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

const NameTableCell = styled(StyledTableCell)`
  min-width: 300px; // Устанавливаем минимальную ширину только для этой ячейки
`;

function MaterialList() {
  const [editMode, setEditMode] = useState(false);
  const { data, updateData} = useContext(Context);
  const materialList = cloneDeep(data.material);
  const filtredMaterialList = materialList.filter((item) => item.amount > 0);
  const tableRef = useRef();

  const filtredMaterial = filtredMaterialList.map((item) => tableRow(item));
  const notFiltredMaterial = materialList.map((item) => tableRow(item));
  const showableMaterial = editMode ? notFiltredMaterial : filtredMaterial
  const currentList = editMode ? materialList : filtredMaterialList;

  

  function changeRedactingMode() {
    setEditMode((prev) => {
      const newValue = !prev;
      if (newValue == false) uppdateData();
      return !prev;
    });
  }

  function uppdateData() {
    updateData(materialList);
  }
  function updateItemAmount(name, newAmount) {
    const index = materialList.findIndex((item) => {
      return item.namn == name;
    });
    materialList[index] = {
      ...materialList[index],
      amount: newAmount,
    };
  }

  function tableRow({id , namn = "" , vikt , amount, isSummary}) {
    const artNumber = id && !isSummary ? id : "";
    const name = namn;
    const weight = vikt && !isSummary ? vikt : "";
    const totalWeight = vikt && !isSummary? Number.parseFloat(vikt * amount).toFixed(1) : ""

    return (
      <StyledTableRow key={name + id}>
        <StyledTableCell component="th" scope="row">
          {artNumber}
        </StyledTableCell>
        <NameTableCell align="left">{name}</NameTableCell>
        <StyledTableCell align="right">{weight}</StyledTableCell>
        <StyledTableCell align="right">
          {totalWeight}
        </StyledTableCell>
        {!isSummary ?<EditableStyledTableCell
          align="center"
          initialAmount={"" + amount}
          editMode={editMode}
          onChange={(newValue) => {
            updateItemAmount(namn, newValue);
          }}
        >
          {amount ? amount : 0}
        </EditableStyledTableCell>: <StyledTableCell align="center">{""}</StyledTableCell>}
      </StyledTableRow>
    );
  }
  function calculateTotalVikt(list){
    const initialValue = 0;
    const totalVikt = list.reduce(
      (accumulator, item) => accumulator + (+item.amount * +item.vikt),
      initialValue,
    );
    return Number.parseFloat(totalVikt).toFixed(1)
  }

  const SummaryRow = editMode? null :   tableRow({id:"", namn:"TOTAL VIKT: \t" + calculateTotalVikt(filtredMaterialList) + "(kg)", isSummary:true})
  

  return (
    <div style={{ maxHeight: "100%", overflowY: "auto" }}>
      <Button style={{margin:"10px 10px"}} onClick={changeRedactingMode}>
        {editMode ? "Click to save" : "Redigera listan"}
      </Button>
      {editMode ? null : 
      <Button style={{margin:"10px 10px"}} onClick={()=>showPDF(tableRef)}>
        Öppna PDF fil
      </Button>
    }
      <TableContainer ref={tableRef} sx={{ width: "100%" , margin:"20px 20px" }} component={Paper}>
        <Table size={"small"}  aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Art. nummer</StyledTableCell>
              <StyledTableCell sx={{ flexGrow: "1" }} align="left">
                Namn
              </StyledTableCell>
              <StyledTableCell align="right">Vikt&nbsp;(kg)</StyledTableCell>
              <StyledTableCell align="right">
                Total Vikt&nbsp;(kg)
              </StyledTableCell>
              <StyledTableCell align="right">Antal&nbsp;(st)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showableMaterial}
            {SummaryRow}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MaterialList;
