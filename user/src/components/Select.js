import React from "react";

function Select({ data }) {
  return (
    <select required="true" className="form-select" aria-label="Default select example">
      <option selected value={null}>Open this select menu</option>
      {
        data?.map((d, index) => (
          <option value={d} key={index} >{d}</option>

        ))
}
    </select>
  );
}

export default Select;
