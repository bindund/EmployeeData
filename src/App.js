/* eslint-disable no-loop-func */
import React , { useState } from "react";
import fileDownload from "js-file-download";
import EmployeeForm from "./Components/EmployeeForm";
import { useSelector, useDispatch } from "react-redux";
import { employeesDataActions } from "../src/ReduxStore/employeeReducer";
import ViewData from "./Components/ViewData";
import swal from "sweetalert";
import Navbar from "./Components/Navbar";
import  './App.css'
import "../src/Components/EmployeeForm.css"

function App() {
  const [isViewing, setIsViewing] = useState(false)

  const dispatch = useDispatch();
  const employeesData = useSelector(state => state.employeesData);

  // add a new employee form
  const addEmployee = () => {
    dispatch(employeesDataActions.addEmployee());
  };

  // delete an employee form
  const deleteEmployee = id => {
    dispatch(employeesDataActions.deleteEmployee({ id }));
  };

  // function to validate form
  const validateForm = () => {
    let error = true;
    for (const employee of employeesData) {
      if (
        employee.Name !== "" &&
        employee.Name.trim().length !== 0 &&
        employee.Designation !== "" &&
        employee.Designation.trim().length !== 0 &&
        employee.DateOfBirth !== ""
      ) {
        error = false;
      } else {
        error = true;
        return error;
      }

      if (employee.Contact.length !== 0) {
        error = false;
      } else {
        error = true;
        return error;
      }

      employee.Contact.forEach(field => {
        if (field.number.trim().length !== 0 && field.number !== "") {
          error = false;
        } else {
          error = true;
          return error;
        }
      });

      employee.Skills.forEach(skill => {
        if (skill.trim().length !== 0 && skill !== "") {
          error = false;
        } else {
          error = true;
          return error;
        }
      });
    }
    return error;
  };

  // handle click on view button
  const handleView = () => {
    const error = validateForm();
    if (error) {
      swal(
        "Empty input fields!",
        "One or more fields are empty or invalid! Please fill in all the inputs to view the employees data",
        "error"
      );
    } else {
      setIsViewing(!isViewing);
    }
  };

  // handle download
  const handleDownload = () => {
    const error = validateForm();

    if (error) {
      swal(
        "Empty input fields!",
        "One or more fields are empty or invalid! Please fill in all the inputs to download the data",
        "error"
      );
    } else {
      fileDownload(JSON.stringify(employeesData), "EmployeesData.txt");
    }
  };

  return (
    <div >
      <Navbar></Navbar>
      <div class="employee-wrapper">
      <main>
     
        <div  className="block1">
          <div class="form">
            <h4 style={{marginRight:'20px' ,marginTop:'5px' ,fontSize:'30px'}}>Add EmployeesData</h4>
            {employeesData.map(employee => {
              return (
                <div  key={employee.employeeId}>
                  <EmployeeForm
                    employeeId={employee.employeeId}
                    key={employee.employeeId}
                  ></EmployeeForm>{" "}
                  <br />
                  <button
                    class="btn"
                    onClick={() => deleteEmployee(employee.employeeId)}
                  >
                    Delete Details
                  </button>
                </div>
              );
            })}
            <button
              class="block2 btn_AppInput_details"
              onClick={addEmployee}
            >
              Add Details
            </button>

            <button
            class="block2 btn_AppInput_details"
              type="button"
              onClick={() => handleView()}
            >
              {isViewing ? "Hide Data" : "View Data"}
            </button>
          </div>
        </div>
        <div >
          <div className="block2">
      
            <h3 style={{fontFamily:'sans-serif' ,fontSize:'30px'}}>
            View Data
              </h3>
            
            
            {isViewing && (
              <>
                <ViewData></ViewData>
                <button  class="block2 btn_AppInput_details"  type="button" onClick={handleDownload}>
                  Download
                </button>
              </>
            )}
          </div>
          
        </div>
        
        
      </main>
      </div>
    </div>
  );
}

export default App;
