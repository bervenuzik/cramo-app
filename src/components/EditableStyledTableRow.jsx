import { styled, TableCell, tableCellClasses } from "@mui/material";
import amountValidator from "../functions/validations/amountValidator";
import Input from "./Input";
import useInput from "../hooks/useInput";
const AMOUNT_VALIDATION_MESSAGE = "Antal ska vara en hel tal";
function EditableStyledTableRow({ initialAmount, children, editMode }) {
  const [amount, onAmountChange, resetAmount] = useInput(
    initialAmount,
    amountValidator,
    AMOUNT_VALIDATION_MESSAGE
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <>
      <StyledTableCell align="right">
        {editMode ? (
          <Input
            error={amount.showError}
            alt={AMOUNT_VALIDATION_MESSAGE}
            onChange={(ev) => onAmountChange(ev.target.value)}
            min="0"
            step="1"
            type="number"
            value={amount.value}
            style={{maxWidth:"50px"}}
          />
        ) : (
          children
        )}
      </StyledTableCell>
    </>
  );
}

export default EditableStyledTableRow;
