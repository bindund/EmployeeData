import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { employeesDataActions } from "../ReduxStore/employeeReducer";
import './NumberInput.css'
import './TextInput.css'

function NumberInput({ employeeId }) {
  const dispatch = useDispatch();

  const [list, setList] = useState([
    {
      id: uuidv4(),
      type: "Primary",
      value: "",
    },
  ]);
  const [selection, setSelection] = useState("");

  // handle adding of a contact field
  const handleAddField = () => {
    if (selection === "") {
      swal(
        "No Number Type Selected",
        "Select a type of contact number from dropdown before adding",
        "error"
      );
      return;
    }
    if (list.length < 4) {
      const newList = [
        ...list,
        {
          id: uuidv4(),
          type: selection,
          value: "",
        },
      ];
      setList(newList);

      let listOfNumbers = [];
      newList.forEach(number => {
        const numberType = number.type;
        const value = number.value;
        const obj = {};
        obj["type"] = numberType;
        obj["number"] = value;
        listOfNumbers.push(obj);
      });
      dispatch(
        employeesDataActions.handleNumberChange({
          employeeId,
          Contact: listOfNumbers,
        })
      );
    } else {
      swal("Limit Reached", "More than 4 field can not be added", "error");
    }
    setSelection("");
  };

  // handle delete field
  const handleDelteField = id => {
    const newList = list.filter(field => field.id !== id);
    setList(newList);

    let listOfNumbers = [];
    newList.forEach(number => {
      const numberType = number.type;
      const value = number.value;
      const obj = {};
      obj["type"] = numberType;
      obj["number"] = value;
      listOfNumbers.push(obj);
    });
    dispatch(
      employeesDataActions.handleNumberChange({
        employeeId,
        Contact: listOfNumbers,
      })
    );
  };

  // handle change in the numbers
  const handleChange = (event, id) => {
    const newList = list.map(number => {
      if (number.id === id) {
        number.value = event.target.value;
      }
      return number;
    });
    setList(newList);

    let listOfNumbers = [];
    newList.forEach(number => {
      const numberType = number.type;
      const value = number.value;
      const obj = {};
      obj['type'] = numberType;
      obj['number'] = value;
      listOfNumbers.push(obj);
    });
    dispatch(
      employeesDataActions.handleNumberChange({
        employeeId,
        Contact: listOfNumbers,
      })
    );
  };

  return (
    <div>
    
      <label class="h1" >Contact Details</label>
      <div class="styled-select">
      <select
        
        value={selection}
        onChange={event => setSelection(event.target.value)}
      >
        <option selected value="">Type</option>
        <option value="Secondary">Secondary</option>
        <option value="Residence">Residence</option>
        <option value="Emergency">Emergency</option>
      </select>
      <div class="select-button"><div class="small-arrow-down"></div></div>
      </div>
      <button class="btn_NumberInput" onClick={handleAddField}>
        Add  
      </button>{" "}
      <br />
      {list.map(field => {
        return (
          <div key={field.id}>
            <label class="h1" >{field.type}</label> <br />
            <input
              class="nameInput"
              onChange={event => handleChange(event, field.id)}
              type="number"
            />{" "}
            <br />
            <button
            class="btn_NumberInput"
              disabled={field.type === "Primary"}
              onClick={() => handleDelteField(field.id)}
            >
              Delete 
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default NumberInput;

