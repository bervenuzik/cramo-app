import { useContext, useState } from "react";
import { Context } from "./AppContext.jsx";
import Input from "./Input.jsx";
import Radio from "./Radio.jsx";
import Button from "./Button.jsx";
import Select from "./Select.jsx";
import Switch from "@mui/material/Switch";
import useInput from "../hooks/useInput.js";
import heightValidator from "../functions/validations/heightValidationForNew.js";
import widthValidator from "../functions/validations/widthValidationForNew.js";
import lengthValidatior from "../functions/validations/lengthValidatorForNew.js";
import lengthOptions from "../data/lengthOptions.js";
import widthOptions from "../data/widthOptions.js";
import { FormControlLabel } from "@mui/material";


const WIDTH_ERROR_MESSAGE = "Width should be min 0.73 max 3.8m";
const HEIGTH_ERROR_MESSAGE = "Heigth should be min 0.73 max 3.8m";
const LENGTH_ERROR_MESSAGE = "Length should be min 0.73 max 3.8m";

function InputForDimensions() {
  const [singleMode, setSingleMode] = useState(false);
  const [width, onWidthChange, resetWidth] = useInput(
    widthOptions[0],
    widthValidator,
    WIDTH_ERROR_MESSAGE
  );
  const [heigth, onHeigthChange, resetHeigth] = useInput(
    "",
    heightValidator,
    HEIGTH_ERROR_MESSAGE
  );
  const [length, onLengthChange, resetLength] = useInput(
    lengthOptions[0],
    lengthValidatior,
    LENGTH_ERROR_MESSAGE
  );
  const context = useContext(Context);
  const { makeCalculationForNew, makeCalculationForExisting , resetData } = context;

  const handleChange = (event) => {
    setSingleMode(event.target.checked);
    resetAll();
  };

  function resetAll() {
    resetWidth();
    resetHeigth();
    resetLength();
    resetData();
  }
  function makeCalculation() {
    const isHeigthValid = heightValidator(heigth.value);
    const isWidthValid = widthValidator(width.value);
    const isLengthValid = lengthValidatior(length.value);
    if (singleMode) {
      if (isHeigthValid && isLengthValid)
        makeCalculationForExisting(heigth.value, length.value);
    } else {
      if (isHeigthValid && isWidthValid && isLengthValid)
        makeCalculationForNew(heigth.value, width.value, length.value);
    }
  }
 
  return (
    <div className="flex flex-col items-center w-full">
      <FormControlLabel
        control={
          <Switch
            className="self-start"
            onChange={handleChange}
            checked={singleMode}
          />
        }
        label="För befintlig ställning"
      />
      <div className="flex justify-evenly gap-3">
        <Input
        onChange={onHeigthChange}
        label="Höjden(m)"
        min="2"
        type="number"
        value={heigth.value}
        style={{
          width: "70px",
        }}
      />
        
          {singleMode?  null : <Select
      onChange={onWidthChange}
      lable="Breden"
      options={widthOptions}
      id="width selector"
      value={width.value}
    /> }
        </div>
      

      <Radio
        onChange={onLengthChange}
        label="lengden"
        options={lengthOptions}
        value={length.value}
      />
      <div className="w-full flex justify-evenly">
        <Button onClick={makeCalculation}>Kalkulera</Button>
        <Button onClick={resetAll}>Återställa</Button>
      </div>
    </div>
  );
}

export default InputForDimensions;
