import React from "react";
import { useSelector } from "react-redux";
import "../App.css"
import './View.css'

function ViewData() {
  const employeesData = useSelector(state => state.employeesData);

  return (
    <div>
    <div class="viewInput">
      {employeesData.map((employee, index) => {
        return (
          
          <div key={employee.employeeId}>
            <h4>Employee #{index + 1}</h4>
            <p>Name : {employee.Name}</p>
            <p>Designation : {employee.Designation}</p>
            <>
              <p>Contact : </p>
              {employee.Contact.map((number, index) => {
                return (
                  <li key={index}>
                    {number.type} - {number.number}
                  </li>
                );
              })}
            </>
            <>
              <p>Skills : </p>
              {employee.Skills.map((skill, index) => {
                return <li key={index}>{skill}</li>;
              })}
            </>
            <p>DOB : {employee.DateOfBirth}</p>
          </div>
        );
      })}
    </div>
    </div>
  
  );
}

export default ViewData;

