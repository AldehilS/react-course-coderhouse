import { useState } from "react";

export default function CustomerInfoForm({
  setFormValues,
  setFormWasValidated,
  formWasValidated,
}) {
  const [fieldValidations, setFieldValidations] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(form);
      const values = Object.fromEntries(formData.entries());

      setFormValues(values);
      setFormWasValidated(true);
    }
  }

  function handleFieldChange(event) {
    const { name, validity } = event.target;
    setFieldValidations({ ...fieldValidations, [name]: validity.valid });
  }

  function handleEditInfo(event) {
    event.preventDefault();

    setFormWasValidated(false);
  }

  return (
    <form className="bg-dark text-light p-3 rounded-3" onSubmit={handleSubmit}>
      <h2 className="h2">2. Customer and shipment information.</h2>
      <fieldset className="row" disabled={formWasValidated}>
        <div className="mb-3 text-start col-6">
          <label htmlFor="first-name" className="form-label">
            First name
          </label>
          <input
            type="text"
            className={`form-control ${
              fieldValidations["first-name"] ? "is-valid" : "is-invalid"
            }`}
            id="first-name"
            name="first-name"
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÇç \-]+"
            minLength={2}
            maxLength={20}
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="mb-3 text-start col-6">
          <label htmlFor="surname" className="form-label">
            Surname
          </label>
          <input
            type="text"
            className={`form-control ${
              fieldValidations["surname"] ? "is-valid" : "is-invalid"
            }`}
            id="surname"
            name="surname"
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÇç \-]+"
            minLength={2}
            maxLength={20}
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="mb-3 text-start col-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${
              fieldValidations["email"] ? "is-valid" : "is-invalid"
            }`}
            id="email"
            name="email"
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="mb-3 text-start col-6">
          <label htmlFor="phone" className="form-label">
            Phone: Ej. +1 (123) 456-7890
          </label>
          <input
            type="tel"
            className={`form-control ${
              fieldValidations["phone"] ? "is-valid" : "is-invalid"
            }`}
            id="phone"
            pattern="\+?(\d{1,3})?([ \-]{1})?(\(?\d{1,4}\)?)?([ \-]{1})?\d{3,4}([ \-]{1})?\d{3,4}"
            name="phone"
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="mb-3 text-start col-12">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className={`form-control ${
              fieldValidations["address"] ? "is-valid" : "is-invalid"
            }`}
            id="address"
            name="address"
            maxLength={200}
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="mb-3 text-start col-6">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className={`form-control ${
              fieldValidations["city"] ? "is-valid" : "is-invalid"
            }`}
            id="city"
            name="city"
            maxLength={50}
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="mb-3 text-start col-6">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            type="text"
            className={`form-control ${
              fieldValidations["state"] ? "is-valid" : "is-invalid"
            }`}
            id="state"
            name="state"
            maxLength={50}
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="mb-3 text-start col-6">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className={`form-control ${
              fieldValidations["country"] ? "is-valid" : "is-invalid"
            }`}
            id="country"
            name="country"
            maxLength={50}
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="mb-3 text-start col-6">
          <label htmlFor="zip" className="form-label">
            ZIP code or ZIP+4
          </label>
          <input
            type="text"
            className={`form-control ${
              fieldValidations["zip"] ? "is-valid" : "is-invalid"
            }`}
            id="zip"
            name="zip"
            pattern="(\d{4,5})([ \-]\d{4})?"
            onChange={handleFieldChange}
            required
          />
        </div>
      </fieldset>
      {formWasValidated ? (
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleEditInfo}
        >
          Edit information
        </button>
      ) : (
        <button type="sumbit" className="btn btn-primary">
          Save information
        </button>
      )}
    </form>
  );
}
