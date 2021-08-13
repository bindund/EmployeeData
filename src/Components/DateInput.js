import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { employeesDataActions } from "../ReduxStore/employeeReducer";
import './TextInput.css'

function DateInput({ label, employeeId }) {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");

  const handleChange = event => {
    setDate(event.target.value);
    dispatch(
      employeesDataActions.handleDateChange({
        employeeId,
        DateOfBirth: event.target.value,
      })
    );
  };

  return (
    <div>
      <label class="h1">{label}</label> <br />
      <input 
      class="nameInput"
        value={date}
        onChange={event => handleChange(event)}
        type="date"
      />{" "}
      <br />
    </div>
  );
}

export default DateInput;
