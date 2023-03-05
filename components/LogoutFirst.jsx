const LogoutFirst = ({ page, shouldLogin }) => (
  <div className="alert alert-danger col-10 col-sm-7 col-lg-4 mx-auto text-center my-5">
    <h5>
      Please {shouldLogin ? "login" : "logout"} in order to {page}
    </h5>
  </div>
);

export default LogoutFirst;
