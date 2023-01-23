import Link from "next/link";

const Header = () => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark align-items-center">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        Events
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-md-0 align-items-center">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/events">
              All Events
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              Register
            </Link>
          </li>
        </ul>
        <form className="d-flex flex-row flex-wrap justify-content-center align-items-baseline">
          <input
            className="my-2 search-input form-control me-2"
            type="search"
            placeholder="Search Events"
            aria-label="Search Events"
          />
          <button className="my-2 btn btn-outline-primary text-light">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
);

export default Header;
