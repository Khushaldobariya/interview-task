import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { closeDialog } from "../store/dialog/dialogSlice";
import { filterEmploye, getEmployee } from "../store/Employee/EmployeeSlice";

const validationSchema = Yup.object().shape({
  toDate: Yup.string().required("toDate is required"),
  fromDate: Yup.string().required("fromDate is required"),
});

const FilterDialog = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { isOpen, data } = useSelector((state) => state.dialog);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [serachValue, setSerachValue] = useState("");

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeDialog());
    dispatch(getEmployee())
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Employee Filter</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Formik
      initialValues={{
        toDate: '',
        fromDate: '',
        searchValue: ''
      }}
      onSubmit={(values, actions) => {
        dispatch(filterEmploye(values));
        handleClose();
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form onSubmit={handleSubmit}>
  
          <div>
            <label className="form-label" htmlFor="toDate">
              To Date
            </label>
            <div className="input-group">
              <Field
                id="toDate"
                type="date"
                name="toDate"
                className="form-control"
              />
            </div>
            <ErrorMessage
              name="toDate"
              component="div"
              className="text-danger"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="fromDate">
              From Date
            </label>
            <div className="input-group">
              <Field
                id="fromDate"
                name="fromDate"
                type="date"
                className="form-control"
                min={toDate}
              />
            </div>
            <ErrorMessage
              name="fromDate"
              component="div"
              className="text-danger"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="searchValue">
              Search
            </label>
            <div className="input-group">
              <Field
                type="text"
                name="searchValue"
                className="form-control"
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fa fa-search" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex my-2 justify-content-center my-2">
            <button
              className="btn btn-gray mx-2"
              type="button"
              onClick={handleClose}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-info">
              Apply
            </button>
          </div>
        </Form>
      )}
    </Formik>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterDialog;
