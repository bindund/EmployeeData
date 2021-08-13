import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { employeesDataActions } from "../ReduxStore/employeeReducer";
import "./SkillsInput.css"
import './TextInput.css'

function SkillsInput({employeeId}) {
  const dispatch = useDispatch();
  const [list, setList] = useState([{ id: uuidv4(), value: "" }]);

  const handleAddSkill = () => {
    const newList = [...list, { id: uuidv4(), value: "" }];
    setList(newList);
    
    let skillsList = [];
    newList.forEach(skill => {
      skillsList.push(skill.value);
    });
    dispatch(
      employeesDataActions.handleSkillsChange({
        employeeId,
        Skills: skillsList,
      })
    );
  };

  const deleteSkill = id => {
    const newList = list.filter(skill => skill.id !== id);
    setList(newList);
    
    let skillsList = [];
    newList.forEach(skill => {
      skillsList.push(skill.value);
    });
    dispatch(
      employeesDataActions.handleSkillsChange({
        employeeId,
        Skills: skillsList,
      })
    );
  };

  // handle change in the skills
  const handleChange = (event, id) => {
    const newList = list.map(skill => {
      if (skill.id === id) {
        skill.value = event.target.value;
      }
      return skill;
    });
    setList(newList);

    let skillsList = [];
    newList.forEach(skill => {
      skillsList.push(skill.value)
    });
    dispatch(
      employeesDataActions.handleSkillsChange({
        employeeId,
        Skills: skillsList,
      })
    );
  };

  return (
    <>
      <label class="h1" >Skills</label>
      
      {list.map(skill => {
        return (
          <div key={skill.id}>
            <input
              class="nameInput"
              onChange={event => handleChange(event, skill.id)}
              type="text"
            />{" "}
            <br />
            
            <button
               class="btn"
              onClick={() => deleteSkill(skill.id)}
              disabled={list.length === 1}
            >
              Delete 
            </button>
            </div>
        
        );
      })}
      <button class="btn" onClick={handleAddSkill}>
        Add 
      </button>
    </>
   
  );
}

export default SkillsInput;
