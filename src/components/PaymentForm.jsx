export default function PaymentForm({ formWasValidated }) {
  return (
    <form className="text-start mt-5 mb-3">
      <h4 className="h4">Payment information</h4>
      <fieldset
        className="row g-0 justify-content-center"
        disabled={!formWasValidated}
      >
        <div className="mb-3 col-12">
          <label htmlFor="cardNumber" className="form-label">
            Card number
          </label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            name="card-number"
            pattern="\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}"
            required
          />
        </div>
        <div className="mb-3 pe-2 col-6">
          <label htmlFor="expirationDate" className="form-label">
            Expiration date: MM/YY
          </label>
          <input
            type="text"
            className="form-control"
            id="expirationDate"
            name="expiration-date"
            pattern="\d{2}/\d{2}"
            required
          />
        </div>
        <div className="mb-3 ps-2 col-6">
          <label htmlFor="cvv" className="form-label">
            CVV
          </label>
          <input
            type="text"
            className="form-control"
            id="cvv"
            name="cvv"
            pattern="\d{3,4}"
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
