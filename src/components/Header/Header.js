import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Search } from "../../Actions/ContactListActions";
const Header = ({ Search,filter }) => {
  const onGetName = (e) => {
    const name = e.target.value;
    
    Search(name);
   
  };

  return (
    <>
     
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
                  <div className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      name="search"
                      onChange={onGetName}
                    />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateTpProps = ({ ContactListReducer }) => {
  const { PeopleList, filter} = ContactListReducer;
  return { PeopleList,filter };
};
const mapDispatchToProps = {Search};
export default connect(mapStateTpProps,mapDispatchToProps)(Header);
