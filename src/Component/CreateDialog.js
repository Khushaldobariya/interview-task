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
import { createProduct, editProduct } from "../store/Products/ProductSlice";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  // vendorName: Yup.string().required("Vendor Name is required"),
});

const CreateDialog = ({ initialValues, onSubmit }) => {
  const { isOpen, data } = useSelector((state) => state.dialog);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [vendor, setVendor] = useState([
    { name: "", is_main: false, variants: [{ name: "", number: 0 }] },
  ]);
  const [varient, setVarient] = useState([{ name: "", number: 0 }]);

  const [vendorMain, setVandorMain] = useState(false);
  const [countOfVariant, setCountOfVariant] = useState(0);

  const [vandorsData, setVandorsData] = useState([]);
  const dispatch = useDispatch();

  console.log("data", data);
  useEffect(() => {
    if (data) {
      setVandorsData(data);
      setVendor(data?.vendorName);
      setName(data?.productName);
      setDescription(data?.description);
      setVandorMain(data?.is_main);
      setVarient(data?.variants);
      setCountOfVariant(data?.variants?.length);
    } else {
      setVendor([
        { name: "", is_main: false, variants: [{ name: "", number: 0 }] },
      ]);
      setName("");
      setDescription("");
      setVandorMain(false);
      setVarient([{ name: "", number: 0 }]);
    }
  }, [data]);

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const handleAddVendors = () => {
    if (vandorsData.length === 0) {
      setVandorsData([
        ...vandorsData,
        {
          vendor: [{ name: "", is_main: false }],
          vendorMain: false,
          variants: [{ name: "", number: 0 }],
        },
      ]);
    } else {
      setVandorsData([
        ...vandorsData,
        {
          vendor: [{ name: "", is_main: false }],
          vendorMain: false,
          variants: [{ name: "", number: 0 }],
        },
      ]);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle> {data ? "Edit Vandors" : "Add vendores"}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            productName: data && data.productName ? data.productName : "",
            description: data && data.description ? data.description : "",
            vendorName:
              data && data.vendorName
                ? data.vendorName
                : [
                    {
                      name: "",
                      is_main: false,
                      variants: [{ name: "", number: 0 }],
                    },
                  ],
          }}
          onSubmit={(values, actions) => {
            console.log("value", values);

            if (data) {
              dispatch(editProduct({values,id:data.id}));
            } else {
              dispatch(createProduct(values));
            }
            handleClose();
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <label className="form-label" htmlFor="Name">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="productName"
                    className="form-control"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="productName"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <Field
                    type="text"
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div>
                <div className="row align-itmes-centr">
                  <FieldArray name="vendorName">
                    {({ push, form }) => (
                      <>
                        {form?.values?.vendorName?.map(
                          (vendor, vendorIndex) => (
                            <div key={vendorIndex}>
                              <div className="row align-items-center">
                                <div className="col-8">
                                  <label
                                    className="form-label"
                                    htmlFor={`vendorName${vendorIndex}`}
                                  >
                                    Vendor Name
                                  </label>
                                  <Field
                                    type="text"
                                    id={`vendorName${vendorIndex}`}
                                    name={`vendorName[${vendorIndex}].name`}
                                    className="form-control"
                                    placeholder="Vendor Name"
                                  />
                                </div>
                                <div className="col-4 mt-3">
                                  <label
                                    className="form-check-label"
                                    htmlFor={`vendorName[${vendorIndex}].is_main`}
                                  >
                                    <Field
                                      type="checkbox"
                                      id={`vendorName[${vendorIndex}].is_main`}
                                      name={`vendorName[${vendorIndex}].is_main`}
                                      className="form-check-input mx-2"
                                    />
                                    Is Main
                                  </label>
                                </div>
                              </div>
                              <div className="row">
                                <label className="form-label">
                                  Variant Details
                                </label>
                                <FieldArray
                                  name={`vendorName[${vendorIndex}].variants`}
                                >
                                  {({ push, form }) => (
                                    <>
                                      {form?.values?.vendorName[
                                        vendorIndex
                                      ]?.variants.map(
                                        (variant, variantIndex) => (
                                          <div
                                            className="col-8"
                                            key={variantIndex}
                                          >
                                            <div className="row">
                                              <div className="col-6">
                                                <Field
                                                  type="text"
                                                  name={`vendorName[${vendorIndex}].variants[${variantIndex}].name`}
                                                  className="form-control"
                                                  placeholder="Name"
                                                />
                                              </div>
                                              <div className="col-6">
                                                <Field
                                                  type="number"
                                                  name={`vendorName[${vendorIndex}].variants[${variantIndex}].number`}
                                                  min={0}
                                                  className="form-control"
                                                  placeholder="Number"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}

                                      <div className="col-4">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={() =>
                                            push({ name: "", number: 0 })
                                          }
                                        >
                                          Add Variant
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </FieldArray>
                              </div>
                            </div>
                          )
                        )}
                        <div className="col-4">
                          <button
                            type="button"
                            className="btn btn-warning my-2 text-center"
                            onClick={() =>
                              push({
                                name: "",
                                is_main: false,
                                variants: [{ name: "", number: 0 }],
                              })
                            }
                          >
                            Add Vendor
                          </button>
                        </div>
                      </>
                    )}
                  </FieldArray>
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
