import { useState } from "react";

function Alert({ message, type, dismissible, ...props }) {
  const [className, setClassName] = useState(
    "col-10 col-sm-7 col-md-6 col-lg-3 col-3 mx-auto text-center alert my-4"
  );

  useState(() => {
    setClassName((value) => value + " " + `alert-${type}`);
    if (dismissible)
      setClassName((value) => value + " " + "alert-dismissible fade show");
  }, [className]);

  return (
    <div className={className} role="alert" {...props}>
      <strong>{message}</strong>
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      )}
    </div>
  );
}

export default Alert;
