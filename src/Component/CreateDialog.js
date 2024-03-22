import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { closeDialog } from "../store/dialog/dialogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { createEmployee } from "../store/Employee/EmployeeSlice";

const validationSchema = Yup.object().shape({
  empName: Yup.string().required("Name is required"),
  email: Yup.string().required("email is required"),
  phone: Yup.string().required("phone is required"),
  adderss: Yup.string().required("adderss is required"),
  DOB: Yup.string().required("DOB is required"),
});

const CreateDialog = ({ initialValues, onSubmit }) => {
  const { isOpen, data } = useSelector((state) => state.dialog);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  console.log("fullScreen", fullScreen);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setName(data?.empName);
      setemail(data?.email);
    } else {
      setName("");
      setemail("");
    }
  }, [data]);

  const handleClose = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth={"lg"}
      fullWidth
    >
      <DialogTitle> Add Emplyolee</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            empName: data && data.empName ? data.empName : "",
            email: data && data.email ? data.email : "",
            phone: data && data.phone ? data.phone : "",
            DOB: data && data.DOB ?data.DOB : "",
            adderss: data && data.adderss ? data.adderss : "",
          
          }}
          onSubmit={(values, actions) => {  
            console.log("values", values);
            dispatch(createEmployee(values));

            handleClose();
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <label className="form-label" htmlFor="Name">
                  Employee Name
                </label>
                <div className="row d-flex align-items-center">
                  <div className="col-6">
                    <Field
                      type="text"
                      id="name"
                      name="empName"
                      className="form-control"
                      placeholder="Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <ErrorMessage
                      name="empName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="email">
                  email
                </label>
                <div className="row d-flex align-items-center">
                  <div className="col-6">
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="email"
                    />
                  </div>
                  <div className="col-6">
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="phone">
                  phone
                </label>

                <div className="row d-flex align-items-center">
                  <div className="col-6">
                    <Field
                      min="0"
                      type="number"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="Enter Employee Phone.."
                    />
                  </div>
                  <div className="col-6">
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="phone">
                  DOB
                </label>

                <div className="row d-flex align-items-center">
                  <div className="col-6">
                    <Field
                      type="date"
                      id="DOB"
                      name="DOB"
                      className="form-control"
                      placeholder="Enter Employee DOB.."
                    />
                  </div>
                  <div className="col-6">
                    <ErrorMessage
                      name="DOB"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="phone">
                  address
                </label>

                <div className="row d-flex align-items-center">
                  <div className="col-6">
                    <Field
                      type="text"
                      id="adderss"
                      name="adderss"
                      className="form-control"
                      placeholder="Enter Employee Address.."
                    />
                  </div>
                  <div className="col-6">
                    <ErrorMessage
                      name="adderss"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex my-2 justify-content-end">
                <button
                  className="btn btn-danger mx-2"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
