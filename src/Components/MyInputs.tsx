import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

type taskProps = {
    name: string;
    onChangeHandler: (e: any) => any;
    value?: any;
};
const MyInputs = ({name, onChangeHandler, value}: taskProps) => {
  return (
    <FormControl>
      <FormLabel>{name}</FormLabel>
      <Input type="text" name={name} onChange={onChangeHandler} value={value}/>
    </FormControl>
  );
};

export default MyInputs;
