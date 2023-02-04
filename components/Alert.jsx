function Alert({ message, className, dismissible, ...props }) {
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
