import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({ isChecked, onChange, label, value }) => {
  const [check, setCheck] = useState(isChecked);
  const handleChange = () => {
    setCheck(!check);
    onChange && onChange(value, !check, label);
  };
  return (
    <S.CheckBox>
      <FormControlLabel
        control={<Checkbox checked={check} onChange={handleChange} color="primary" />}
        label={label}
      />
    </S.CheckBox>
  );
};

export default CheckBox;
