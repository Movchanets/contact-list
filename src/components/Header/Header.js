import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
  const onGetName = (e) => {
    const name = e.target.value;
    onSearch(name);
  };
  return (
    <div className="container">
      <div className="row decor-default">
        <div className="col">
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Contact List
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/add-contact">
                      Add new contact
                    </Link>
                  </li>
                </ul>
             
              <form className="d-flex" role="search" >
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                   onChange={onGetName}
                  />
                  <button className="btn btn-success" type="submit">
                    Search
                  </button>
                </form> 
                

              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
