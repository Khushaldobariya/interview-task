import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../store/dialog/dialogSlice";
import CreateDialog from "./CreateDialog";
import { getEmployee } from "../store/Employee/EmployeeSlice";
import FilterDialog from "./FilterDialog";
import dayjs from "dayjs";

const Home = () => {
  const [data, setData] = useState([]);
  const emp = useSelector((state) => state.employee.employee);
  const [type, setType] = useState("create");



  const dispatch = useDispatch();

  useEffect(() => {
   
    dispatch(getEmployee());
  }, []);

  useEffect(() => {
    setData(emp);
  }, [emp]);

  const handelClickOpen = (data) => {
    setType(data)
    dispatch(openDialog());
  };
  const handelClickEdit = (data) => {
    dispatch(openDialog(data));
  };

  const handelDelete = (id) => {
    dispatch(getEmployee(id));
  };

  return (
    <>
      <div className="p-4">
        <div className="card border-0  my-4 border rounded">
          <div className="card-body box-shadow">
            <div className="card-title">
              <div className="d-flex align-itmes-center  justify-content-between px-4 py-2">
                <div className="fw-bold ">Employee Id</div>
                <div>
                  <button
                    type="button"
                    className="btn btn-info me-2 text-white"
                    onClick={() => {
                      handelClickOpen("filter");
                    }}
                  >
                    filter
                  </button>
                  <button
                    type="button"
                    className="btn btn-info text-white"
                    onClick={() => {
                      handelClickOpen("create");
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>

            <table className="table table-striped ">
              <thead className="text-center">
                <tr>
                  <th>Emp Id</th>
                  <th>Emp Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Address</th>
                  <th>Edit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data?.map((emp, index) => (
                  <tr key={index}>
                    <td>{emp.id}</td>
                    <td>{emp.empName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{ dayjs(emp.DOB).format("DD/MM/YYYY")}</td>
                    <td>{emp.adderss}</td>
                    <td>
                      <button
                        className="btn btn-info text-white"
                        type="button"
                        onClick={() => handelClickEdit(emp)}
                      >
                        <i className="fa-solid fa-pencil " /> Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger text-white"
                        type="button"
                        onClick={() => handelDelete(emp.id)}
                      >
                        <i className="fa-solid fa-trash-can " /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {
        type === "create"?
        <CreateDialog />:<FilterDialog />
      }
    </>
  );
};

export default Home;
