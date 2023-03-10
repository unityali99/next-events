import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  return (
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
          <ul className="navbar-nav me-auto mb-md-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" href="/events">
                All Events
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mx-3 align-items-center">
            {session && (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link mx-4 text-nowrap" href="/profile">
                    Logged in as {session.user.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-success px-5 mx-3 my-md-0 my-1"
                    href="/profile"
                  >
                    Profile
                  </Link>
                </li>
              </React.Fragment>
            )}
            {!isLoading && !session && (
              <React.Fragment>
                <li className="nav-item text-light">
                  <Link
                    className="nav-link btn btn-primary mx-2 px-5 my-md-0 my-1"
                    href="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item text-light">
                  <Link
                    className="nav-link btn btn-success px-5 mx-2 my-md-0 my-1"
                    href="/signup"
                  >
                    Register
                  </Link>
                </li>
              </React.Fragment>
            )}
            <li className="nav-item">
              {session && (
                <Link
                  onClick={signOut}
                  className="nav-link btn btn-danger text-light my-md-0 my-1 px-4"
                  href="/"
                >
                  Logout
                </Link>
              )}
            </li>
          </ul>
          {/* <form className="d-flex flex-row flex-wrap justify-content-center align-items-baseline">
            <input
              className="my-2 search-input form-control me-2"
              type="search"
              placeholder="Search Events"
              aria-label="Search Events"
            />
            <button className="my-2 btn btn-outline-primary text-light">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
