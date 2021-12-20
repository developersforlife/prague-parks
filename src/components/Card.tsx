import React from "react";

export default (props: any) => {
  const {
    properties: { name, district, address },
  } = props;
  const onclick = () => props.openModal(props);
  const lang = props.lang;
  return (
    <div className="card" onClick={onclick}>
      <div>
        <p>
          {lang.name}: {name}
        </p>
      </div>
      <ul>
        <li>
          {lang.address}: {address.address_formatted}
        </li>
        <li>
          {lang.district}: {district}
        </li>
      </ul>
    </div>
  );
};
