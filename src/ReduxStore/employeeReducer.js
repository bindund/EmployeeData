
import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"


const initialEmployeesDataState = {
  employeesData: [
    {
      employeeId: uuidv4(),
      Name: "",
      Designation: "",
      Contact: [],
      Skills: [],
      DateOfBirth: "",
    },
  ],
  transformedData: [],
  formHasError: false,
};


const employeeReducer = createSlice({
  name: "employeesData",
  initialState: initialEmployeesDataState,
  reducers: {
    
    addEmployee(state, action) {
      state.employeesData.push({
        employeeId: uuidv4(),
        Name: "",
        Designation: "",
        Contact: [],
        Skills: [],
        DateOfBirth: "",
      });
    },
    
    deleteEmployee(state, action) {
      state.employeesData = state.employeesData.filter(
        employee => employee.employeeId !== action.payload.id
      );
    },
    
    handleNameAndDesignationChange(state, action) {
      state.employeesData = state.employeesData.map(employee => {
        if (employee.employeeId === action.payload.employeeId) {
          if (action.payload.changeIn === "Name") {
            employee.Name = action.payload.value;
          } else {
            employee.Designation = action.payload.value;
          }
        }
        return employee;
      });
    },
    // handle change in name and designation
    handleDateChange(state, action) {
      state.employeesData = state.employeesData.map(employee => {
        if (employee.employeeId === action.payload.employeeId) {
          employee.DateOfBirth = action.payload.DateOfBirth;
        }
        return employee;
      });
    },
    
    handleNumberChange(state, action) {
      state.employeesData = state.employeesData.map(employee => {
        if (employee.employeeId === action.payload.employeeId) {
          employee.Contact = [...action.payload.Contact];
        }
        return employee;
      });
    },
    
    handleSkillsChange(state, action) {
      state.employeesData = state.employeesData.map(employee => {
        if (employee.employeeId === action.payload.employeeId) {
          employee.Skills = [...action.payload.Skills];
        }
        return employee;
      });
    },
  },
});


export const employeesDataActions = employeeReducer.actions;


export default employeeReducer;
