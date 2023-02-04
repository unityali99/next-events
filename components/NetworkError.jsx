import Alert from "./Alert";

const NetworkError = () => {
  return (
    <Alert
      className="alert alert-danger mx-auto col-7 col-sm-5 col-md-4 col-lg-3 text-center mt-5"
      message="Network Error"
      dismissible={false}
    />
  );
};

export default NetworkError;
