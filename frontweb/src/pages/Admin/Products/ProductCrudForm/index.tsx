import './styles.css';

const ProductCrudForm = () => {
  return (
    <div className="base-card product-crud-form-container">
      <h1>Product details</h1>
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="product-crud-form-input">
              <input
                type="text"
                placeholder="Product name"
                className="form-control base-input"
              ></input>
            </div>
            <div className="product-crud-form-input">
              <input
                type="text"
                placeholder="Category"
                className="form-control base-input"
              ></input>
            </div>
            <div className="product-crud-form-input">
              <input
                type="text"
                placeholder="Price"
                className="form-control base-input"
              ></input>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div>
                  <button className="btn btn-secondary text-white product-crud-form-upload-button">
                    upload image
                  </button>
                  <p className="product-crud-form-image-restrictions text-primary">Images must be in JPG or PNG format and must not exceed <b>5 mb</b>.</p>
                </div>
              </div>
              <div className="col-sm-6 product-crud-form-image-preview">Image preview</div>
            </div>
          </div>
          <div className="col-md-6">
            <textarea
              placeholder="Description"
              className="form-control base-input"
            ></textarea>
          </div>
          <div className="row product-crud-form-action-container">
            <button className="btn btn-outline-danger product-crud-form-action-button col-5 col-md-4">
              Cancel
            </button>
            <button className="btn btn-primary product-crud-form-action-button col-5 col-md-4">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductCrudForm;
