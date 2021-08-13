import React from "react";
import DateInput from "./DateInput";
import NumberInput from "./NumberInput";
import SkillsInput from "./SkillsInput";
import TextInput from "./TextInput";


function EmployeeForm({employeeId}) {
  return (
    <div >
      <TextInput employeeId={employeeId} label={"Name"}></TextInput>
      <TextInput employeeId={employeeId} label={"Designation"}></TextInput>
      <NumberInput employeeId={employeeId}></NumberInput>
      <SkillsInput employeeId={employeeId}></SkillsInput>
      <DateInput label='Date Of Birth' employeeId={employeeId}></DateInput>
    </div>
  );
}

export default EmployeeForm;
