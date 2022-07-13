import { connect } from "react-redux";
import { useEffect } from "react";
// Import Actions
import { GetAllContacts } from "../../Actions/ContactListActions";
// Import components
import ContactItem from "./Contactitem/ContactItem";
import SideBar from "../Sidebar/Sidebar";

const ContactList = ({
  PeopleList,
  GetAllContacts,
  onChangeCategory,
  onChangeFavorite,
  onEditContact,
  filter,URL
}) => {
  let visible;
  
 
  if (filter.length === "") {
    visible = PeopleList;
   
  }

  visible = PeopleList.filter((item) => {
    return item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
  });
  const singleContact = visible.map((contact) => {
    return (
      <ContactItem
        key={contact.id}
        {...contact}
        onChangeCategory={() => onChangeCategory(contact.id)}
        onEditContact={() => onEditContact(contact.id)}
      />
    );
  });
    useEffect(() => {
    const responce = getAllContacts();
    responce.then((data) => {
      GetAllContacts(data);
    });
  }, []);

  const getAllContacts = () => {
    const data = fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length === null) {
          return [];
        } else {
          return data;
        }
      });
    return data;
  };
  return (
    <>
      <div className="container bootstrap snippets bootdeys bootdey">
        <div className="row decor-default">
          <SideBar />
          <div className="col-lg-9 col-md-8 col-sm-12">
            <div className="contacts-list">
              <h5 className="title">Show contacts</h5>
              <div className="unit head">
                <div className="field name">
                  <div className="check">
                    <input id="cb1" name="cb1" type="checkbox" />
                    <label htmlFor="cb1"></label>
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                  </div>
                  Name
                </div>
                <div className="field phone">Phone</div>
                <div className="field email icons">Email</div>
              </div>
              {singleContact.length > 0 ? (
                singleContact
              ) : (
                <h2>No contacts found.</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateTpProps = ({ ContactListReducer }) => {
  const { PeopleList, filter,URL} = ContactListReducer;
  return { PeopleList,filter ,URL};
};

const mapDispatchToProps = {
  GetAllContacts,
};

export default connect(mapStateTpProps, mapDispatchToProps)(ContactList);
