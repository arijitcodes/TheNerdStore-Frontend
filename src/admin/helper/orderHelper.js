// Order Status Button
export const statusButton = (status) => {
  let colorStyle = "";

  switch (status.toLowerCase()) {
    case "recieved":
      colorStyle = "warning";
      break;

    case "processing":
    case "shipped":
      colorStyle = "info";
      break;

    case "delivered":
      colorStyle = "success";
      break;

    case "cancelled":
      colorStyle = "danger";
      break;

    default:
      colorStyle = "info";
      break;
  }

  return (
    <span className={`btn btn-sm rounded btn-outline-${colorStyle}`}>
      {status}
    </span>
  );
};
