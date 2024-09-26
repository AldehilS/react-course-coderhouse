import { useState } from "react";

export default function PaymentForm({ customerFormWasValidated, setPaymentFormValues, setPaymentFormWasValidated }) {
  const [fieldValidations, setFieldValidations] = useState({});

  function handleFieldChange(event) {
    const { name, validity } = event.target;
    setFieldValidations({ ...fieldValidations, [name]: validity.valid });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(form);
      const values = Object.fromEntries(formData.entries());
      setPaymentFormValues(values);
      setPaymentFormWasValidated(true);
    }
  }

  return (
    <form className="text-start mt-5 mb-3" onSubmit={handleSubmit}>
      <h4 className="h4">Payment information</h4>
      <fieldset
        className="row g-0 justify-content-center"
        disabled={!customerFormWasValidated}
      >
        <div className="mb-3 col-12">
          <label htmlFor="cardNumber" className="form-label">
            Card number
          </label>
          <input
            type="text"
            className={`form-control ${!fieldValidations["card-number"]? "is-invalid" : "is-valid"}`}
            id="cardNumber"
            name="card-number"
            pattern="\d{4}[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}"
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="mb-3 pe-2 col-6">
          <label htmlFor="expirationDate" className="form-label">
            Expiration date: MM/YY
          </label>
          <input
            type="text"
            className={`form-control ${!fieldValidations["expiration-date"]? "is-invalid" : "is-valid"}`}
            id="expirationDate"
            name="expiration-date"
            pattern="(0[1-9]|1[0-2])( )?/( )?\d{2}"
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="mb-3 ps-2 col-6">
          <label htmlFor="cvv" className="form-label">
            CVV
          </label>
          <input
            type="text"
            className={`form-control ${!fieldValidations["cvv"]? "is-invalid" : "is-valid"}`}
            id="cvv"
            name="cvv"
            pattern="\d{3,4}"
            onChange={handleFieldChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning col-4">
          Pay
        </button>
      </fieldset>
    </form>
  );
}
