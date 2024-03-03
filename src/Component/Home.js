import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../store/dialog/dialogSlice";
import CreateDialog from "./CreateDialog";
import { deleteProduct, getProduct } from "../store/Products/ProductSlice";

const Home = () => {
  const [data, setData] = useState([]);
  const product = useSelector((state) => state.product.product);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  useEffect(() => {
    setData(product);
  }, [product]);
  const handelClickOpen = () => {
    dispatch(openDialog());
  };
  const handelClickEdit = (data) => {
    console.log("Edit icon clicked");
    dispatch(openDialog(data));
  };

  const handelDelete = (id) => {
  dispatch(deleteProduct(id))
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-end mt-3 px-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handelClickOpen}
          >
            Create
          </button>
        </div>
        <table className="table table-striped my-5">
          <thead className="text-center">
            <tr>
              <th>Product Name</th>
              <th>Vendor Name</th>
              <th>Variants</th>

              <th>Vendor Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((product, index) => (
                    <tr key={index}>
                    <td>{product.productName}</td>
                    <td>
                      {product.vendorName.map((vendor, vendorIndex) => (
                        <span key={vendorIndex}>
                          {vendor.name}
                          {vendorIndex !== product.vendorName.length - 1 && ", "}
                        </span>
                      ))}
                    </td>
                    <td>
                      {product.vendorName.map((vendor, vendorIndex) => (
                        <div key={vendorIndex}>
                          {vendor.variants.map((variant, variantIndex) => (
                            <span key={variantIndex}>
                              {variant.name}
                              {variantIndex !== vendor.variants.length - 1 && ", "}
                            </span>
                          ))}
                          {vendorIndex !== product.vendorName.length - 1 && <br />}
                        </div>
                      ))}
                    </td>
                    <td>
                      {product.vendorName.map((vendor, vendorIndex) => (
                        <div key={vendorIndex}>
                          {vendor.variants.map((variant, variantIndex) => (
                            <span key={variantIndex}>
                              {variant.number}
                              {variantIndex !== vendor.variants.length - 1 && ", "}
                            </span>
                          ))}
                          {vendorIndex !== product.vendorName.length - 1 && <br />}
                        </div>
                      ))}
                    </td>
                    <td>
                      <span className="mx-2">
                        <button
                          className="btn btn-info"
                          type="button"
                          onClick={() => handelClickEdit(product)}
                        >
                          <i className="fa-solid fa-pencil text-dark" />
                        </button>
                      </span>
                      <span>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => handelDelete(product.id)}
                        >
                          <i className="fa-solid fa-trash-can text-dark" />
                        </button>
                      </span>
                    </td>
                  </tr>
            
            ))}
          </tbody>
        </table>
      </div>
      <CreateDialog />
    </>
  );
};

export default Home;
