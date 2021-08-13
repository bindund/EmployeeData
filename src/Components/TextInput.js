import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import { employeesDataActions } from "../ReduxStore/employeeReducer";
import './TextInput.css'

function TextInput({ label, employeeId }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
    dispatch(employeesDataActions.handleNameAndDesignationChange({ employeeId, value: event.target.value, changeIn: label }));
  };

  return (
    <div >
      
      <label class="h1">{label}</label> <br />
      <input
        class="nameInput"
        value={name}
        onChange={event => handleChange(event)}
        type="text"
      />
    </div>

  );
}

export default TextInput;