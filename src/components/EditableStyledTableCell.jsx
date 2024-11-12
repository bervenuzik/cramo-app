import { styled, TableCell, tableCellClasses } from "@mui/material";
import amountValidator from "../functions/validations/amountValidator";
import Input from "./Input";
import useInput from "../hooks/useInput";
const AMOUNT_VALIDATION_MESSAGE = "Antal ska vara en hel tal";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledInput = styled(Input)`
  max-width: 53px;
  border: 0.5px solid black;
  border-radius:3px;
  background-color:inherit;
  padding: 0 3px 0 3px;
  text-align:left;
  &::after {
    content: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

function EditableStyledTableCell({ initialAmount, onChange, children, editMode  , ...props}) {
  const [amount, onAmountChange] = useInput(
    initialAmount,
    amountValidator,
    AMOUNT_VALIDATION_MESSAGE
  );

    function handleChange(value){
      if(value.length == 0) {
        onAmountChange(0);
        onChange(0)
        return
      }

      if(!amountValidator(value)) return
      const numericValue = Number.parseInt(value , 10)
        onAmountChange(numericValue);
        onChange(numericValue)
  }


  return (
    <>
      <StyledTableCell {...props}>
        {editMode ? (
          <StyledInput
            alt={AMOUNT_VALIDATION_MESSAGE}
            onChange={handleChange}
            min="0"
            step="1"
            type="number"
            value={amount.value}
            style={{
                width:"fit-content",
            }}
          />
        ) : (
          <div style={{
            width: "53px",
          }}>{children}</div>
        )}
      </StyledTableCell>
    </>
  );
}

export default EditableStyledTableCell;
