import { createSlice } from "@reduxjs/toolkit";

let EmployeesArray = [
  {
    id: 12345,
    empName: "John anderdon",

    email: "johnAnderdon@gmail.com",
    phone: "1234567890",
    DOB: "2023-09-04",
    adderss: "132, My Street,Bigtown BG23",
  },
  {
    id: 12346,
    empName: "David daycon",
    email: "davidDaycon@gmail.com",
    phone: "1234567890",
    DOB: "2023-11-10",
    adderss: "132, My Street,Kingston, New.",
  },
  {
    id: 12347,
    empName: "Samuel mooley",
    email: "samuelMooley@gmail.com",
    phone: "1234567890",
    DOB: "2023-08-04",
    adderss: "8, My Street,Ilassan Lekki,",
  },
  {
    id: 12348,
    empName: "Rico ponald",
    email: "ricoPonald@gmail.com",
    phone: "1234567890",
    DOB: "2023-09-05",
    adderss: "132, My Street,Bigtown.",
  },
  {
    id: 12349,
    empName: "Sracy bearney",
    email: "SracyBearney@gmail.com",
    phone: "1234567890",
    DOB: "2023-09-06",
    adderss: "8, My Street,Ilassan Lekki",
  },
];
const initialState = {
  employee: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployee: (state) => {
      state.employee = EmployeesArray;
    },
    createEmployee: (state, action) => {
      console.log("action", action.payload.adderss);
      const newEmployee = {
        ...action.payload,
        id: state.employee[state.employee.length - 1].id + 1,
      };
      state.employee.push(newEmployee);
    },
    filterEmploye: (state, action) => {
      const fromDate = new Date(action.payload.fromDate);
      const toDate = new Date(action.payload.toDate);
      
      const filteredData = EmployeesArray.filter((item) => {
        const searchValue = action.payload.searchValue.toString().toLowerCase();
        const empDOB = new Date(item.DOB);
      
        console.log('item.DOB', item.DOB); // 2023-09-06
        console.log('action.payload.toDate', action.payload.toDate); // 2023-09-01 
        console.log('action.payload.fromDate', action.payload.fromDate); // 2023-09-20
        
        var currentDate = new Date(item.DOB);
        var to = new Date(action.payload.toDate);
        var from = new Date(action.payload.fromDate);
        
        console.log('currentDate:', currentDate);
        console.log('to:', to);
        console.log('from:', from);
        
        if (currentDate >= to && currentDate <= from) {
            console.log("true");
        } else {
            console.log("false");
        }

        return (
          (empDOB >= fromDate && empDOB <= toDate) ||
          item.empName.toLowerCase().includes(searchValue) ||
          item.email.toLowerCase().includes(searchValue) ||
          item.phone.toString().includes(searchValue) ||
          item.DOB.includes(searchValue) ||
          item.adderss.toLowerCase().includes(searchValue)
        );
      });
      


      console.log("filterData", filteredData);
      state.employee = filteredData;
    },
  },
});

export const { getEmployee, createEmployee, filterEmploye } =
  employeeSlice.actions;

export default employeeSlice.reducer;
